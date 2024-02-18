import React, { useState ,useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import "./Profile.css";
import Modal from 'react-modal';
import { FaPenToSquare } from "react-icons/fa6";
import { Link, Route, Switch } from 'react-router-dom';
import Posts from '../Profile/posts';
import Comunityposts from '../Profile/comunityposts';



import food1 from "../../imges/food1.jpeg";
import food2 from "../../imges/food2.jpg";
import food3 from "../../imges/food3.jpeg";
import food4 from "../../imges/food4.jpg";
import food5 from "../../imges/food5.jpg";
import food6 from "../../imges/food6.jpg";
import prabhas from "../../imges/praba.jpeg";
import "../dashboard/common.css";
import { adminPanalApiServices } from '../../services/allApiServeces';

Modal.setAppElement('#root');

function Profile() {
    const [showMore, setShowMore] = useState(false);
    const [showPosts, setShowPosts] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);




    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const toggleShowPosts = () => {
        setShowPosts(!showPosts);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };



    return (
        <div className=' homeContiner'>
            <Navbar />
            <span></span>

            <div className='homeRight'>
                <div className="container-fluid">
                    <div className="rowpost">
                        <div className="image">
                            <img
                                src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg"
                                alt="Profile"
                                className="profile_img"
                            />
                        </div>

                        <div className="profile">
                            <div className="user-name-container">
                                <h3 className="userName">Rohith justin</h3>
                                <div className="">
                                    <button variant="primary" className="profile_button mx-2" onClick={openModal}>
                                        Edit Profile
                                    </button>

                                    <button className=''>
                                        <span class="material-symbols-outlined">
                                            edit
                                        </span>
                                    </button>

                                </div>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    contentLabel="Edit Profile Modal"

                                    style={{
                                        overlay: {
                                            width: '100vw',
                                            height: '100vh',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)'
                                        },
                                        content: {
                                            width: '40%',
                                            height: '50%',
                                            margin: 'auto',
                                            border: '1px solid red'
                                        }
                                    }}
                                >
                                    <h2>Edit Profile</h2>
                                    <p>Modal content goes here.</p>
                                    <button onClick={closeModal}>Close Modal</button>
                                </Modal>
                            </div>
                            <div className="post_container">
                                <p> <span className="number">22</span> Posts</p>
                                <p><span className="number">1000</span> followers</p>
                            </div>
                            <div className="Bio">
                                <p>rohith._.justin </p>
                                <p>I love  My brother</p>
                                <p>I love My india</p>
                            </div>
                        </div>


                    </div>

                    <div className='profilePostsContainer'>
                        {/* Buttons for toggling between posts and community */}
                        <div className="save_post">
                            <div className='innerSavePostContainer'>


                                <button className={`post_button ${showPosts ? 'post_buttonAactive' : ''}`} onClick={toggleShowPosts}>
                                    <span class="material-symbols-outlined">
                                        grid_on
                                    </span>
                                    POSTS
                                </button>
                                <button className={`post_button ${!showPosts ? 'post_buttonAactive' : ''}`} onClick={toggleShowPosts}>
                                    <span class="material-symbols-outlined">
                                        diversity_2
                                    </span>
                                    COMMUNITY
                                </button>
                                <button className={`post_button ${!showPosts ? 'post_buttonAactive' : ''}`} onClick={toggleShowPosts}>
                                    <span class="material-symbols-outlined">
                                        bookmark
                                    </span>
                                    SAVED
                                </button>

                            </div>
                        </div>

                        {/* Conditional rendering of posts or community */}
                        {showPosts ? <Posts /> : <Comunityposts />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
