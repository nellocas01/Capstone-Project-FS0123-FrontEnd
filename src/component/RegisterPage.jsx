import React, { useState } from "react";
import LoginPage from "./LoginPage";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const RegisterPage = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="auth-form">
      <Form className="register-form" onSubmit={handleSubmit}>
        <Form.Group controlId="text">
          <label className="label">Nome</label>
          <Form.Control
            type="text"
            placeholder="Inserisci il tuo nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <label className="label">Cognome</label>
          <Form.Control
            type="text"
            placeholder="Inserisci il tuo cognome"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <label className="label">Username</label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <label className="label">email</label>
          <Form.Control
            type="email"
            placeholder="Inserisci la tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <label className="label">Password</label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="white" type="submit">
          Registrati!
        </Button>
      </Form>
      <Button variant="white" className="link-btn" onClick={props.onFormSwitch}>
        Hai già un account? Login.
      </Button>
    </div>
  );
};

export default RegisterPage;
