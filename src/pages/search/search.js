import React, { useState } from 'react';

import Navbar from '../../components/navbar/navbar';

import food1 from "../../imges/food1.jpeg"
import food2 from "../../imges/food2.jpg"
import food3 from "../../imges/food3.jpeg"
import food4 from "../../imges/food4.jpg"
import food5 from "../../imges/food5.jpg"
import food6 from "../../imges/food6.jpg"

import prabhas from "../../imges/praba.jpeg"

import "../dashboard/common.css"


import "./search.css"





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

const Home = () => {


    const [showMore, setShowMore] = useState(false);

    const [formData, setFormData] = useState({
        communityName: '',
        location: 'location1', // default value for location
        type: 'type1', // default value for type
    });


    const toggleShowMore = () => {
        setShowMore(!showMore);
    };




 

    // State to manage filters
    const [locationFilter, setLocationFilter] = useState('');
    const [foodStyleFilter, setFoodStyleFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');

    // Function to handle filtering posts
    const filterPosts = (post) => {
        const locationMatch = post.location.toLowerCase().includes(locationFilter.toLowerCase());
        const foodStyleMatch = post.foodStyle.toLowerCase().includes(foodStyleFilter.toLowerCase());
        const nameMatch = post.name.toLowerCase().includes(nameFilter.toLowerCase());

        return locationMatch && foodStyleMatch && nameMatch;
    };

    // Filtered posts based on user input
    const filteredPosts = postsData.filter(filterPosts);



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    return (
        <div className=' homeContiner'>

            <Navbar />
            <span></span>

            <div className='homeRightContainer'>



                <div class="homePOstFeedContainer">

                    
                    <div className='searchContainer'>
                    <div className='searchContainerForm'>
                        <form className="searchFormContainer" onSubmit={handleSubmit}>
                            <div className="searchInputContainer">
                                <input
                                    type="text"
                                    name="communityName"
                                    className='searchSearchInput'
                                    placeholder="Enter community name"
                                    value={formData.communityName}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                />
                                <select
                                    name="location"
                                    className="searchSearchSelect"
                                    value={formData.location}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                >
                                    <option value="location1">Location 1</option>
                                    <option value="location2">Location 2</option>
                                    <option value="location3">Location 3</option>
                                </select>
                                <select
                                    name="type"
                                    className="searchSearchSelect"
                                    value={formData.type}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                >
                                    <option value="type1">Type 1</option>
                                    <option value="type2">Type 2</option>
                                    <option value="type3">Type 3</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    </div>

                    {filteredPosts.map((post) => (
                        <div key={post.id} className="userPostCard">
                            <div className='userContainerHead'>
                                <div className='userImgNameContainer' >
                                    <img className="userImgInPostCard" src={prabhas} alt='user' ></img>
                                    <p>{post.userName}</p>
                                </div>
                                {/* <span class="material-symbols-outlined">
                  more_horiz
                </span> */}

                            </div>


                            <div className='userPostContent'>
                                <div class='image-container'>
                                    <img src={post.img} alt='userPost1' />
                                    <div class='text-overlay'>
                                        <p class='white-text'>{post.name}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="postButtonContainer">
                                <div className='likeButtonContainer'>
                                    <button className="favorite-btn">
                                        <span className="material-symbols-outlined">favorite</span>
                                    </button>
                                    <button className="invite-btn">Invite</button>
                                </div>
                                <div>
                                    <button className="bookmark-btn">
                                        <span className="material-symbols-outlined">bookmark_add</span>
                                    </button>
                                </div>

                            </div>
                            <div className='procedureContainer'>

                                <p>
                                    <span className='userDescriptionName'>Description</span>
                                    {showMore ? post.content : post.content.slice(0, 20)}
                                    {post.content.length > 10 && (
                                        <span onClick={toggleShowMore} style={{ cursor: 'pointer', color: 'blue' }}>
                                            {!showMore && '... more'}
                                        </span>
                                    )}
                                </p>
                            </div>


                        </div>
                    ))}


                </div>

                <div className='userHomeContainer'>
                    <div className="userSuggestedContainer">
                        <div className='userContainerInSuggestion'>

                            <div className='userSuggestionInnerLeftContainer'>

                                <div className='userSuggetionContiainerInSuggetion'>
                                    <img className="userImgInPostCard " src={prabhas} />
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

                        {filteredPosts.map((post) => (



                            <div className='userContainerInSuggestion'>

                                <div className='userSuggestionInnerLeftContainer'>

                                    <div className='userSuggetionContiainerInSuggetion'>
                                        <img className="userImgInPostCard " src={prabhas} />
                                    </div>

                                    <div className='usersugehtionNamecontainer'>
                                        <p className='userSuggetionName'>{post.userName}</p>
                                        <p className='SuggestedForYou'>Suggested for you</p>
                                    </div>

                                </div>

                                <div>
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

export default Home;
