import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import FooterComponent from "./FooterComponent";
import NavbarComponent from "./NavbarComponent";
import {
  CardImage,
  CardText,
  Facebook,
  Instagram,
  Pencil,
  Twitter,
} from "react-bootstrap-icons";
import AuthContext from "../context/AuthProvider";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  //const [token, setToken] = useState();
  //const [utente, setUser] = useState();
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setCognome(user.cognome);
      setEmail(user.email);
    }
  }, [user]);

  // useEffect(() => {
  //   setToken(localStorage.getItem("accessToken"));
  //   const loggedInUser = localStorage.getItem("utenteLoggato");
  //   if (loggedInUser) {
  //     setUser(JSON.parse(loggedInUser)); // Imposta la variabile di stato user con i dati dell'utente loggato
  //     fetchUser();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [token]);

  // const fetchUser = async () => {
  //   if (token) {
  //     try {
  //       const response = await fetch(`http://localhost:3001/users`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       if (response.ok) {
  //         const userData = await response.json();
  //         console.log(userData);
  //         // const loggedUser = userData.content.find(
  //         //   (user) => user.username === user.username
  //         // );
  //         // if (loggedUser) {
  //         //   setNome(loggedUser.name);
  //         //   setCognome(loggedUser.surname);
  //         //   setEmail(loggedUser.email);
  //         // }
  //       } else {
  //         //console.log("Errore durante la richiesta dei campi");
  //         const errorData = await response.json();
  //         console.log(errorData);
  //       }
  //     } catch (error) {
  //       console.log("Errore durante la richiesta dell'utente:", error);
  //     }
  //   }
  //   // Esegui qui la logica per salvare le modifiche del profilo
  // };

  return (
    <>
      {/* NAVBAR */}
      <NavbarComponent />

      {/* PROFILE PAGE */}
      {/* <Container className="my-5">
        <h1>Profilo personale</h1>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              type="text"
              value={cognome}
              onChange={(e) => setCognme(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Salva modifiche
          </Button>
        </Form>
      </Container> */}

      <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <Container className="py-5 h-100">
          <Row className="justify-content-center align-items-center h-100">
            <Col lg={6} className="mb-4 mb-lg-0">
              <Card className="mb-3" style={{ borderRadius: ".5rem" }}>
                <Row className="g-0">
                  <Col
                    md={4}
                    className="gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <CardImage
                      src="https://cdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="my-5"
                      style={{ width: "80px" }}
                      fluid
                    />
                    <h5>{`${nome} ${cognome}`}</h5>
                    <CardText>Web Designer</CardText>
                    <Pencil far icon="edit mb-5" />
                  </Col>
                  <Col md={8}>
                    <Card.Body className="p-4">
                      <h6 tag="h6">Information</h6>
                      <hr className="mt-0 mb-4" />
                      <Row className="pt-1">
                        <Col size="6" className="mb-3">
                          <h6 tag="h6">Email</h6>
                          <CardText className="text-muted">
                            info@example.com
                          </CardText>
                        </Col>
                        <Col size="6" className="mb-3">
                          <h6 tag="h6">Phone</h6>
                          <CardText className="text-muted">
                            123 456 789
                          </CardText>
                        </Col>
                      </Row>

                      <h6 tag="h6">Information</h6>
                      <hr className="mt-0 mb-4" />
                      <Row className="pt-1">
                        <Col size="6" className="mb-3">
                          <h6 tag="h6">Email</h6>
                          <CardText className="text-muted">
                            info@example.com
                          </CardText>
                        </Col>
                        <Col size="6" className="mb-3">
                          <h6 tag="h6">Phone</h6>
                          <CardText className="text-muted">
                            123 456 789
                          </CardText>
                        </Col>
                      </Row>

                      <div className="d-flex justify-content-start">
                        <a href="#!">
                          <Facebook fab icon="me-3" size="lg" />
                        </a>
                        <a href="#!">
                          <Twitter fab icon="me-3" size="lg" />
                        </a>
                        <a href="#!">
                          <Instagram fab icon="me-3" size="lg" />
                        </a>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          {/* FOOTER */}
          <FooterComponent />
        </Container>
      </section>
    </>
  );
};

export default ProfilePage;
