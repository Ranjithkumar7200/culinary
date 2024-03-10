import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FiSend } from "react-icons/fi";
import { adminPanalApiServices } from '../../services/allApiServeces';
import axios from 'axios'; // Import axios

import "./notification.css"
import FadeIn from 'react-fade-in/lib/FadeIn';

function NotificationsCards() {
    const [sendedNotifications, setSendedNotifications] = useState([]);
    const colors = ["red", "orange", "green"];

    // Define acceptUser function inside the component
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDetailsResponse = await adminPanalApiServices.getnotification();
                setSendedNotifications(userDetailsResponse.data.data); 
                console.log("User details:", userDetailsResponse.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchData();
    }, []);

    const acceptRequest = async (userId, touserId, type, userName) => {
        try {
            const response = await adminPanalApiServices.acceptUser( touserId, type, userName); // Use the acceptUser method from adminPanalApiServices
            console.log("Accept request response:", response);
            // Handle success or update UI as needed
        } catch (error) {
            console.error("Error accepting request:", error);
            // Handle error or show error message to user
        }
    };

    return (
        <div>
            {sendedNotifications.length > 0 ? (
                sendedNotifications.map((notificationData, index) => {
                    let messageWords;
                    if (notificationData.msg.includes(',')) {
                        messageWords = notificationData.msg.split(',');
                    } else {
                        messageWords = notificationData.msg.split(' ');
                    }
                    const username= messageWords;
                    const remainingText = messageWords.slice(1).join(' '); 
                    return (
                        <Card key={index} className="cardbod">
                            <Card.Body className="cardbody ">
                                <div className="leftcontainer" style={{ backgroundColor: colors[index % colors.length]}}> </div>
                                <div className="logo"><FiSend /></div>
                                <div className="cardHead">
                                    <div className="userName">
                                        <span className="name">{messageWords[0]}</span> 
                                        <span className="preferencetype">{remainingText}</span> 
                                    </div>
                                    <p className="type"> Request Sended</p>
                                    <div className="HeadButtons">
                                        <p className="type1"> Request Sended</p>
                                        <Button className="buttonhead Accept" onClick={() => acceptRequest(notificationData.user_id, notificationData.sent_by_user_id ,"Accept",username)}>Accept</Button>
                                        <Button className="buttonhead">Ignore</Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    );
                })
            ) : (
                <p>No notifications</p>
            )}
        </div>
    );
}

export default NotificationsCards;
