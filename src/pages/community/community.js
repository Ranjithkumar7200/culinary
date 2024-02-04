import React, { useState } from 'react';

import Navbar from '../../components/navbar/navbar';

import food1 from "../../imges/food1.jpeg"
import food2 from "../../imges/food2.jpg"
import food3 from "../../imges/food3.jpeg"
import food4 from "../../imges/food4.jpg"
import food5 from "../../imges/food5.jpg"
import food6 from "../../imges/food6.jpg"

import prabhas from "../../imges/praba.jpeg"

import CreateCommunityForm from './createcommunity';

import "../dashboard/common.css"

import "./community.css"

// import { current } from '@reduxjs/toolkit';

const Community = () => {


    const [showCreateForm, setShowCreateForm] = useState(false);

    const showCreateFormHandler = () => {
        setShowCreateForm(true);
    };

    const hideCreateFormHandler = () => {
        setShowCreateForm(false);
    };



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

    return (
        <div className=' homeContiner'>

            <Navbar />
            <span></span>

            <div className='homeRightContainer'>



                <div class="homePOstFeedContainer  communityContainer">


                
                        {showCreateForm ? (
                            <CreateCommunityForm onBack={hideCreateFormHandler} />
                        ) : (
                            <div className="createCommunityButtonContainer">
                                <button onClick={showCreateFormHandler}>Create Community</button>
                            </div>
                        )}
                  

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
                                <a href="profile_link" class="profile-link">View Profile</a>


                            </div>


                        </div>
                    </div>



                    <div className='userSuggestedContainer'>
                        <div className='seeallContainer'>
                            <h5>Suggested for you See All</h5>
                            <a href='' className='seeAllUserSuggestion'>See all</a>
                        </div>

                        {postsData.map((post) => (



                            <div className='userContainerInSuggestion'>

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
                                    <a href="profile_link" class="profile-link">Invite</a>


                                </div>


                            </div>


                        ))

                        }

                    </div>
                </div>

            </div>
        </div>

    );
};

export default Community;
