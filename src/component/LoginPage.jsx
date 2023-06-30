import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import RegisterPage from "./RegisterPage";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const LOGIN_URL = "/auth/login";

const saveTokenToLocalStorage = (token) => {
  localStorage.setItem("accessToken", token);
};

const LoginPage = (props) => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [succes, setSucces] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [username, password]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita il comportamento di invio predefinito del form

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      saveTokenToLocalStorage(accessToken);
      console.log("token salvato nel localstorage", accessToken);
      const roles = response?.data?.roles;
      setAuth({ username, password, roles, accessToken });
      setUsername("");
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
        setErrorMessage("login fallito");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {succes ? (
        <section>
          <h1>Benvenuto!</h1>
          <br />
          <p>
            <a href="#">Vai alla Home</a>
          </p>
        </section>
      ) : (
        <div className="auth-form">
          <Container>
            <p
              ref={errRef}
              className={errorMessage ? "errorMessage" : "offscreen"}
              aria-live="assertive"
            >
              {errorMessage}
            </p>
            <Row>
              <Col>
                <h1>Login</h1>
                {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}

                <Form className="login-form" onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <label className="label">Username:</label>
                    <Form.Control
                      type="text"
                      ref={userRef}
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <Form.Text className="text-muted">
                      We'll never share your username with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <label className="label">Password:</label>
                    <Form.Control
                      type="password"
                      ì
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button variant="white" type="submit">
                    Login
                  </Button>
                </Form>
                <Button
                  variant="white"
                  className="link-btn"
                  onClick={props.onFormSwitch}
                >
                  Non hai un account? Registrati qui!
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default LoginPage;