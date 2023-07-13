import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import {
  Facebook,
  Instagram,
  PersonCircle,
  Twitter,
} from "react-bootstrap-icons";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <section>
        <h2 className="d-flex justify-content-center my-5">I tuoi dati</h2>
        <Container>
          <Row className="justify-content-center align-items-center h-100">
            <Col lg={6} className="mb-4 mb-lg-0">
              <Card className="mb-3" style={{ borderRadius: ".5rem" }}>
                <Row className="g-0">
                  <Col
                    md="4"
                    className="gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <div className="mt-5">
                      <PersonCircle
                        className="mb-5"
                        style={{ fontSize: "80px" }}
                      />
                      <h4 className="my-4">{userDetails?.name}</h4>
                      <h3 className="my-4">{userDetails?.surname}</h3>
                    </div>
                  </Col>
                  <Col md="8">
                    <Card.Body className="p-4">
                      <h6>Calciatore</h6>
                      <hr className="mt-0 mb-4" />
                      <Row className="pt-1">
                        <Col size="6" className="mb-3">
                          <h6>Username</h6>
                          <Card.Text className="text-muted">
                            {userDetails?.username}
                          </Card.Text>
                        </Col>
                        <Col size="6" className="mb-3">
                          <h6>Ruolo</h6>
                          <Form.Select defaultValue="default">
                            <option value="default" disabled>
                              Che ruolo sei?
                            </option>
                            <option value="portiere">Portiere</option>
                            <option value="difensore">Difensore</option>
                            <option value="centrocampista">
                              Centrocampista
                            </option>
                            <option value="attaccante">Attaccante</option>
                          </Form.Select>
                        </Col>
                      </Row>
                      <h6 tag="h6">Info</h6>
                      <hr className="mt-0 mb-4" />
                      <Row className="pt-1">
                        <Col size="6" className="mb-3">
                          <h6>Email</h6>
                          <Card.Text className="text-muted">
                            {userDetails?.email}
                          </Card.Text>
                        </Col>
                        <Col size="6" className="mb-3">
                          <h6>Password</h6>
                          <InputGroup>
                            <Form.Control
                              className="psw-text"
                              type="password"
                              defaultValue={userDetails?.password}
                              readOnly
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-start">
                        <a href="#!">
                          <Facebook size={74} />
                        </a>
                        <a href="#!">
                          <Twitter size={74} />
                        </a>
                        <a href="#!">
                          <Instagram size={74} />
                        </a>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProfilePage;
