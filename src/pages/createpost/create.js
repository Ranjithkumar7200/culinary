import React, { useState } from 'react';

import Navbar from '../../components/navbar/navbar';
import { FaHome } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";

import food1 from "../../imges/food1.jpeg"
import food2 from "../../imges/food2.jpg"
import food3 from "../../imges/food3.jpeg"
import food4 from "../../imges/food4.jpg"
import food5 from "../../imges/food5.jpg"
import food6 from "../../imges/food6.jpg"

import prabhas from "../../imges/praba.jpeg"

// import CreateCommunityForm from './createcommunity';

// import "../dashboard/common.css"

import "./create.css"

import "../community/community.css"

import "../dashboard/common.css"

import postTypes from '../../constants/postTypes';

import PostForm from './PostForm/PostForm';
import FadeIn from 'react-fade-in/lib/FadeIn';



// import { current } from '@reduxjs/toolkit';

const CreatePost = () => {





    const postsData = [
        {
            id: 1,
            img: food1,
            userName: 'sathish57',
            name: 'Biriyani',
            location: 'City 1',
            foodStyle: 'Mediterranean',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 2,
            img: food2,
            userName: 'Dosaa',
            name: 'Mediterranean Dish 2',
            location: 'City 2',
            foodStyle: 'Mediterranean',
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            id: 3,
            img: food3,
            userName: 'ranjiths88',
            name: 'Upma',
            location: 'City 2',
            foodStyle: 'Mediterranean',
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            id: 4,
            img: food4,
            userName: 'rohith_roy',
            name: 'Chicken',
            location: 'City 2',
            foodStyle: 'Mediterranean',
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            id: 5,
            img: food5,
            userName: 'firzzzzzzzz',
            name: 'Rayala sima chicken',
            location: 'City 2',
            foodStyle: 'Mediterranean',
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            id: 6,
            img: food6,
            userName: 'somthing',
            name: 'kodikuraa',
            location: 'City 2',
            foodStyle: 'Mediterranean',
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        // Add more posts as needed
    ];

    // State to manage filters
    // const [locationFilter, setLocationFilter] = useState('');
    // const [foodStyleFilter, setFoodStyleFilter] = useState('');
    // const [nameFilter, setNameFilter] = useState('');

    // Function to handle filtering posts
    // const filterPosts = (post) => {
    //   const locationMatch = post.location.toLowerCase().includes(locationFilter.toLowerCase());
    //   const foodStyleMatch = post.foodStyle.toLowerCase().includes(foodStyleFilter.toLowerCase());
    //   const nameMatch = post.name.toLowerCase().includes(nameFilter.toLowerCase());

    //   return locationMatch && foodStyleMatch && nameMatch;
    // };

    // // Filtered posts based on user input
    // const filteredPosts = postsData.filter(filterPosts);

    const [isCreate, setIsCreate] = useState(false)
    const [postType, setPostType] = useState(postTypes.HOME_POST)

    return (
        <div className={`create_main_container`}>

            <Navbar />
            <span></span>

            <div className='homeRightContainer'>



                <div className="homePOstFeedContainer  communityContainer">



                    {!isCreate && <div className="create_community_button_container">
                        <button className='create_community_button' onClick={() => setIsCreate(!isCreate)}>Create Post</button>
                    </div>}

                    {isCreate && <div className='create_post_main_container'>
                        <div className="create_post_buttons_card">
                            <button className='create_home_post_button' onClick={() => setPostType(postTypes.HOME_POST)}>
                            <span><FaHome /></span><span className="text">Home Post</span>
                            </button>
                            <span>||</span>
                            <button className='create_community_post_button' onClick={() => setPostType(postTypes.COMMUNITY_POST)}>
                               <span><MdGroups2 /></span>  <span className="text">Community Post</span>
                            </button>
                        </div>
                    </div>}

                    {(isCreate) ?
                        <PostForm postType={postType} />
                        : null
                    }

                </div>

                <div className='userHomeContainer'>
                    <div className="userSuggestedContainer">
                        <div className='userContainerInSuggestion'>

                            <div className='userSuggestionInnerLeftContainer'>

                                <div className='userSuggetionContiainerInSuggetion'>
                                    <img className="userImgInPostCard " src={prabhas} alt='user' />
                                </div>

                                <div className='usersugehtionNamecontainer'>
                                    <p className='userSuggetionName'>sathish57cccccccccc</p>
                                    <p>sathish57</p>
                                </div>

                            </div>

                            <div>
                                <a href="profile_link" className="profile-link">View Profile</a>


                            </div>


                        </div>
                    </div>



                    <div className='userSuggestedContainer'>
                        <div className='seeallContainer'>
                            <h5>Suggested for you See All</h5>
                            <a href='' className='seeAllUserSuggestion'>See all</a>
                        </div>

                        {postsData.map((post) => (



                            <FadeIn className='userContainerInSuggestion'>

                                <div className='userSuggestionInnerLeftContainer'>

                                    <div className='userSuggetionContiainerInSuggetion'>
                                        <img className="userImgInPostCard " src={prabhas} alt='user' />
                                    </div>

                                    <div className='usersugehtionNamecontainer'>
                                        <p className='userSuggetionName'>{post.userName}</p>
                                        <p className='SuggestedForYou'>Suggested for you</p>
                                    </div>

                                </div>

                                <div >
                                    <a href="profile_link" className="profile-link">Invite</a>


                                </div>


                            </FadeIn>


                        ))

                        }

                    </div>
                </div>

            </div>
        </div>

    );
};

export default CreatePost;
