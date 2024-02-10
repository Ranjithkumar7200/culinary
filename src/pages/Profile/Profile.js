import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import "./Profile.css";
import { FaPenToSquare } from "react-icons/fa6";
import { Link, Route, Switch } from 'react-router-dom';
import Posts from '../Profile/posts';
import Comunityposts from '../Profile/comunityposts';




import food1 from "../../imges/food1.jpeg"
import food2 from "../../imges/food2.jpg"
import food3 from "../../imges/food3.jpeg"
import food4 from "../../imges/food4.jpg"
import food5 from "../../imges/food5.jpg"
import food6 from "../../imges/food6.jpg"

import prabhas from "../../imges/praba.jpeg"

import "../dashboard/common.css";

function Profile() {

    const [showMore, setShowMore] = useState(false);

    const [showPosts, setShowPosts] = useState(true);

    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleEditClose = () => {
        setShowEditModal(false);
    };




    const toggleShowMore = () => {
        setShowMore(!showMore);
    };


    const toggleShowPosts = () => {
        setShowPosts(!showPosts);
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

    const communityData = [

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
    const activePosts = showPosts ? postsData : communityData;

    // Filtered posts based on user input
    const filteredPosts = postsData.filter(filterPosts);





    return (
        <div className=' homeContiner'>

            <Navbar />
            <span></span>

            <div className='homeRight'>




                <div className="container-fluid">
                    <div className=" rowpost ">

                        <div className="col-lg-3 col-12  image ">
                            <img
                                src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg"
                                alt="Profile"
                                className="profile_img"
                            />
                        </div>
                        <div className="col-lg-8 col-12 profile">


                            <div className="user-name-container">

                                <h className="user-name text-nowrap ">Rohith justin</h>
                                <div className="d-none d-xxl-flex d-xl-flex d-xxl-flex d-lg-flex d-md-none d-sm-none">
                                <button variant="primary" className="profile_button mx-2" onClick={handleEditClick}>
                                        Edit Profile
                                    </button>
                                         <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    ...
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="profile_button">Save Posts</button>
                                </div>
                                <div className=" align-items-center d-flex d-xxl-none d-xl-none d-xxl-none d-lg-none d-md-flex d-sm-flex">
                                    <button className="border-none profile_button"><FaPenToSquare size={22} /></button>
                                    <button className="bookmark-btn">
                                        <span className="material-symbols-outlined mt-2">bookmark_add</span>
                                    </button>
                                </div>




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
                            <div className="save_post">
                                <div className="save_post">
                                    <button className={`post_button ${showPosts ? 'active' : ''}`} onClick={toggleShowPosts}>Posts</button>
                                    <button className={`post_button ${!showPosts ? 'active' : ''}`} onClick={toggleShowPosts}>Community</button>
                                </div>
                            </div>


                        </div>

                    </div>

                    {/* <div className="profilePostContainner">
                        <div className=" row row-cols-1 row-cols-md-2 row-cols-lg-3">
                            {filteredPosts.map((post) => (
                                <div key={post.id} className="col  postColumn ">
                                    <div className="cardPost">
                                        <img src={post.img} className="card-img-top" alt={post.name} />

                                    </div>
                                </div>
                            ))}
                        </div>







                    </div>  */}

                    {showPosts ? <Posts /> : <Comunityposts />}










                </div>











            </div>
        </div>

    );
};


export default Profile