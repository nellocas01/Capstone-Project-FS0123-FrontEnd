import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  Spinner,
} from "react-bootstrap";
import EditPrenotazioni from "./EditPrenotazioni";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import { CheckCircleFill, PencilSquare } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

const Prenotazioni = () => {
  const [token, setToken] = useState();
  const [prenotazioni, setPrenotazioni] = useState({
    data: "",
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [url, setUrl] = useState("");
  const [selectedPrenotazione, setSelectedPrenotazione] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState("16:00");

  const [showModal, setShowModal] = useState(false);

  const [AddModal, setAddModal] = useState(false);

  const openModal = () => {
    setAddModal(true);
  };

  const closeModal = () => {
    setAddModal(false);
  };

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    fetchListaPrenotazioni(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleSave = async (e) => {
    const prenotazioni = {
      data: startDate,
      orario: startTime,
    };
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/prenotazioni`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(prenotazioni),
      });
      if (response.ok) {
        const risposta = await response.json();
        console.log(risposta);
        setPrenotazioni({ ...prenotazioni, stato: risposta.stato });
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(prenotazioni);
  }, [prenotazioni]);

  useEffect(() => {
    if (url !== "") {
      fetchSearch(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const goToPage = (pagina) => {
    setCurrentPage(pagina);
    setLoading(true);
    if (url.length > 0) {
      fetchSearch(url, pagina);
    } else {
      fetchListaPrenotazioni(pagina);
    }
  };

  const reset = () => {
    setUrl("");
    setCurrentPage(0);
    fetchListaPrenotazioni(currentPage);
  };

  const fetchSearch = async (url, pagina) => {
    if (token) {
      console.log(
        `http://localhost:3001/prenotazioni?${
          pagina !== undefined ? "page=" + pagina + "&" + url : url
        }`
      );

      try {
        const response = await fetch(
          `http://localhost:3001/prenotazioni?${
            pagina !== undefined ? "page=" + pagina + "&" + url : url
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          //console.log(userData);
          setPrenotazioni(userData.content);
        } else {
          const errorData = await response.json();
          console.log(errorData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchListaPrenotazioni = async (pagina) => {
    if (token) {
      try {
        const response = await fetch(
          `http://localhost:3001/prenotazioni?page=${pagina}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          setPrenotazioni(userData.content);
          setTotalPages(userData.totalPages);
        } else {
          const errorData = await response.json();
          console.log(errorData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const deletePrenotazioni = async (prenotazione) => {
    if (token) {
      try {
        const response = await fetch(
          `http://localhost:3001/prenotazioni/${prenotazione.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.ok) {
          reset();
        } else {
          const errorData = await response.json();
          console.log(errorData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      {/* NAVBAR */}
      <NavbarComponent />

      {/* PRENOTAZIONI PAGE */}
      <Container>
        <h1 className="d-flex justify-content-center m-5">Prenotazioni</h1>

        {loading ? (
          <Spinner animation="grow" size="sm" className="me-2" />
        ) : (
          <>
            {prenotazioni.length === 0 && (
              <Alert variant="danger" className="my-3">
                Nessun risultato trovato.
              </Alert>
            )}
            <ListGroup>
              {prenotazioni.map((prenotazione, index) => (
                <ListGroupItem key={index} className="prenotazioni-list-item">
                  <p className="me-auto">
                    Prenotazione {prenotazione.stato} per utente x
                    {prenotazione.stato === "CONFERMATA" && (
                      <CheckCircleFill className="ms-auto" color="green" />
                    )}
                    {/* confermata = stato.confermata o stato.in attesa - utente = user */}
                  </p>
                  {prenotazione.data}
                  {prenotazione.stato !== "CONFERMATA" && (
                    <>
                      <Button
                        variant="warning"
                        className="text-light mx-5 d-flex justify-content-end"
                        onClick={() => {
                          setShowModal(true);
                          setSelectedPrenotazione(prenotazione);
                        }}
                      >
                        <PencilSquare />
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => deletePrenotazioni(prenotazione)}
                      >
                        X
                      </Button>
                    </>
                  )}
                </ListGroupItem>
              ))}
            </ListGroup>

            {currentPage > 0 && (
              <Button
                variant="primary"
                className="w-100 mb-3"
                onClick={() => goToPage(currentPage - 1)}
              >
                Pagina precedente
              </Button>
            )}
            {currentPage < totalPages - 1 && (
              <Button
                variant="primary"
                className="w-100 mb-3"
                onClick={() => goToPage(currentPage + 1)}
              >
                Pagina successiva
              </Button>
            )}

            {/* <Button
              variant="primary"
              className="my-5"
              onClick={() => navigator("/add-prenotazioni")}
            >
              Aggiungi Prenotazione
            </Button> */}
            <Button variant="primary" className="my-5" onClick={openModal}>
              Aggiungi Prenotazione
            </Button>

            {/* Definisci il modale */}
            <Modal show={AddModal} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Prenota il tuo campo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <DatePicker
                  selected={startDate} // La data selezionata
                  onChange={(date) => setStartDate(date)} // Funzione per gestire il cambio di data
                />
                <TimePicker
                  value={startTime}
                  onChange={(time) => setStartTime(time)}
                  format="HH:mm"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Chiudi
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Salva
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
        {/* FOOTER */}
        <FooterComponent />
      </Container>
      {showModal && (
        <EditPrenotazioni
          show={showModal}
          reset={() => reset()}
          onHide={() => setShowModal(false)}
          prenotazione={selectedPrenotazione}
          token={token}
        />
      )}
    </>
  );
};

export default Prenotazioni;
