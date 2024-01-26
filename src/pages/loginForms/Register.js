import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { LogAndRegSchema } from "./LoginValidation";
import { useRegisterUserMutation } from "../../redux/api/AuthApi";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import BasicButton from "../../components/BasicButton";
const Register = () => {
  const [email, setEmail] = useState("");
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const history = useNavigate();
  const [registerApi, { isLoading }] = useRegisterUserMutation();
  const handleRegister = async () => {
    try {
      const response = await registerApi({
        Email: email,
        Password: password,
        Repeat_Password: confirmPassword,
      });
      console.log(response);
      if (response.error.originalStatus === 200) {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        toast.success(response.error.data, { autoClose: 1000 });
        console.log("if part");
        console.log(response.error.data);
        history("/login");
      } else {
        console.log("else part");
        toast.error(response.error.data, { autoClose: 1000 });
        console.log(response.error.data);
      }
    } catch (error) {
      toast("An error occurred while registering.");
    }
  };
  const showPassword = () => {
    let eye = document.getElementById("password");
    if (eye.type === "password") {
      eye.type = "text";
      setPasswordIcon(true);
    } else {
      eye.type = "password";
      setPasswordIcon(false);
    }
  };
  const showConfirmPassword = () => {
    let eye = document.getElementById("RepeatPassword");
    if (eye.type === "password") {
      eye.type = "text";
      setConfirmPasswordIcon(true);
    } else {
      eye.type = "password";
      setConfirmPasswordIcon(false);
    }
  };

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
  };

  return (
    <>
      <Container className="vh-100 d-flex flex-column flex-wrap-wrap justify-content-center align-items-center">
        <Row>
          <Col>
            <img
              src={
                "https://marketplace.canva.com/EAFaFUz4aKo/2/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-JmYWTjUsE-Q.jpg"
              }
              width={150}
              className="rounded-circle mb-3"
              alt="..."
            ></img>
          </Col>
        </Row>
        <Row className="shadow p-3 mb-5 bg-body rounded d-flex flex-column justify-content-center align-items-center">
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <h5>Register</h5>
            <p className="text-secondary">
              Welcome back! Please enter your details
            </p>
          </Col>
          <Col>
            <Formik
              initialValues={initialValues}
              validationSchema={LogAndRegSchema}
              onSubmit={handleRegister}
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
                <Form className="d-flex flex-column justify-content-start">
                  <Row className="d-flex mt-2 flex-row justify align-items-start">
                    <Col className="d-flex flex-row justify-end align-items-start">
                      <Form.Label
                        htmlFor="email"
                        className="d-flex flex-row justify-start"
                      >
                        Email<span className="text-danger">*</span>
                      </Form.Label>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-row justify-between align-items-center">
                    <Col className="d-flex flex-row justify-content-end align-items-center">
                      <Form.Control
                        name="email"
                        type="email"
                        size="md"
                        id="email"
                        className={`form-control ${
                          touched.email && errors.email ? "is-invalid" : ""
                        }`}
                        onChange={(e) => {
                          setEmail(e.target.value.trim());
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Row>
                  {touched.email && errors.email ? (
                    <p className="text-danger">{errors.email}</p>
                  ) : (
                    ""
                  )}
                  <Row className="d-flex flex-row justify align-items-center">
                    <Col className="d-flex flex-row justify-end align-items-center">
                      <Form.Label
                        htmlFor="password*"
                        className="d-flex flex-row justify-start"
                      >
                        password <span className="text-danger">*</span>
                      </Form.Label>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-row justify-between align-items-center">
                    <Col className="d-flex flex-row justify-content-end align-items-center">
                      <Form.Control
                        name="password"
                        type="password"
                        size="md"
                        id="password"
                        className={`position-relative form-control ${
                          touched.password && errors.password
                            ? "border-danger"
                            : ""
                        }`}
                        onChange={(e) => {
                          setPassword(e.target.value.trim());
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                      ></Form.Control>
                      <div
                        className="position-absolute m-2 pointer"
                        onClick={showPassword}
                      >
                        {password ? (
                          <>
                            {!passwordIcon ? (
                              <AiOutlineEyeInvisible />
                            ) : (
                              <AiOutlineEye />
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </Col>
                  </Row>
                  {touched.password && errors.password ? (
                    <p className="text-danger m-1">{errors.password}</p>
                  ) : (
                    ""
                  )}
                  <Row className="d-flex flex-row justify align-items-center">
                    <Col className="d-flex flex-row justify-end align-items-center">
                      <Form.Label
                        htmlFor="RepeatPassword"
                        className="d-flex flex-row justify-start"
                      >
                        Confirm Password <span className="text-danger">*</span>
                      </Form.Label>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-row justify-between align-items-center">
                    <Col className="d-flex flex-row justify-content-end align-items-center">
                      <Form.Control
                        name="confirmPassword"
                        type="password"
                        size="md"
                        id="RepeatPassword"
                        className={`position-relative form-control ${
                          touched.confirmPassword && errors.confirmPassword
                            ? "border-danger"
                            : ""
                        }`}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value.trim());
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                      ></Form.Control>
                      <div
                        className="position-absolute m-2 pointer"
                        onClick={showConfirmPassword}
                      >
                        {confirmPassword ? (
                          <>
                            {!confirmPasswordIcon ? (
                              <AiOutlineEyeInvisible />
                            ) : (
                              <AiOutlineEye />
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </Col>
                  </Row>

                  {touched.confirmPassword && errors.confirmPassword ? (
                    <p className="text-danger m-1">{errors.confirmPassword}</p>
                  ) : (
                    ""
                  )}
                  <Row className="d-flex mt-2 flex-row justify align-items-start">
                    <Col className="d-flex flex-row justify-end align-items-start">
                      <Form.Label
                        htmlFor="location"
                        className="d-flex flex-row justify-start"
                      >
                        Location<span className="text-danger">*</span>
                      </Form.Label>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-row justify-between align-items-center">
                    <Col className="d-flex flex-row justify-content-end align-items-center">
                      <Form.Select
                        className={`form-control ${
                          touched.confirmPassword && errors.confirmPassword
                            ? "border-danger"
                            : ""
                        }`}
                        id="location"
                        name="location"
                        onChange={(e) => {
                          setLocation(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                      >
                        <option value="" disabled>----select Location----</option>
                        <option value={"Chennai"}>Chennai</option>
                        <option value={"Hyderabad"}>Hyderabad</option>
                        <option value={"Bangalore"}>Bangalore</option>
                        <option value={"Kerala"}>Kerala</option>
                      </Form.Select>
                      
                    </Col>
                  </Row>
                  {touched.confirmPassword && errors.confirmPassword ? (
                        <p className="text-danger m-1">
                          {errors.confirmPassword}
                        </p>
                      ) : (
                        ""
                      )}
                  <BasicButton
                    className="mt-3 "
                    variant={"warning"}
                    type="button"
                    disabled={isSubmitting}
                    onClick={
                      email === "" ||
                      password === "" ||
                      confirmPassword === "" ||
                      location === "" ||
                      (touched.email && errors.email) ||
                      (touched.password && errors.password) ||
                      (touched.confirmPassword && errors.confirmPassword)
                      (touched.location && errors.location)
                        ? handleSubmit
                        : handleRegister
                    }
                    isLoading={isLoading}
                    label={"Register"}
                  />

                  <Row className="m-4">
                    <p className="text-center">
                      Already have an account?
                      <Link className="m-1 textDecoration-none" to={"/"}>
                        Login
                      </Link>
                    </p>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
