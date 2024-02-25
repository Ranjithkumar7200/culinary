import React, { useState, useEffect } from 'react';
import { adminPanalApiServices } from '../../services/allApiServeces';
import Profile from './Profile';


const Posts = ({ postInfo }) => {

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
                // const userDetailsResponse = await adminPanalApiServices.getUserProfile();

                // console.log(userDetailsResponse)

                // const posts = userDetailsResponse.data.data[0]?.posts?.posts || [];

                // setUserDetails(userDetailsResponse.data.data[0]);

                // setPostsData(posts);

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
        const locationMatch = post.location && post.location.toLowerCase().includes(locationFilter.toLowerCase());
        const foodStyleMatch = post.foodStyle && post.foodStyle.toLowerCase().includes(foodStyleFilter.toLowerCase());
        const nameMatch = post.name && post.name.toLowerCase().includes(nameFilter.toLowerCase());

        return locationMatch && foodStyleMatch && nameMatch;
    };

    const filteredPosts = postsData.filter(filterPosts);

    return (
        <div className="profilePostContainner">
            <div className="postInnerContainer">
                <>


                    {postInfo.length === 0 ? (
                        <div className="noPostContainer"><p>No posts available</p></div>
                    ) : (
                        postInfo.map((post, index) => (
                            <div className="cardPost" key={post._id}>
                                <img src={post.attachments[0].img_url} className="card-img-top" alt={post.dishName} />
                            </div>
                        ))
                    )}

                </>
            </div>
        </div>
    );
}

export default Posts;
