import React, { useState, useRef } from 'react';
import './PostForm.css';
import dietTypes from '../../../constants/dietTypes';
import postTypes from '../../../constants/postTypes';
import { adminPanalApiServices } from '../../../services/allApiServeces';
import { toast } from 'react-toastify';
import Multiselect from 'multiselect-react-dropdown';
// import Multiselect from 'react-multiselect-checkbox';


import 'react-toastify/dist/ReactToastify.css';

const PostForm = ({ postType }) => {
    const [formData, setFormData] = useState({
        // imageFile: null,
        nameInput: '',
        dietInput: '',
        category:[],
        descriptionInput: '',
        rateInput: ''
    });

    const [imageFile, setImageFile] = useState(null)

    const [uploadedImage, setUploadedImage] = useState(null);
    const [errormsgState, setErrorMsgState] = useState({
        imgErrorMsg: false
    });

    const fileInputRef = useRef(null);

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

        if (validateForm()) {

            if (postType === "homePost") {



                let userId = JSON.parse(localStorage.getItem("user")).userId

                // console.log(userId)

                // console.log("Initial formData:", formData);

                let finalData = new FormData();

                finalData.append('image', imageFile);

                let postDataFormate = {
                    postedBy: userId,
                    postType: "posts",
                    dishName: formData.nameInput,
                    descr: formData.descriptionInput,
                    aboutfood:formData.category


                }

                console.log(postDataFormate)

                //                 {"postedBy":"65b28744a5e261775967bafa",
                // "postType":"community",
                // "dishName":"sss@gmai",
                // "descr":"sss@gmai",
                // "aboutfood":["Vegans"]


                finalData.append('data', JSON.stringify(postDataFormate));


                await adminPanalApiServices.createPost(finalData)

            }

        }
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        if (!formData.imageFile || formData.nameInput === '' || formData.category.length === 0 || formData.descriptionInput === '') {
            setErrorMsgState({ imgErrorMsg: true });
            toast.error('Please fill in all mandatory fields and upload an image.');
            return false;
        }
        return true;
    };

    const isHomePost = postType === postTypes.HOME_POST;

    const formTitle = isHomePost ? "Home" : "Community";


    const handleRemove = (selectedList, removedItem) => {
        const updatedCategory = formData.category.filter(item => item !== removedItem.key);
        setFormData(prevState => ({
            ...prevState,
            category: updatedCategory
        }));
    
        
    };
    


    const handleSelect = (selectedList, selectedItem) => {

        setFormData(prevState => ({
            ...prevState,
            category: [...prevState.category, selectedItem.key]
        }));
    

    };
    


    return (
        <div className='home_post_form_main_container'>
            <form className='home_post_form_card' onSubmit={handleFormSubmit}>
                <h1 className='home_post_main_title'>{formTitle} Post Form</h1>
                <div>
                    <label className="form-label">Upload Image<span className="starIcon">*</span> </label>
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

                    <div className='home_post_label_input_card'>
                        <label htmlFor='name' className='home_post_name_label'>Name of Dish</label>
                        <input name='nameInput' id='name' type='text' placeholder='Name' className='home_post_name_input' onChange={handleChange} />
                    </div>
                    <div className='home_post_label_input_card'>
                        <label className='home_post_name_label'>Category</label>
                        <Multiselect
                            displayValue="key"
                            onRemove={handleRemove}
                            onSelect={handleSelect}
                            options={dietTypes.map((item, _index) => ({ cat: 'Category', key: item }))} // Transforming dietTypes into the required format
                            showCheckbox
                            className="multiselect-container"
                        />
                    </div>

                    {!isHomePost &&
                        <div className='home_post_label_input_card'>
                            <label htmlFor='rate' className='home_post_name_label'>Rate</label>
                            <input name='rateInput' id='rate' type='number' placeholder='Price' className='home_post_name_input' onChange={handleChange} />
                        </div>
                    }
                    <div className='home_post_label_input_card'>
                        <label htmlFor='text-area' className='home_post_name_label'>Description</label>
                        <textarea name='descriptionInput' id='text-area' className='home_post_text_area' placeholder='Description' onChange={handleChange} />
                    </div>
                    <div className='home_post_submit_button_card'>
                        <button className='home_post_submit_button' type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PostForm;
