import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
} from "react-bootstrap";
import EditPrenotazioni from "./EditPrenotazioni";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import { CheckCircleFill, PencilSquare } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Prenotazioni = () => {
  const [confermate, setPrenotazioniConfermate] = useState([]);
  const [inAttesa, setPrenotazioniInAttesa] = useState([]);
  const [prenotazione, setPrenotazione] = useState({
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

  const [setAddModal] = useState(false);

  const [userDetails, setUserDetails] = useState();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  const openModal = () => {
    setAddModal(true);
  };

  const closeModal = () => {
    setAddModal(false);
  };

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    setUserId(localStorage.getItem("utenteLoggato"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchUser = async () => {
    if (token) {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        if (response.ok) {
          //console.log(response);
          const user = await response.json();
          //console.log(user);
          setUserDetails(user);
        } else {
          const errorData = await response.json();
          console.log(errorData);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    setUserId(localStorage.getItem("utenteLoggato"));
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
        setPrenotazione({ ...prenotazioni, stato: risposta.stato });
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          setPrenotazione(userData.content);
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
          const prenotazioni = userData.content;

          const confermate = prenotazioni.filter(
            (prenotazione) => prenotazione.stato === "CONFERMATA"
          );

          const inAttesa = prenotazioni.filter(
            (prenotazione) => prenotazione.stato !== "CONFERMATA"
          );

          setPrenotazioniConfermate(confermate);
          setPrenotazioniInAttesa(inAttesa);
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
            {confermate.length === 0 && inAttesa.length === 0 && (
              <Alert variant="danger" className="my-3">
                Nessun risultato trovato.
              </Alert>
            )}
            <Row>
              <Col>
                <h2>Confermate</h2>
                <ListGroup>
                  {confermate.map((prenotazione, index) => (
                    <ListGroupItem
                      key={index}
                      className="prenotazioni-list-item"
                    >
                      <h4>
                        Prenotazione {prenotazione.stato}
                        <CheckCircleFill
                          color="green"
                          className="d-flex mt-2"
                        />
                      </h4>

                      <h5>per utente {userDetails?.username} </h5>
                      <h6>il giorno: {prenotazione.data}</h6>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Col>
              <Col>
                <h2>In Attesa</h2>
                <ListGroup>
                  {inAttesa.map((prenotazione, index) => (
                    <ListGroupItem
                      key={index}
                      className="prenotazioni-list-item"
                    >
                      <h4 className="me-auto">
                        Prenotazione {prenotazione.stato}
                      </h4>
                      <h5>per utente {userDetails?.surname}</h5>
                      <h6>il giorno: {prenotazione.data}</h6>
                      <div className="btn-attesa">
                        {userDetails?.authorities[0].authority === "ADMIN" && (
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
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Col>
            </Row>

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
            <Link to="/add-prenotazioni" className="my-5">
              Prenota un campo
            </Link>
          </>
        )}
        {/* FOOTER */}
        <FooterComponent />
      </Container>
      {showModal && (
        <EditPrenotazioni
          show={showModal}
          onHide={() => setShowModal(false)}
          prenotazione={selectedPrenotazione}
          token={token}
        />
      )}
    </>
  );
};

export default Prenotazioni;
