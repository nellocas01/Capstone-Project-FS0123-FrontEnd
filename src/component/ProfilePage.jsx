import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import FooterComponent from "./FooterComponent";
import NavbarComponent from "./NavbarComponent";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState();

  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    setUserId(localStorage.getItem("utenteLoggato"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const fetchUser = async () => {
    if (token) {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUserDetails(user);
        } else {
          const errorData = await response.json();
          console.log(errorData);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <NavbarComponent />

      {/* PROFILE PAGE */}
      <Container className="my-5">
        <h2 className="d-flex justify-content-center my-5">I tuoi dati</h2>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Nome
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder=""
                value={userDetails?.name}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Cognome
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder=""
                value={userDetails?.surname}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Username
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder=""
                value={userDetails?.username}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                placeholder="Email"
                value={userDetails?.email}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder=""
                value={userDetails?.password}
              />
            </Col>
          </Form.Group>

          {/* FOOTER*/}
          <FooterComponent />
        </Form>
      </Container>
    </>
  );
};

export default ProfilePage;
