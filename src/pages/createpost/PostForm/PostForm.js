import React, { useState } from 'react'

import './PostForm.css'
import dietTypes from '../../../constants/dietTypes'
import postTypes from '../../../constants/postTypes'

const PostForm = ({ postType }) => {
    const [imageFile, setImageFile] = useState({})
    const [nameInput, setNameInput] = useState(null)
    const [dietInput, setDietInput] = useState(null)
    const [descriptionInput, setDescriptionInput] = useState(null)
    const [rateInput, setRateInput] = useState(null)

    const handleFormSubmit = (event) => {
        event.preventDefault()
        console.log("There we go!")
    }

    // console.log(imageFile, nameInput, dietInput, descriptionInput)


    const isHomePost = postType === postTypes.HOME_POST ? true : false;
    const formTitle = isHomePost ? "Home" : "Community";

    return (
        <div className='home_post_form_main_container'>

            <form className='home_post_form_card' onSubmit={handleFormSubmit}>
                <h1 className='home_post_main_title'>{formTitle} Post Form</h1>

                <div>
                    <div className='home_post_label_input_card'>
                        <label htmlFor='image' className='home_post_label_text'>Select Image</label>
                        <div className='home_post_input_card'>
                            <input type='file' className='home_post_image_file_input' onChange={(e) => setImageFile(e?.target?.files[0])} />
                        </div>
                    </div>

                    <div className='home_post_label_input_card'>
                        <label htmlFor='name' className='home_post_name_label'>Name</label>
                        <input id='name' type='text' placeholder='Name' className='home_post_name_input' onChange={(e) => setNameInput(e?.target?.value)} />
                    </div>

                    <div className='home_post_label_input_card'>
                        <label htmlFor='diet-type' className='home_post_name_label'>Diet Type</label>
                        <select name='diet-type' id='diet-type' className='home_post_select_card' onChange={(e) => setDietInput(e?.target?.value)}>
                            {
                                dietTypes.map((item, _index) => <option key={_index} value={item} >{item.toLocaleUpperCase()}</option>)
                            }
                        </select>
                    </div>

                    {!isHomePost ? <div className='home_post_label_input_card'>
                        <label htmlFor='rate' className='home_post_name_label'>Rate</label>
                        <input id='rate' type='number' placeholder='Price' className='home_post_name_input' onChange={(e) => setRateInput(e?.target?.value)} />
                    </div> : null}

                    <div className='home_post_label_input_card'>
                        <label htmlFor='text-area' className='home_post_name_label'>Description</label>
                        <textarea id='text-area' className='home_post_text_area' placeholder='description' onChange={(e) => setDescriptionInput(e?.target?.value)} />
                    </div>

                    <div className='home_post_submit_button_card'>
                        <button className='home_post_submit_button' type='submit'>Submit</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default PostForm