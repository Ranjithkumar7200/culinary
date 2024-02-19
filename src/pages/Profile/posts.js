
import React, { useState,useEffect } from 'react';



import food1 from "../../imges/food1.jpeg"
import food2 from "../../imges/food2.jpg"
import food3 from "../../imges/food3.jpeg"
import food4 from "../../imges/food4.jpg"
import food5 from "../../imges/food5.jpg"
import food6 from "../../imges/food6.jpg"
import { adminPanalApiServices } from '../../services/allApiServeces';
import Profile from './Profile';



function Posts() {
    const [filteredPostsLength, setFilteredPostsLength] = useState(0); 


    
    const [locationFilter, setLocationFilter] = useState('');
    const [foodStyleFilter, setFoodStyleFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [showMore, setShowMore] = useState(false);
    const [showPosts, setShowPosts] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [postsData, setPostsData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDetailsResponse = await adminPanalApiServices.getUserProfile();
                const posts = userDetailsResponse.data.data[0]?.posts?.posts || [];
                setUserDetails(userDetailsResponse.data.data[0]);
                setPostsData(posts);
                console.log(posts)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);




    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const toggleShowPosts = () => {
        setShowPosts(!showPosts);
    };


    const filterPosts = (post) => {
        const locationMatch = post.location.toLowerCase().includes(locationFilter.toLowerCase());
        const foodStyleMatch = post.foodStyle.toLowerCase().includes(foodStyleFilter.toLowerCase());
        const nameMatch = post.name.toLowerCase().includes(nameFilter.toLowerCase());

        return locationMatch && foodStyleMatch && nameMatch;
    };
    setFilteredPostsLength(filteredPosts.length);


    // Filtered posts based on user input
    // Change this line
    // const postsLength = filteredPostsLength != null ? filteredPostsLength : 0;
    const filteredPosts = postsData.filter(filterPosts);

    
    return (
        <div className="profilePostContainner">
            <div className="postInnerContainer">
                {filteredPosts.map((post) => (

                    <div className="cardPost">
                        <img src={post.img} className="card-img-top" alt={post.name} />

                    </div>

                ))}
            </div>
            {/* < Profile filteredPostsLength={postsLength} /> */}
        </div>
    )
}

export default Posts;