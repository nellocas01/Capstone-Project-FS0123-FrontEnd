import React, { useEffect, useState } from "react";
import { Accordion, Alert, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditPrenotazioni from "./EditPrenotazioni";

const Prenotazioni = () => {
  const [token, setToken] = useState();
  // const [utente, setUtente] = useState({});
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [url, setUrl] = useState("");
  const [selectedPrenotazione, setSelectedPrenotazione] = useState("");
  const [dataSearch, setDataSearch] = useState("");
  //   const [dataInserimentoSearch, setDataInserimentoSearch] = useState("");campo
  //   const [fatturatoAnnualeSearch, setFatturatoAnnualeSearch] = useState("");utente

  const [showModal, setShowModal] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    //setUtente(JSON.parse(localStorage.getItem("utente loggato")));
    fetchListaPrenotazioni(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    console.log(prenotazioni);
  }, [prenotazioni]);

  const componiUrl = () => {
    let url = "";
    if (dataSearch !== "") {
      url += `data=${dataSearch}&`;
    }
    url = url.slice(0, -1);
    setUrl(url);
  };

  useEffect(() => {
    if (url !== "") {
      fetchSearch(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const handelSubmit = () => {
    componiUrl();
    setDataSearch("");
  };

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
          //console.log(userData);
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
          // const userData = await response.json();
          // console.log(userData);
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
      <div>
        <h1>Prenotazioni</h1>
        <Accordion className="mb-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Filtra Ricerca</Accordion.Header>
            <Accordion.Body className="bg-black text-white">
              <Form>
                <Form.Group className="my-3" controlId="dataSearch">
                  <Form.Label>Data</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={dataSearch}
                    onChange={(e) => setDataSearch(e.target.value)}
                    style={{ background: "#010409", color: "#fff" }}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  className="w-100 mb-3"
                  type="button"
                  onClick={handelSubmit}
                >
                  Cerca
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {loading ? (
          <Spinner animation="grow" size="sm" className="me-2" />
        ) : (
          <>
            {prenotazioni.length === 0 && (
              <Alert variant="danger" className="my-3">
                Nessun risultato trovato.
              </Alert>
            )}
            <h2>Lista Prenotazioni</h2>
            <Button
              variant="primary"
              className="w-100 mb-3"
              type="button"
              onClick={reset}
            >
              Reset
            </Button>
            <ul>
              {prenotazioni.map((prenotazione, index) => (
                <li key={index}>
                  {prenotazione.data}
                  <>
                    <Button
                      variant="warning"
                      className="text-light"
                      onClick={() => {
                        setShowModal(true);
                        setSelectedPrenotazione(prenotazione);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => deletePrenotazioni(prenotazione)}
                    >
                      X
                    </Button>
                  </>
                </li>
              ))}
            </ul>

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

            <Button
              variant="primary"
              className="w-100 mb-3"
              onClick={() => navigator("/add-prenotazioni")}
            >
              Aggiungi Prenotazione
            </Button>
          </>
        )}
        <Button
          variant="success"
          className="w-100 mb-3"
          onClick={() => navigator("/home")}
        >
          Torna alla home
        </Button>
      </div>
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
