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

  // Stati per tenere traccia della validità dei campi
  const [isNameValid, setIsNameValid] = useState(false);
  const [isSurnameValid, setIsSurnameValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // Stato per tenere traccia della validità del form
  const [isFormValid, setIsFormValid] = useState(false);

  // Controlla la validità dei campi ad ogni cambio
  useEffect(() => {
    setIsNameValid(name.trim().length > 3);
    setIsSurnameValid(surname.trim().length > 2);
    setIsUsernameValid(username.trim().length > 3);
    setIsEmailValid(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    );
    setIsPasswordValid(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{5,}$/.test(password)
    );
  }, [name, surname, username, email, password]);

  // Controlla la validità generale del form ad ogni cambio
  useEffect(() => {
    setIsFormValid(
      isNameValid &&
        isSurnameValid &&
        isUsernameValid &&
        isEmailValid &&
        isPasswordValid
    );
  }, [
    isNameValid,
    isSurnameValid,
    isUsernameValid,
    isEmailValid,
    isPasswordValid,
  ]);

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
      //console.log(response.data.id);
      const utenteLoggato = response.data.id;
      saveUserId(utenteLoggato);
      //console.log("id utente salvato nel localstorage", utenteLoggato);
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
                isInvalid={!isNameValid} // Aggiungi il flag isInvalid per evidenziare il campo in rosso se non è valido
                required
              />
              <Form.Control.Feedback type="invalid">
                Il Nome deve contenere almeno 4 caratteri di cui il primo
                MAIUSCOLO
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="cognome">
              <Form.Label className="label">Cognome</Form.Label>
              <Form.Control
                type="text"
                ref={userRef}
                placeholder="Inserisci il tuo cognome"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                isInvalid={!isSurnameValid} // Aggiungi il flag isInvalid per evidenziare il campo in rosso se non è valido
                required
              />
              <Form.Control.Feedback type="invalid">
                Il Cognome deve contenere almeno 3 caratteri di cui il primo
                MAIUSCOLO
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label className="label">Username</Form.Label>
              <Form.Control
                type="text"
                ref={userRef}
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={!isUsernameValid} // Aggiungi il flag isInvalid per evidenziare il campo in rosso se non è valido
                required
              />
              <Form.Control.Feedback type="invalid">
                L'username deve contenere almeno 4 caratteri.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label className="label">email</Form.Label>
              <Form.Control
                type="email"
                ref={userRef}
                placeholder="Inserisci la tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!isEmailValid} // Aggiungi il flag isInvalid per evidenziare il campo in rosso se non è valido
                required
              />
              <Form.Control.Feedback type="invalid">
                L'email dovrebbe rispettare i criteri, es:(mario.rossi@live.it).
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className="label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!isPasswordValid} // Aggiungi il flag isInvalid per evidenziare il campo in rosso se non è valido
                required
              />
              <Form.Control.Feedback type="invalid">
                La password deve contenere almeno 5 caratteri di cui 1
                MAIUSCOLO, 1 minuscolo, almeno 1 cifra (0-9).
              </Form.Control.Feedback>
            </Form.Group>

            <div className="form-feedback">
              {!isFormValid && (
                <p className="error-message">
                  Completa tutti i campi correttamente per procedere con la
                  registrazione.
                </p>
              )}
            </div>

            <Button variant="white" type="submit" disabled={!isFormValid}>
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
