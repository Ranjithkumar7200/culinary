import React, { useEffect, useState } from "react";

import Navbar from "../../components/navbar/navbar";
import prabhas from "../../imges/praba.jpeg";
import "./common.css";
import {
  useEditLikeMutation,
  useGetAllPostsQuery,
  useUnLikeMutation,
} from "../../redux/api/HomeApi";
import Loader from "../loader/Loader";
import TokenService from "../../services/TokenServices";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useGetAllUserByIdQuery } from "../../redux/api/UserApi";
import { toast } from "react-toastify";

const Home = () => {
  const [showMore, setShowMore] = useState(false);
  const id = TokenService.getUserIdFromToken();
  const { data: posts, isLoading,} = useGetAllPostsQuery(id);
  const { data: user } = useGetAllUserByIdQuery(id);
  const [postId,setPostId]=useState("");
  const [EditLike] = useEditLikeMutation();
  const [unLike] = useUnLikeMutation();
  const [likeBool,setLikeBool]= useState(false);
  const [postsData, setPostsData] = useState([]);
  const [userData, setUserData] = useState([]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  

  const navigate = useNavigate();
  useEffect(() => {
    if (posts && posts.data) {
      setPostsData(posts.data);
    }
  }, [posts]);

  useEffect(() => {
    if (user && user.data) {
      setUserData(user.data[0]);
    }
  }, [posts, user]);

  const like = async (id) => {
    setLikeBool(!likeBool);
    setPostId(id);
    console.log(id);
    try {
      const response = await EditLike({
        "post_id":id,
        "user_id":TokenService.getUserIdFromToken()
    });
      console.log("like : "+response.data.data);
      console.log("like");
      if (response?.data) {
        console.log(response?.data.message);
      } else {
        console.log("jii");
      }
    } catch (error) {
      toast("An error occurred while registering.");
    }
  };
  const unlike = async (id) => {
    setLikeBool(!likeBool);
    setPostId(id);
    console.log(id);
    try {
      const response = await unLike({
        "post_id":id,
        "user_id":TokenService.getUserIdFromToken()
    });
      console.log(response);
      if (response?.data) {
      } else {
        console.log("jii");
      }
    } catch (error) {
      toast("An error occurred while registering.");
    }
  };

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
                postsData.map((post) =>
                  post.attachments.length > 0 ? (
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
                          <p>{post.postedByName}</p>
                        </div>
                        <span class="material-symbols-outlined">
                          more_horiz
                        </span>
                      </div>

                      <div className="userPostContent">
                        <div class="image-container">
                          {post.attachments.map((img) => (
                            <img src={img.img_url} alt="user"></img>
                          ))}
                          <div class="text-overlay">
                            <p class="white-text">{post.dishName}</p>
                          </div>
                        </div>
                      </div>

                      <div className="postButtonContainer">
                        <div className="likeButtonContainer">
                          <button
                            className={`favorite-btn`}
                            
                          >
                            <div className="d-flex flex-column align-items-center justify-content-center">
                              <span>
                                {post.isLiked ? (
                                  <MdFavorite color="red" onClick={() => unlike(post._id)} />
                                ) : (
                                  <MdFavoriteBorder onClick={() => like(post._id)} />
                                )}
                              </span>
                              <p className="fs-6">
                                {post.likes} {post.likes > 1 ? "Likes" : "Like"}
                              </p>
                            </div>
                          </button>

                          <button className="invite-btn">Invite</button>
                        </div>
                        <div>
                          <button className="bookmark-btn">
                            <span>
                              {!post.isSaved ? (
                                <FaRegBookmark />
                              ) : (
                                <FaBookmark />
                              )}
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="procedureContainer">
                        <p>
                          <span className="userDescriptionName">
                            Description
                          </span>
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
                  ) : (
                    <></>
                  )
                )}
            </>
          )}
        </div>

        <div className="userHomeContainer">
          <div className="userSuggestedContainer">
            <div className="userContainerInSuggestion">
              <div className="userSuggestionInnerLeftContainer">
                <div className="userSuggetionContiainerInSuggetion">
                  <img className="userImgInPostCard " src={prabhas} alt="..." />
                </div>

                <div className="usersugehtionNamecontainer">
                  <p className="userSuggetionName">
                    {userData.name ?? "Loading..."}
                  </p>
                  <p>
                    {}@{userData.name ?? "Loading..."}
                  </p>
                </div>
              </div>

              <div className="pointer" onClick={() => navigate("/profile")}>
                <p class="profile-link">View Profile</p>
              </div>
            </div>
          </div>

          <div className="userSuggestedContainer">
            <div className="seeallContainer">
              <h5>Suggested for you See All</h5>
              <p  className="seeAllUserSuggestion">
                See all
              </p>
            </div>

            {postsData &&
              postsData.map((post) => (
                <div className="userContainerInSuggestion">
                  <div className="userSuggestionInnerLeftContainer">
                    <div className="userSuggetionContiainerInSuggetion">
                      <img className="userImgInPostCard "alt="..." src={prabhas} />
                    </div>

                    <div className="usersugehtionNamecontainer">
                      <p className="userSuggetionName">{post.postedByName}</p>
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
