import React, { useEffect, useState } from "react";

import Navbar from "../../components/navbar/navbar";

import food1 from "../../imges/food1.jpeg";
import food2 from "../../imges/food2.jpg";
import food3 from "../../imges/food3.jpeg";
import food4 from "../../imges/food4.jpg";
import food5 from "../../imges/food5.jpg";
import food6 from "../../imges/food6.jpg";
import * as Yup from "yup";
import prabhas from "../../imges/praba.jpeg";

import CreateCommunityForm from "./createcommunity";

import "../dashboard/common.css";

import "./community.css";
import GroupCommunity from "./GroupCommunity";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import BasicButton from "../../components/BasicButton";
import {
  useCreateCommunityMutation,
  useGetCommunityQuery,
} from "../../redux/api/CommunityApi";
import { toast } from "react-toastify";

// import { current } from '@reduxjs/toolkit';

const Community = () => {
  const [showModal, setShowModal] = useState(false);
  const [showGruop, setShowGroup] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [communityDetails, setCommunityDetails] = useState([]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [createCommunity, { isLoading }] = useCreateCommunityMutation();
  const { data: communityData } = useGetCommunityQuery();

  const validationSchema = Yup.object().shape({
    communityName: Yup.string()
      .min(3, "Community name must be at least 3 characters")
      .required("Community name is required"),
  });
  useEffect(() => {
    if (communityData && communityData.communityDetails) {
      setCommunityDetails(communityData.communityDetails);
    }
  }, [communityData]);

  // Other code...

  console.log(communityDetails);
  const handleShowGroup = async () => {
    try {
      const response = await createCommunity({
        communityName: inputValue,
      });
      console.log(response);
      if (response?.data) {
        setInputValue("");

        setShowGroup(true);
        setShowModal(false);
        toast.success(response?.data.message, { autoClose: 1000 });
        console.log("if part");
        console.log(response);
      } else {
        toast.success(response.error.data, { autoClose: 1000 });
        console.log("else part");
        console.log(response);
      }
    } catch (error) {
      toast("An error occurred while Forget.");
      console.log(error);
    }
  };

  const initialValues = {
    communityName: "",
  };

  const postsData = [
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

  return (
    <div className=" homeContiner">
      <Navbar />
      <span></span>

      <div className="posthomeRightContainer">
        <div class="homePOstFeedContainer  communityContainer">
          {communityDetails.map((community) => (
            <React.Fragment key={community.communityName}>
              {community.communityName ? (
                <GroupCommunity />
              ) : (
                <div className="createCommunityButtonContainer">
                  <button onClick={handleShow}>Create Community</button>
                </div>
              )}
            </React.Fragment>
          ))}
          {/* {showGruop ? (
            <GroupCommunity  />
          ) : (
            <div className="createCommunityButtonContainer">
              <button onClick={handleShow}>Create Community</button>
            </div>
          )} */}
        </div>

        <div className="userHomeContainer">
          <div className="userSuggestedContainer">
            <div className="userContainerInSuggestion">
              <div className="userSuggestionInnerLeftContainer">
                <div className="userSuggetionContiainerInSuggetion">
                  <img
                    className="userImgInPostCard "
                    src={prabhas}
                    alt="user"
                  />
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

            {postsData.map((post) => (
              <div className="userContainerInSuggestion">
                <div className="userSuggestionInnerLeftContainer">
                  <div className="userSuggetionContiainerInSuggetion">
                    <img
                      className="userImgInPostCard "
                      src={prabhas}
                      alt="user"
                    />
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
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleShowGroup}
        initialValues={initialValues}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Modal show={showModal} centered onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create Community</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formInput">
                  <Form.Control
                    type="text"
                    name="communityName"
                    placeholder="Enter Community name"
                    value={inputValue}
                    className={`form-control ${
                      touched.communityName && errors.communityName
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                  />
                  {touched.communityName && errors.communityName ? (
                    <p className="text-danger m-1">{errors.communityName}</p>
                  ) : (
                    ""
                  )}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <BasicButton
                className="mt-3 "
                variant={"warning"}
                type="button"
                disabled={isSubmitting}
                onClick={
                  inputValue === "" ||
                  (touched.communityName && errors.communityName)
                    ? handleSubmit
                    : handleShowGroup
                }
                isLoading={isLoading}
                label={"Create"}
              />
            </Modal.Footer>
          </Modal>
        )}
      </Formik>
    </div>
  );
};

export default Community;
