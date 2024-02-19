import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import "./Profile.css";
import { Button, Form, Modal } from 'react-bootstrap';


// import Modal from 'react-modal';
import { FaPenToSquare } from "react-icons/fa6";
import { Link, Route, Switch } from 'react-router-dom';
import Posts from '../Profile/posts';
import Comunityposts from '../Profile/comunityposts';
import { toast } from 'react-toastify';





import food1 from "../../imges/food1.jpeg";
import food2 from "../../imges/food2.jpg";
import food3 from "../../imges/food3.jpeg";
import food4 from "../../imges/food4.jpg";
import food5 from "../../imges/food5.jpg";
import food6 from "../../imges/food6.jpg";
import prabhas from "../../imges/praba.jpeg";
import "../dashboard/common.css";
import { adminPanalApiServices } from '../../services/allApiServeces';

// Modal.setAppElement('#root');

const Profile = ({ filteredPostsLength }) => {
    const [formData, setFormData] = useState({
        nameInput: '',
        dietInput: '',
        descriptionInput: '',
        rateInput: ''
    });

    const [showPosts, setShowPosts] = useState(false); // Changed to false to display only community posts
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userDetails, setUserDetails] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);


    const [showModal, setShowModal] = useState(false);
    const [showGruop, setShowGroup] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);


    const handleShowGroup = () => {
        setShowGroup(true);
        setShowModal(false)

    }



    const [errormsgState, setErrorMsgState] = useState({
        imgErrorMsg: false
    });
    const fileInputRef = useRef(null);


    useEffect(() => {
        const fetchData = async () => {
            let userDetails = await adminPanalApiServices.getUserProfile()
            setUserDetails(userDetails.data.data[0])
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
    console.log(filteredPostsLength, "hello");
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
                                        src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg"
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



                                        </div>
                                        {/* <Modal
                                            isOpen={modalIsOpen}
                                            onRequestClose={closeModal}
                                            contentLabel="Edit Profile Modal"

                                            style={{
                                                overlay: {
                                                    width: '100vw',
                                                    height: '100vh',
                                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                    
                                                },
                                                content: {
                                                    width: '40%',
                                                    height: '50%',
                                                    margin: 'auto',
                                                    border: '1px solid red',
                                                   

                                                }
                                            }
                                            }

                                        >


                                            <form onSubmit={handleFormSubmit} className="editForm">
                                                <div className='editContainer' >
                                                    <div className="editRight">
                                                        <div className='editInpContainer'>
                                                            <label htmlFor='name' className='editintText'>User Name</label>
                                                            <input name='nameInput' id='name' type='text' placeholder='Name' className='editint mx-auto' onChange={handleChange} />
                                                        </div>


                                                        <div className='editInpContainer'>
                                                            <label htmlFor='rate' className='editintText'>Favorite Food</label>
                                                            <input name='rateInput' id='rate' type='number' placeholder='Food' className='editint mx-auto' onChange={handleChange} />
                                                        </div>
                                                        <div className='editInpContainer'>
                                                            <label htmlFor='location' className='editintText'>Location Preference</label>
                                                            <select name='locationInput' id='location' className='editint mx-auto' value={formData.locationInput} onChange={handleChange}>
                                                                <option value="">----select Location----</option>
                                                                <option value={"Chennai"}>Chennai</option>
                                                                <option value={"Hyderabad"}>Hyderabad</option>
                                                                <option value={"Bangalore"}>Bangalore</option>
                                                                <option value={"Kerala"}>Kerala</option>
                                                            </select>
                                                        </div>


                                                        <div className='editBtnContainer'>
                                                            <button className='editSubmitBtn' type='submit'>Save</button>
                                                            <button className='editCloseBtn' onClick={closeModal}> Close </button>
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
                                            </form>





                                        </Modal>   */}


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
                                                src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg"
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
                                                                <button className='editCloseBtn' onClick={closeModal}> Close </button>
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


                                    <button className={`post_button ${showPosts ? 'post_buttonAactive' : ''}`} onClick={toggleShowPosts}>
                                        <span class="material-symbols-outlined">
                                            grid_on
                                        </span>
                                        <span className="desktop-text">POSTS</span>
                                    </button>
                                    <button className={`post_button ${!showPosts ? 'post_buttonAactive' : ''}`} onClick={toggleShowPosts}>
                                        <span class="material-symbols-outlined">
                                            diversity_2
                                        </span>
                                        <span className="desktop-text"> COMMUNITY </span>
                                    </button>
                                    <button className={`post_button ${!showPosts ? 'post_buttonAactive' : ''}`} onClick={toggleShowPosts}>
                                        <span class="material-symbols-outlined">
                                            bookmark
                                        </span>
                                        <span className="desktop-text">  SAVED </span>
                                    </button>

                                </div>
                            </div>

                            {/* Conditional rendering of posts or community */}
                            {showPosts ? <Posts /> : <Comunityposts />}
                        </div>
                    </div>
                </div>


            }


        </div>
    );
}

export default Profile;
