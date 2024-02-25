import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import "./notification.css"

function NotificationsCards(props) {
    const { sendedNotifications, responseNotifications } = props;

    return (
        <div>
           
            {sendedNotifications.map((name, index) => (
                <Card key={index}>
                    <Card.Body className="cardbody">
                        <div className="cardHead">
                            <div className="userName">
                            <h5 className="name">{name}</h5>
                             <span className="preferencetype">[Preference  North]</span> 
                            </div>
                            
                            <p className="type"> Request Sended</p>
                        </div>
                        <div className="HeadButtons">
                                <Button className="buttonhead Accept">Accept</Button>
                                <Button className="buttonhead">Ignore</Button>
                        </div>
                        
                    </Card.Body>
                </Card>
            ))}
           
            {responseNotifications.map((name, index) => (
                <Card key={index}>
                    <Card.Body className="cardbody">
                        <div className="cardHead">
                            <h5 className="name">{name}</h5>
                            
                            <p className="type">Response</p>
                        </div>
                        <p>Accepted</p>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default NotificationsCards;