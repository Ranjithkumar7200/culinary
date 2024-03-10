import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import { useNavigate } from "react-router-dom";
import {
    useEditLikeMutation,
    useGetAllPostsQuery,
    useGetConnectionMutation,
    useUnLikeMutation,
  } from "../../redux/api/HomeApi";


import "./Profile.css";
import { Button, Form, Modal } from 'react-bootstrap';
import Posts from '../Profile/posts';
import Comunityposts from '../Profile/comunityposts';
import Saveposts from '../Profile/saveposts'
import "../dashboard/common.css";
import { adminPanalApiServices } from '../../services/allApiServeces';
import TokenService from "../../services/TokenServices";
import { useGetAllUserByIdQuery } from "../../redux/api/UserApi";

// Modal.setAppElement('#root');

const Profile = ({ filteredPostsLength }) => {
    const id = TokenService.getUserIdFromToken();
    const [formData, setFormData] = useState({
        nameInput: '',
        dietInput: '',
        descriptionInput: '',
        rateInput: ''
    });
    const [redirect, setRedirect] = useState(false);
    const { data: posts, isLoading } = useGetAllPostsQuery(id);
  const { data: user } = useGetAllUserByIdQuery(id);
  


    const [showPosts, setShowPosts] = useState(false); // Changed to false to display only community posts
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userDetails, setUserDetails] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);


    const [showModal, setShowModal] = useState(false);
    const [showGruop, setShowGroup] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [profileData, setProfileData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [selectedTab, setSelectedTab] = useState('posts');

    const [postsData, setPostData] = useState([])

    const [community, setcommunityData] = useState([])

    const [savePost, setSavePost] = useState([])


    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);


    const handleShowGroup = () => {
        setShowGroup(true);
        setShowModal(false)

    }
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };




    const [errormsgState, setErrorMsgState] = useState({
        imgErrorMsg: false
    });
    const fileInputRef = useRef(null);


    useEffect(() => {
        const fetchData = async () => {
            let userDetails = await adminPanalApiServices.getUserProfile()

            setUserDetails(userDetails.data.data[0])

            console.log(userDetails.data.data[0].saved_posts_data)
            setPostData(userDetails.data.data[0].posts.posts)
            setcommunityData(userDetails.data.data[0].posts.community)

            setSavePost(userDetails.data.data[0].saved_posts_data)

        }
        fetchData()
    }, [])

    const toggleShowPosts = () => {
        setShowPosts(!showPosts);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    const handleOnDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setFormData({ ...formData, imageFile: file });
            setImageFile(file)
            setUploadedImage(URL.createObjectURL(file));
            setErrorMsgState({ imgErrorMsg: false });
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];


        if (!file) {
            return; // Exit the function if no file is selected
        }
        setFormData({ ...formData, imageFile: file });
        setImageFile(file)
        setUploadedImage(URL.createObjectURL(file));
        setErrorMsgState({ imgErrorMsg: false });
    };


    const onClickUpload = () => {
        fileInputRef.current.click();
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // Add your form submission logic here
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const formTitle = "Home";
    // console.log(filteredPostsLength, "hello");
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/register");
        localStorage.removeItem('user');
        

    };
    useEffect(() => {
        if (posts && posts.data) {
          function shuffleArray(array) {
            // Make a copy of the array
            const newArray = array.slice();
            // Shuffle the copied array
            for (let i = newArray.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
          }
    
          // Create a shuffled copy of posts.data
          let reArrangedArray = shuffleArray(posts.data);
    
          // Set the shuffled array to the state
          setProfileData(reArrangedArray);
          console.log(posts.data, "from");
          console.log(userData);
        }
      }, [posts]);
      
    useEffect(() => {
        if (user && user.data) {
    
    
          setUserData(user.data[0]);
        }
      }, [posts, user]);
    
    



    return (
        <div className=' homeContiner'>
            <Navbar />
            <span></span>


            {userDetails &&

                <div className='homeRight'>

                    <div className="container-fluid">
                        {isDesktop ? (
                            <div className="rowpost">
                                <div className="image">
                                    <img
                                        // src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg"
                                        src={userData.image}
                                        alt="Profile"
                                        className="profile_img"
                                    />
                                </div>

                                <div className="profile">
                                    <div className="user-name-container">
                                        <h3 className="userName">{userDetails.name}</h3>
                                        <div className="">
                                            <button variant="primary" className="profile_button mx-2" onClick={handleShow}>
                                                Edit Profile
                                            </button>
                                            <button variant="primary" className="profile_button mx-2" onClick={() => {  handleLogout(); }}>
                                                Log out
                                            </button>



                                        </div>



                                        <Modal show={showModal} centered onHide={handleClose}>

                                            <Modal.Body>
                                                <div className='editContainer' >
                                                    <div className="editRight">
                                                        <div className='editInpContainer'>
                                                            <label htmlFor='name' className='editintText'>User Name</label>
                                                            <input name='nameInput' id='name' type='text' placeholder='Name' className='editint' onChange={handleChange} />
                                                        </div>


                                                        <div className='editInpContainer'>
                                                            <label htmlFor='rate' className='editintText'>Favorite Food</label>
                                                            <input name='rateInput' id='rate' type='number' placeholder='Food' className='editint' onChange={handleChange} />
                                                        </div>
                                                        <div className='editInpContainer'>
                                                            <label htmlFor='location' className='editintText'>Location Preference</label>
                                                            <select name='locationInput' id='location' className='editint' value={formData.locationInput} onChange={handleChange}>
                                                                <option value="">----select Location----</option>
                                                                <option value={"Chennai"}>Chennai</option>
                                                                <option value={"Hyderabad"}>Hyderabad</option>
                                                                <option value={"Bangalore"}>Bangalore</option>
                                                                <option value={"Kerala"}>Kerala</option>
                                                            </select>
                                                        </div>


                                                        <div className='editBtnContainer'>
                                                            <button className='editSubmitBtn' type='submit'>Save</button>
                                                            <button className='editCloseBtn' onClick={handleClose}> Close </button>
                                                        </div>
                                                    </div>
                                                    <div className="editleft">
                                                        <label className='editintText'>Upload Image<span className="starIcon">*</span> </label>
                                                        <div className="dragAndDropContainer">
                                                            <div className="file-inner-container" onDrop={handleOnDrop} onDragOver={handleDragOver} >
                                                                <div className="folderContainer">
                                                                    {uploadedImage ? (
                                                                        <div className="imgSecondStyles">
                                                                            <div className="courseUploadImgContainer">
                                                                                <img src={uploadedImage} alt="Uploaded" />
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="UploadImgInCourse" >
                                                                            <div className="UploadToCloudCont">
                                                                                <img
                                                                                    src="https://img.icons8.com/ios/50/upload-to-cloud--v1.png"
                                                                                    alt="upload to cloud"
                                                                                    className="upload-logo"
                                                                                />
                                                                                <p className="UploadToCloudContPara">
                                                                                    Drag course logo here
                                                                                </p>
                                                                            </div>
                                                                            <p className="UploadToCloudContPara">or</p>
                                                                        </div>
                                                                    )}

                                                                    <div className="dragButtonContainerCourse">
                                                                        <input
                                                                            type="file"
                                                                            ref={fileInputRef}
                                                                            style={{ display: "none" }}
                                                                            onChange={(e) => handleFileChange(e)}
                                                                        />
                                                                        <button type='button' onClick={onClickUpload} className="browse-btn">
                                                                            <span class="material-symbols-outlined">
                                                                                add
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Modal.Body>

                                        </Modal>

                                    </div>
                                    <div className="post_container">
                                        <p> <span className="number"></span> Posts</p>

                                        <p><span className="number">1000</span> followers</p>
                                    </div>
                                    <div className="Bio">
                                        <p>rohith._.justin </p>
                                        <p>I love  My brother</p>
                                        <p>I love My india</p>
                                    </div>
                                </div>


                            </div>) : (
                            <div className="container mobile-container">
                                <div className="profile">
                                    <div className="user-name-container">
                                        <div className="imgContainer">
                                            <img
                                                // src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg"
                                                src={userData.image}
                                                alt="Profile"
                                                className="profile_img"
                                            /></div>

                                        <div>



                                            <div className="userNameContainer">
                                                <h3 className="userName">{userDetails.name}</h3>

                                                <button className=' profile_button' onClick={handleShow}>
                                                    <span class="material-symbols-outlined" >
                                                        edit
                                                    </span>
                                                </button>

                                            </div>



                                            <Modal show={showModal} centered onHide={handleClose}>

                                                <Modal.Body>
                                                    <div className='editContainer' >
                                                        <div className="editRight">
                                                            <div className='editInpContainer'>
                                                                <label htmlFor='name' className='editintText'>User Name</label>
                                                                <input name='nameInput' id='name' type='text' placeholder='Name' className='editint' onChange={handleChange} />
                                                            </div>


                                                            <div className='editInpContainer'>
                                                                <label htmlFor='rate' className='editintText'>Favorite Food</label>
                                                                <input name='rateInput' id='rate' type='number' placeholder='Food' className='editint' onChange={handleChange} />
                                                            </div>
                                                            <div className='editInpContainer'>
                                                                <label htmlFor='location' className='editintText'>Location Preference</label>
                                                                <select name='locationInput' id='location' className='editint' value={formData.locationInput} onChange={handleChange}>
                                                                    <option value="">----select Location----</option>
                                                                    <option value={"Chennai"}>Chennai</option>
                                                                    <option value={"Hyderabad"}>Hyderabad</option>
                                                                    <option value={"Bangalore"}>Bangalore</option>
                                                                    <option value={"Kerala"}>Kerala</option>
                                                                </select>
                                                            </div>


                                                            <div className='editBtnContainer'>
                                                                <button className='editSubmitBtn' type='submit'>Save</button>
                                                                <button className='editCloseBtn' onClick={handleClose}> Close </button>
                                                            </div>
                                                        </div>
                                                        <div className="editleft">
                                                            <label className='editintText'>Upload Image<span className="starIcon">*</span> </label>
                                                            <div className="dragAndDropContainer">
                                                                <div className="file-inner-container" onDrop={handleOnDrop} onDragOver={handleDragOver} >
                                                                    <div className="folderContainer">
                                                                        {uploadedImage ? (
                                                                            <div className="imgSecondStyles">
                                                                                <div className="courseUploadImgContainer">
                                                                                    <img src={uploadedImage} alt="Uploaded" />
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="UploadImgInCourse" >
                                                                                <div className="UploadToCloudCont">
                                                                                    <img
                                                                                        src="https://img.icons8.com/ios/50/upload-to-cloud--v1.png"
                                                                                        alt="upload to cloud"
                                                                                        className="upload-logo"
                                                                                    />
                                                                                    <p className="UploadToCloudContPara">
                                                                                        Drag course logo here
                                                                                    </p>
                                                                                </div>
                                                                                <p className="UploadToCloudContPara">or</p>
                                                                            </div>
                                                                        )}

                                                                        <div className="dragButtonContainerCourse">
                                                                            <input
                                                                                type="file"
                                                                                ref={fileInputRef}
                                                                                style={{ display: "none" }}
                                                                                onChange={(e) => handleFileChange(e)}
                                                                            />
                                                                            <button type='button' onClick={onClickUpload} className="browse-btn">
                                                                                <span class="material-symbols-outlined">
                                                                                    add
                                                                                </span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Modal.Body>

                                            </Modal>
                                            <div className="post_container">
                                                <p> <span className="number"></span> Posts</p>

                                                <p><span className="number">1000</span> followers</p>
                                            </div>


                                        </div>

                                    </div>

                                    <div className="Bio">
                                        <p>rohith._.justin </p>
                                        <p>I love  My brother</p>
                                        <p>I love My india</p>
                                    </div>
                                </div>


                            </div>
                        )}

                        <div className='profilePostsContainer'>
                            {/* Buttons for toggling between posts and community */}
                            <div className="save_post">
                                <div className='innerSavePostContainer'>
                                    <button className={`post_button ${selectedTab === 'posts' ? 'post_buttonAactive' : ''}`} onClick={() => handleTabChange('posts')}>
                                        <span className="material-symbols-outlined">
                                            grid_on
                                        </span>
                                        <span className="desktop-text">POSTS</span>
                                    </button>
                                    <button className={`post_button ${selectedTab === 'community' ? 'post_buttonAactive' : ''}`} onClick={() => handleTabChange('community')}>
                                        <span className="material-symbols-outlined">
                                            diversity_2
                                        </span>
                                        <span className="desktop-text"> COMMUNITY </span>
                                    </button>
                                    <button className={`post_button ${selectedTab === 'saved' ? 'post_buttonAactive' : ''}`} onClick={() => handleTabChange('saved')}>
                                        <span className="material-symbols-outlined">
                                            bookmark
                                        </span>
                                        <span className="desktop-text">  SAVED </span>
                                    </button>
                                </div>
                            </div>


                            {selectedTab === 'posts' && <Posts postInfo={postsData} />}
                            {selectedTab === 'community' && <Posts postInfo={community} />}
                            {selectedTab === 'saved' && <Posts postInfo={community} />}
                        </div>
                    </div>
                </div>
            }


        </div>
    );
}

export default Profile;
