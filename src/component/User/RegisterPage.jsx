import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { Form, Button } from "react-bootstrap";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const REGISTER_URL = "/auth/register";

const saveUserId = (userId) => {
  localStorage.setItem("utenteLoggato", userId);
};

const RegisterPage = (props) => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef(null);
  const errRef = useRef();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [succes, setSucces] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [name, surname, username, email, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        REGISTER_URL,

        JSON.stringify({ name, surname, username, email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data.id);
      const utenteLoggato = response.data.id;
      saveUserId(utenteLoggato);
      console.log("id utente salvato nel localstorage", utenteLoggato);
      const roles = response?.data?.roles;
      setAuth({
        name,
        surname,
        username,
        email,
        password,
        roles,
        utenteLoggato,
      });
      setName(name);
      setSurname("");
      setUsername("");
      setEmail("");
      setPassword("");
      setSucces(true);
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("il server non risponde");
      } else if (error.response?.status === 400) {
        setErrorMessage("Manca username o password");
      } else if (error.response?.status === 401) {
        setErrorMessage("non sei autorizzato");
      } else {
        setErrorMessage("registrazione fallita");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {succes ? (
        <section className="access flex-column">
          <h1>Benvenuto, {name}!</h1>
          <br />
          <p>
            <Link to="/login"> Effettua il tuo primo accesso!</Link>
          </p>
        </section>
      ) : (
        <div className="auth-form">
          <p
            ref={errRef}
            className={errorMessage ? "errorMessage" : "offscreen"}
            aria-live="assertive"
          >
            {errorMessage}
          </p>
          <h1>Registrazione</h1>
          <Form className="register-form" onSubmit={handleSubmit}>
            <Form.Group controlId="nome">
              <Form.Label className="label">Nome</Form.Label>
              <Form.Control
                type="text"
                ref={userRef}
                placeholder="Inserisci il tuo nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="cognome">
              <Form.Label className="label">Cognome</Form.Label>
              <Form.Control
                type="text"
                ref={userRef}
                placeholder="Inserisci il tuo cognome"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label className="label">Username</Form.Label>
              <Form.Control
                type="text"
                ref={userRef}
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label className="label">email</Form.Label>
              <Form.Control
                type="email"
                ref={userRef}
                placeholder="Inserisci la tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className="label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="white" type="submit">
              Registrati!
            </Button>
          </Form>
          <Button
            variant="white"
            className="link-btn"
            onClick={props.onFormSwitch}
          >
            Hai già un account?
            <Link to="/login"> Accedi!</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
