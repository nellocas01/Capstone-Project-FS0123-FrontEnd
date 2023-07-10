import React, { useContext, useEffect, useState } from "react";
import FooterComponent from "./FooterComponent";
import NavbarComponent from "./NavbarComponent";
import { Col, Container, Form, Row } from "react-bootstrap";

const ProfilePage = () => {
  const [token, setToken] = useState();
  const [utente, setUtente] = useState({
    id: "",
    nome: "",
    cognome: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleUtente = async (event) => {
    event.preventDefaul();
    try {
      const response = await fetch(`http://localhost:3001/users/${utente.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(utente),
      });
      console.log(response);
      if (response.ok) {
        const risposta = await response.json();
        console.log(risposta);
        setUtente({
          ...utente,
          nome: risposta.nome,
          cognome: risposta.cognome,
          username: risposta.username,
          email: risposta.email,
          password: risposta.password,
        });
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(utente);
  }, [utente]);
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
                value={utente.nome}
                onChange={handleUtente}
                placeholder=""
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Cognome
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Username
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="******" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Data di nascita
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="date" placeholder="data di nascita" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Ruolo
            </Form.Label>
            <Col sm={10}>
              <Form.Select>
                <option>Seleziona un ruolo</option>
                <option>Portiere</option>
                <option>Difensore</option>
                <option>Centrocampista</option>
                <option>Attaccante</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Genere
            </Form.Label>
            <Col sm={10}>
              <Form.Select>
                <option>Seleziona un genere</option>
                <option value="male">Maschio</option>
                <option value="female">Femmina</option>
                <option value="other">Altro</option>
              </Form.Select>
            </Col>
          </Form.Group>
          {/* FOOTER */}
          <FooterComponent />
        </Form>
      </Container>
    </>
  );
};

export default ProfilePage;
