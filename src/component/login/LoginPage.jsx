import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita il comportamento di invio predefinito del form

    // Creazione dell'oggetto di dati da inviare al server
    const formData = {
      username: username,
      password: password,
    };

    // Esempio di invio della richiesta al server utilizzando fetch
    fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Elabora la risposta del server
        console.log(data);
        // Esegui le azioni desiderate, ad esempio, controlla l'autenticazione
        // Verifica l'autenticazione
        if (data.success) {
          // L'utente è autenticato
          console.log("Utente autenticato!");
          handleLogin(username, password); // Chiamata alla funzione handleLogin per salvare il token
        } else {
          // L'autenticazione ha fallito
          console.log("Autenticazione fallita!");
          // Esegui le azioni desiderate per l'autenticazione fallita
          // Autenticazione fallita
          setErrorMessage("Credenziali non valide");
        }
      })
      .catch((error) => {
        // Gestisci gli errori di connessione o di elaborazione
        console.error(error);
      });
  };

  const handleLogin = async (username, password) => {
    try {
      // Effettua la richiesta di login al backend e ottieni il token
      const response = await axios.post("/api/login", { username, password });
      const token = response.data.token;

      // Salva il token nel localStorage
      localStorage.setItem("token", token);

      // Altre azioni dopo il login...
      // history.push("/home"); // Reindirizza l'utente alla pagina di home
    } catch (error) {
      // Gestisci eventuali errori durante il login
      console.error(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Login</h1>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your username with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
