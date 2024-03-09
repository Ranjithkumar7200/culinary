import React, { useEffect, useState } from "react";
import {
    Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";
import prabhas from "../../imges/praba.jpeg";
import CreateCommunityForm from "./createcommunity";
import { useGetCommunityQuery } from "../../redux/api/CommunityApi";
import TokenService from "../../services/TokenServices";
import FadeIn from "react-fade-in/lib/FadeIn";
function GroupCommunity() {
  const id = TokenService.getUserIdFromToken();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(2);
  const [communityDetails, setCommunityDetails] = useState([]);
  const {data:communityData} = useGetCommunityQuery(id);

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
    if (communityData && communityData.communityDetails) {
      setCommunityDetails(communityData.communityDetails);
    }
  }, [communityData]);
  const showCreateFormHandler = () => {
    setShowCreateForm(true);
  };

  const hideCreateFormHandler = () => {
    setShowCreateForm(false);
  };
  const chatMessages = Array.from({ length: 30 }, (_, index) => (
    <FadeIn>
      <Card key={index} className="my-3" border="0" >
      <Col className="d-flex flex-row align-items-start p-2 m-1">
      <Image
        width={30}
        height={30}
        src={prabhas}
        roundedCircle
        className="profile-pic"
      />
      <Col>
        <Col className="d-flex justify-content-between">
        <h6 className="mx-2">{"@Ranjith"}</h6>
        <p>{hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
        </Col>
        <Image
        width={250}
        height={300}
        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-oMiQKCzp4zPtiLdJiCBIWsyf-UfPQUMmAA&usqp=CAU"}
        
        className=""
      />
        <p
          className="p-1"
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            marginBottom: "-2px",
          }}
        >
          {"00:00"}
        </p>
      </Col>
      </Col>
      <Col className="m-1 justify-content-center d-flex align-items-center">
      <Button className="text-light  fw-2" variant="warning" size="sm">Add Cart</Button>
      </Col>
    </Card>
    </FadeIn>
  ));
  return (
    <>
      <Container
        fluid
        className="d-flex flex-column"
        style={{ height: "100vh" }}
      >
        {!showCreateForm ? (
          <>
            <Card className="w-100" style={{ flex: "1 1 auto" }}>
              <CardHeader className="text-center d-flex justify-content-between fs-5">
              {communityDetails.map(community => (
                <h5>{community.communityName}</h5>
                ))}
                <h5>
                  <FaUserPlus
                    className="pointer"
                    onClick={showCreateFormHandler}
                  />
                </h5>
              </CardHeader>
              <CardBody
                className="overflow-auto" // Set overflow-auto to enable scrolling
                style={{
                  backgroundColor: "white",
                  maxHeight: "calc(100vh - 100px)",
                  width: "fit-content"
                }} // Set a maximum height to make sure it doesn't exceed the viewport height
              >
                {chatMessages}
              </CardBody>
            </Card>
            {/* <CardFooter className="d-flex my-1 flex-row justify-content-end">
              <Form.Control size="md" />
              <FaRegPaperPlane
                className="m-1 pointer"
                size={30}
                color="green"
              />
            </CardFooter> */}
          </>
        ) : (
          <CreateCommunityForm onBack={hideCreateFormHandler} />
        )}
      </Container>
    </>
  );
}

export default GroupCommunity;
