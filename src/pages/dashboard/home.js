import React, { useEffect, useState } from "react";

import Navbar from "../../components/navbar/navbar";

import food1 from "../../imges/food1.jpeg";
import food2 from "../../imges/food2.jpg";
import food3 from "../../imges/food3.jpeg";
import food4 from "../../imges/food4.jpg";
import food5 from "../../imges/food5.jpg";
import food6 from "../../imges/food6.jpg";

import prabhas from "../../imges/praba.jpeg";

import "./common.css";
import { useGetAllPostsQuery } from "../../redux/api/HomeApi";
import Loader from "../loader/Loader";

const Home = () => {
  const [showMore, setShowMore] = useState(false);
  const { data: posts, isLoading, error } = useGetAllPostsQuery();

  const [postsData, setPostsData] = useState([]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  console.log(posts);
  const postsDatas = [
    {
      id: 1,
      img: food1,
      userName: "sathish57",
      name: "Biriyani",
      location: "City 1",
      foodStyle: "Mediterranean",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      img: food2,
      userName: "Dosaa",
      name: "Mediterranean Dish 2",
      location: "City 2",
      foodStyle: "Mediterranean",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      img: food3,
      userName: "ranjiths88",
      name: "Upma",
      location: "City 2",
      foodStyle: "Mediterranean",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 4,
      img: food4,
      userName: "rohith_roy",
      name: "Chicken",
      location: "City 2",
      foodStyle: "Mediterranean",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 5,
      img: food5,
      userName: "firzzzzzzzz",
      name: "Rayala sima chicken",
      location: "City 2",
      foodStyle: "Mediterranean",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 6,
      img: food6,
      userName: "somthing",
      name: "kodikuraa",
      location: "City 2",
      foodStyle: "Mediterranean",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    // Add more posts as needed
  ];

  // State to manage filters
  const [locationFilter, setLocationFilter] = useState("");
  const [foodStyleFilter, setFoodStyleFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  useEffect(() => {
    if (posts && posts.data) {
      setPostsData(posts.data);
    }
  }, [posts]);
  console.log(postsData.data);

  // // Function to handle filtering posts
  // const filterPosts = (post) => {
  //   const locationMatch = post.location
  //     .toLowerCase()
  //     .includes(locationFilter.toLowerCase());
  //   const foodStyleMatch = post.foodStyle
  //     .toLowerCase()
  //     .includes(foodStyleFilter.toLowerCase());
  //   const nameMatch = post.name
  //     .toLowerCase()
  //     .includes(nameFilter.toLowerCase());

  //   return locationMatch && foodStyleMatch && nameMatch;
  // };

  // // Filtered posts based on user input
  // const filteredPosts = postsDatas.filter(filterPosts);

  return (
    <div className=" homeContiner">
      <Navbar />
      <span></span>

      <div className="homeRightContainer">
        <div class="homePOstFeedContainer">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {postsData &&
                postsData.map((post) => (
                  <div key={post._id} className="userPostCard">
                    <div className="userContainerHead">
                      <div className="userImgNameContainer">
                        {post.attachments.map((img) => (
                          <img
                            className="userImgInPostCard"
                            src={img.img_url}
                            alt="user"
                          ></img>
                        ))}
                        <p>{post.user_name}</p>
                      </div>
                      <span class="material-symbols-outlined">more_horiz</span>
                    </div>

                    <div className="userPostContent">
                      <div class="image-container">
                        {post.attachments.map((img) => (
                          <img
                            
                            src={img.img_url}
                            alt="user"
                          ></img>
                        ))}
                        <div class="text-overlay">
                          <p class="white-text">{post.title}</p>
                        </div>
                      </div>
                    </div>

                    <div className="postButtonContainer">
                      <div className="likeButtonContainer">
                        <button className="favorite-btn">
                          <span className="material-symbols-outlined">
                            favorite
                          </span>
                        </button>
                        <button className="invite-btn">Invite</button>
                      </div>
                      <div>
                        <button className="bookmark-btn">
                          <span className="material-symbols-outlined">
                            bookmark_add
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="procedureContainer">
                      <p>
                        <span className="userDescriptionName">Description</span>
                        {showMore ? post.descr : post.descr.slice(0, 20)}
                        {post.descr.length > 10 && (
                          <span
                            onClick={toggleShowMore}
                            style={{ cursor: "pointer", color: "blue" }}
                          >
                            {!showMore && "... more"}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>

        <div className="userHomeContainer">
          <div className="userSuggestedContainer">
            <div className="userContainerInSuggestion">
              <div className="userSuggestionInnerLeftContainer">
                <div className="userSuggetionContiainerInSuggetion">
                  <img className="userImgInPostCard " src={prabhas} />
                </div>

                <div className="usersugehtionNamecontainer">
                  <p className="userSuggetionName">sathish57cccccccccc</p>
                  <p>sathish57</p>
                </div>
              </div>

              <div>
                <a href="profile_link" class="profile-link">
                  View Profile
                </a>
              </div>
            </div>
          </div>

          <div className="userSuggestedContainer">
            <div className="seeallContainer">
              <h5>Suggested for you See All</h5>
              <a href="" className="seeAllUserSuggestion">
                See all
              </a>
            </div>

            {postsData && postsData.map((post) => (
              <div className="userContainerInSuggestion">
                <div className="userSuggestionInnerLeftContainer">
                  <div className="userSuggetionContiainerInSuggetion">
                    <img className="userImgInPostCard " src={prabhas} />
                  </div>

                  <div className="usersugehtionNamecontainer">
                    <p className="userSuggetionName">{post.userName}</p>
                    <p className="SuggestedForYou">Suggested for you</p>
                  </div>
                </div>

                <div>
                  <a href="profile_link" class="profile-link">
                    Invite
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
