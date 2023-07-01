import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

const PARTITE_URL = "/campi";

const Dashboard = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matches, setMatches] = useState([]);

  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [errorMessage, setErrorMessage] = useState("");
  const [succes, setSucces] = useState(false);

  //   // Esempio di dati delle partite
  //   const matches = [
  //     {
  //       id: 1,
  //       date: "2023-07-10",
  //       time: "15:00",
  //       location: "Stadium A",
  //       details: "Informazioni aggiuntive sulla partita A",
  //     },
  //     {
  //       id: 2,
  //       date: "2023-07-12",
  //       time: "17:30",
  //       location: "Stadium B",
  //       details: "Informazioni aggiuntive sulla partita B",
  //     },
  //     // Aggiungi altre partite qui
  //   ];

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, []);

  const handleMatchSelection = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        PARTITE_URL,
        JSON.stringify({ matches }),
        {
          headers: { "Content-Type": "application/json" },
          method: "GET",
        }
      ); // Sostituisci con l'URL corretto per la richiesta GET delle partite
      console.log(JSON.stringify(response?.data));
      setMatches(response.data);
      setAuth({});
      setSelectedMatch("");
      setSucces(true);
    } catch (error) {
      setErrorMessage("Errore durante il recupero delle partite:", error);
      errRef.current.focus();
    }
  };

  return (
    <>
      {succes ? (
        <section className="access flex-column"></section>
      ) : (
        <Container>
          <p
            ref={errRef}
            className={errorMessage ? "errorMessage" : "offscreen"}
            aria-live="assertive"
          >
            {errorMessage}
          </p>
          <h1>Dashboard</h1>
          <h2>Elenco delle partite disponibili:</h2>
          <ListGroup>
            {matches.map((match) => (
              <ListGroup.Item
                key={match.id}
                onClick={() => handleMatchSelection(match)}
                active={selectedMatch && selectedMatch.id === match.id}
                action
              >
                {match.date} - {match.time} - {match.location}
              </ListGroup.Item>
            ))}
          </ListGroup>
          {selectedMatch && (
            <div>
              <h3>Dettagli partita selezionata:</h3>
              <p>{selectedMatch.details}</p>
            </div>
          )}
        </Container>
      )}
    </>
  );
};

export default Dashboard;
