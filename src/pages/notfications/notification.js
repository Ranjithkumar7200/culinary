import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import NotificationsCards from '../notfications/notficationsCards'; // Correct path

import { adminPanalApiServices } from '../../services/allApiServeces';

import "./notification.css"
import "../dashboard/common.css"

const CreatePost = () => {
    const [notifications, setNotifications] = useState([]);

   

    return (
        <div className='homeContiner'>
            <Navbar />
            <div className='homeRightContainer'>
                <div className="homePOstFeedContainer communityContainer">
                    <div className="header">
                        <h1 className="head">Notifications</h1>
                    </div>
                    <NotificationsCards /> 
                </div>
            </div>
        </div>
    );
};

export default CreatePost;