import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import prabhas from "../../imges/praba.jpeg";
import CreateCommunityForm from "./createcommunity";
import { useGetCommunityQuery } from "../../redux/api/CommunityApi";
import TokenService from "../../services/TokenServices";
import FadeIn from "react-fade-in/lib/FadeIn";

import { adminPanalApiServices } from "../../services/allApiServeces";

function GroupCommunity() {
  const id = TokenService.getUserIdFromToken();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(2);
  const [communityDetails, setCommunityDetails] = useState([]);
  const { data: communityData } = useGetCommunityQuery(id);

  useEffect(() => {
    const timer = setInterval(() => {
      if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(timer);
        // Timer expired, you can add your logic here
      } else {
        if (seconds === 0) {
          if (minutes === 0) {
            setHours(prevHours => prevHours - 1);
            setMinutes(59);
          } else {
            setMinutes(prevMinutes => prevMinutes - 1);
          }
          setSeconds(59);
        } else {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, minutes, hours]);


  useEffect(() => {


    const fetchData = async () => {

      let communityDetails = await adminPanalApiServices.getCommunityDetails()

      setCommunityDetails(communityDetails.data.communityDetails)

      console.log(communityDetails.data.communityDetails)



    }

    fetchData()

  }, []);



  const showCreateFormHandler = () => {
    setShowCreateForm(true);
  };

  const hideCreateFormHandler = () => {
    setShowCreateForm(false);
  };



  return (
    <>
      <div className="container">
        {!showCreateForm ? (
          <>
            <FadeIn >
              <div className="card">

                <div className="card-header">

                  {communityDetails && communityDetails.length > 0 && (
                    <h5>{communityDetails[0].communityName}</h5>
                  )}



                  <h5>
                    <FaUserPlus
                      className="pointer"
                      color="white"
                      onClick={showCreateFormHandler}
                    />
                  </h5>
                </div>


                <div className="card-body">

                  <div className="message-card">
                    <div className="message-header">
                      <img
                        src={prabhas}
                        alt="Profile"
                        className="profile-pic"
                      />
                      <div className="message-info">
                        <h6>{"@Ranjith"}</h6>
                        <p>{`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</p>
                      </div>
                    </div>
                    <img
                      src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-oMiQKCzp4zPtiLdJiCBIWsyf-UfPQUMmAA&usqp=CAU"}
                      alt="Message"
                      className="message-image"
                    />
                    <p className="message-timestamp">{"00:00"}</p>
                    <button className="add-cart-button">Add Cart</button>
                  </div>
                  
                  <div className="message-card">
                    <div className="message-header">
                      <img
                        src={prabhas}
                        alt="Profile"
                        className="profile-pic"
                      />
                      <div className="message-info">
                        <h6>{"@Ranjith"}</h6>
                        <p>{`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</p>
                      </div>
                    </div>
                    <img
                      src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-oMiQKCzp4zPtiLdJiCBIWsyf-UfPQUMmAA&usqp=CAU"}
                      alt="Message"
                      className="message-image"
                    />
                    <p className="message-timestamp">{"00:00"}</p>
                    <button className="add-cart-button">Add Cart</button>
                  </div>

                </div>


              </div>
            </FadeIn>
          </>
        ) : (
          <CreateCommunityForm onBack={hideCreateFormHandler} />
        )}
      </div>
    </>
  );
}

export default GroupCommunity;
