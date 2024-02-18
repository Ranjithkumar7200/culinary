import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  Image,
} from "react-bootstrap";
import { FaRegPaperPlane, FaUserPlus } from "react-icons/fa";
import prabhas from "../../imges/praba.jpeg";
import CreateCommunityForm from "./createcommunity";
function GroupCommunity({ ...props }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const showCreateFormHandler = () => {
    setShowCreateForm(true);
  };

  const hideCreateFormHandler = () => {
    setShowCreateForm(false);
  };
  const chatMessages = Array.from({ length: 30 }, (_, index) => (
    <Card key={index} className="d-flex flex-row align-items-start p-2 m-1">
      <Image
        width={30}
        height={30}
        src={prabhas}
        roundedCircle
        className="profile-pic"
      />
      <Col>
        <h6>{"@Ranjith"}</h6>
        <p>
          {
            "welcome to my community hbwefgwyegfywegfywefvvbh hbwyfw bgwebyfvwf wveyfvwfe yvwyefvwf "
          }
        </p>
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
                  maxHeight: "calc(97vh - 100px)",
                }} // Set a maximum height to make sure it doesn't exceed the viewport height
              >
                {chatMessages}
              </CardBody>
            </Card>
            <CardFooter className="d-flex my-1 flex-row justify-content-end">
              <Form.Control size="md" />
              <FaRegPaperPlane
                className="m-1 pointer"
                size={30}
                color="green"
              />
            </CardFooter>
          </>
        ) : (
          <CreateCommunityForm onBack={hideCreateFormHandler} />
        )}
      </Container>
    </>
  );
}

export default GroupCommunity;
