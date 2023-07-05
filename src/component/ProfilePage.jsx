import React, { useState } from "react";
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

const ProfilePage = () => {
  const [nome, setNome] = useState("");
  const [cognome, setCognme] = useState("");
  const [email, setEmail] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Esegui qui la logica per salvare le modifiche del profilo
  };

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
            <Col lg="6" className="mb-4 mb-lg-0">
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
                    <CardImage
                      src="https://cdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="my-5"
                      style={{ width: "80px" }}
                      fluid
                    />
                    <h5>Marie Horwitz</h5>
                    <CardText>Web Designer</CardText>
                    <Pencil far icon="edit mb-5" />
                  </Col>
                  <Col md="8">
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
