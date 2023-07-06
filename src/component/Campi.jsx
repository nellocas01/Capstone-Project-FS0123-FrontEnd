import { useEffect, useState } from "react";
import {
  Accordion,
  Alert,
  Button,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditCampi from "./EditCampi";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

const Campi = () => {
  const [token, setToken] = useState();
  //const [utente, setUtente] = useState({});
  const [campi, setCampi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [url, setUrl] = useState("");
  const [selectedCampo, setSelectedCampo] = useState("");
  const [nomeSearch, setNomeSearch] = useState("");
  const [indirizzoSearch, setIndirizzoSearch] = useState("");
  //   const [fatturatoAnnualeSearch, setFatturatoAnnualeSearch] = useState("");
  //   const [dataUltimoContattoSearch, setDataUltimoContattoSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    //setUtente(JSON.parse(localStorage.getItem("utenteLoggato")));
    fetchListaCampi(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    console.log(campi);
  }, [campi]);

  const componiUrl = () => {
    let url = "";
    if (nomeSearch !== "") {
      url += `nome=${nomeSearch}&`;
    }
    if (indirizzoSearch !== "") {
      url += `indirizzo=${indirizzoSearch}&`;
    }
    // if (fatturatoAnnualeSearch !== "") {
    //   url += `fatturatoAnnuale=${fatturatoAnnualeSearch}&`;
    // }
    // if (dataUltimoContattoSearch !== "") {
    //   url += `dataUltimoContatto=${dataUltimoContattoSearch}&`;
    // }
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
    setNomeSearch("");
    setIndirizzoSearch("");
    // setFatturatoAnnualeSearch("");
    // setDataUltimoContattoSearch("");
  };

  const goToPage = (pagina) => {
    setCurrentPage(pagina);
    setLoading(true);
    if (url.length > 0) {
      fetchSearch(url, pagina);
    } else {
      fetchListaCampi(pagina);
    }
  };

  const reset = () => {
    setUrl("");
    setCurrentPage(0);
    fetchListaCampi(currentPage);
  };

  const fetchSearch = async (url, pagina) => {
    if (token) {
      console.log(
        `http://localhost:3001/campi?${
          pagina !== undefined ? "page=" + pagina + "&" + url : url
        }`
      );

      try {
        const response = await fetch(
          `http://localhost:3001/campi?${
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
          setCampi(userData.content);
        } else {
          const errorData = await response.json();
          console.log("errore durante la richiesta", errorData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchListaCampi = async (pagina) => {
    if (token) {
      try {
        const response = await fetch(
          `http://localhost:3001/campi?page=${pagina}`,
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
          setCampi(userData.content);
          setTotalPages(userData.totalPages);
        } else {
          //console.log("Errore durante la richiesta dei campi");
          const errorData = await response.json();
          console.log(errorData);
        }
      } catch (error) {
        console.log("Errore durante la richiesta dei campi:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const deleteCampi = async (campo) => {
    if (token) {
      try {
        const response = await fetch(
          `http://localhost:3001/campi/${campo.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.ok) {
          // if (response.status === 200) {
          // const userData = await response.json();
          // console.log(userData);
          reset();
        } else {
          const errorData = await response.json();
          console.log("Errore durante la cancellazione del campo", errorData);
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

      {/* CAMPI PAGE */}
      <Container>
        <h1 className="d-flex justify-content-center m-5">Campi disponibili</h1>
        <Accordion className="mb-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Filtra Ricerca</Accordion.Header>
            <Accordion.Body className="bg-success text-white">
              <Form>
                <Form.Group className="my-3" controlId="nomeSearch">
                  <Form.Label>Nome del campo</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={nomeSearch}
                    onChange={(e) => setNomeSearch(e.target.value)}
                    // style={{ background: "#010409", color: "#fff" }}
                  />
                </Form.Group>
                <Form.Group className="my-3" controlId="indirizzoSearch">
                  <Form.Label>Indirizzo del campo</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={indirizzoSearch}
                    onChange={(e) => setIndirizzoSearch(e.target.value)}
                    //style={{ background: "#010409", color: "#fff" }}
                  />
                </Form.Group>
                {/* <Form.Group className="my-3" controlId="fatturatoAnnualeSearch">
                  <Form.Label>Fatturato Annuale</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={fatturatoAnnualeSearch}
                    onChange={(e) => setFatturatoAnnualeSearch(e.target.value)}
                    style={{ background: "#010409", color: "#fff" }}
                  />
                </Form.Group>
                <Form.Group
                  className="my-3"
                  controlId="dataUltimoContattoSearch"
                >
                  <Form.Label>Data Ultimo Contatto</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={dataUltimoContattoSearch}
                    onChange={(e) =>
                      setDataUltimoContattoSearch(e.target.value)
                    }
                    style={{ background: "#010409", color: "#fff" }}
                  />
                </Form.Group> */}
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
            {campi.length === 0 && (
              <Alert variant="danger" className="my-3">
                Nessun risultato trovato.
              </Alert>
            )}
            {/* <h2 className="d-flex justify-content-center m-5">Lista Campi</h2>
            <Button
              variant="primary"
              className="w-100 mb-3"
              type="button"
              onClick={reset}
            >
              Reset
            </Button> */}
            <ListGroup>
              {campi.map((campo, index) => (
                <ListGroupItem
                  key={index}
                  className="m-3 p-2 d-flex text-success"
                >
                  {campo.nome} - {campo.indirizzo}
                  {/* {utente.ruolo === "ADMIN" && ( */}
                  <>
                    <Button
                      variant="warning"
                      className="text-light mx-5 d-flex justify-content-end"
                      onClick={() => {
                        setShowModal(true);
                        setSelectedCampo(campo);
                      }}
                    >
                      Modifica
                    </Button>

                    <Button variant="danger" onClick={() => deleteCampi(campo)}>
                      X
                    </Button>
                  </>
                  {/* )} */}
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

            {/* {utente.ruolo === "ADMIN" && ( */}
            <Button
              variant="primary"
              className="my-5"
              onClick={() => navigator("/add-campo")}
            >
              Aggiungi Campo
            </Button>
            {/* )} */}
          </>
        )}

        {/* FOOTER */}
        <FooterComponent />
      </Container>
      {showModal && (
        <EditCampi
          show={showModal}
          reset={() => reset()}
          onHide={() => setShowModal(false)}
          campo={selectedCampo}
          token={token}
        />
      )}
    </>
  );
};

export default Campi;
