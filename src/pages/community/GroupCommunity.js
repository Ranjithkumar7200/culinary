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
import { FaRegPaperPlane, FaUserPlus } from "react-icons/fa";
import prabhas from "../../imges/praba.jpeg";
import CreateCommunityForm from "./createcommunity";
function GroupCommunity({ ...props }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(2);

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
  const showCreateFormHandler = () => {
    setShowCreateForm(true);
  };

  const hideCreateFormHandler = () => {
    setShowCreateForm(false);
  };
  const chatMessages = Array.from({ length: 30 }, (_, index) => (
    <Card key={index} >
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
        <h6>{"@Ranjith"}</h6>
        <p>{hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
        </Col>
        <Image
        width={300}
        height={300}
        src={prabhas}
        
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
      <Col className="m-1">
      <Button>Order Now</Button>
      </Col>
    </Card>
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
                <h5>{props.groupName}</h5>
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
