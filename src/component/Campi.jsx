import { useEffect, useState } from "react";
import {
  Alert,
  Container,
  Image,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import campiImg from "../assets/img/campiImg.jpg";

const Campi = () => {
  const [token, setToken] = useState();
  const [utente, setUtente] = useState({});
  const [campi, setCampi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [url, setUrl] = useState("");
  //const [selectedCampo, setSelectedCampo] = useState("");
  const [nomeSearch, setNomeSearch] = useState("");
  const [indirizzoSearch, setIndirizzoSearch] = useState("");

  //const [showModal, setShowModal] = useState(false);

  //const navigator = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    setUtente(localStorage.getItem("utenteLoggato"));
    fetchListaCampi(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    console.log(campi);
  }, [campi]);

  // const componiUrl = () => {
  //   let url = "";
  //   if (nomeSearch !== "") {
  //     url += `nome=${nomeSearch}&`;
  //   }
  //   if (indirizzoSearch !== "") {
  //     url += `indirizzo=${indirizzoSearch}&`;
  //   }
  //   url = url.slice(0, -1);
  //   setUrl(url);
  // };

  useEffect(() => {
    if (url !== "") {
      fetchSearch(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  // const handelSubmit = () => {
  //   componiUrl();
  //   setNomeSearch("");
  //   setIndirizzoSearch("");
  // };

  // const goToPage = (pagina) => {
  //   setCurrentPage(pagina);
  //   setLoading(true);
  //   if (url.length > 0) {
  //     fetchSearch(url, pagina);
  //   } else {
  //     fetchListaCampi(pagina);
  //   }
  // };

  // const reset = () => {
  //   setUrl("");
  //   setCurrentPage(0);
  //   fetchListaCampi(currentPage);
  // };

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
  // const deleteCampi = async (campo) => {
  //   if (token) {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3001/campi/${campo.id}`,
  //         {
  //           method: "DELETE",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + token,
  //           },
  //         }
  //       );
  //       if (response.ok) {
  //         reset();
  //       } else {
  //         const errorData = await response.json();
  //         console.log("Errore durante la cancellazione del campo", errorData);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };
  return (
    <>
      {/* NAVBAR */}
      <NavbarComponent />

      {/* CAMPI PAGE */}
      <Container>
        <h1 className="d-flex justify-content-center m-5">I nostri Campi</h1>

        {loading ? (
          <Spinner animation="grow" size="sm" className="me-2" />
        ) : (
          <>
            {campi.length === 0 && (
              <Alert variant="danger" className="my-3">
                Nessun risultato trovato.
              </Alert>
            )}
            <ListGroup className="campi-list-group">
              {campi.map((campo, index) => (
                <ListGroupItem key={index} className="campi-list-item">
                  {campo.nome} - {campo.indirizzo}
                  <Image
                    src={campiImg}
                    width={200}
                    alt="campiImg"
                    className="mx-5"
                  />
                  {/* {utente.ruolo === "ADMIN" && (
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

                      <Button
                        variant="danger"
                        onClick={() => deleteCampi(campo)}
                      >
                        X
                      </Button>
                    </>
                  )} */}
                </ListGroupItem>
              ))}
            </ListGroup>

            {/* {currentPage > 0 && (
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

            {utente.ruolo === "ADMIN" && (
              <Button
                variant="primary"
                className="my-5"
                onClick={() => navigator("/add-campo")}
              >
                Aggiungi Campo
              </Button>
            )} */}
          </>
        )}

        {/* FOOTER */}
        <FooterComponent />
      </Container>
      {/* {showModal && (
        <EditCampi
          show={showModal}
          reset={() => reset()}
          onHide={() => setShowModal(false)}
          campo={selectedCampo}
          token={token}
        />
      )} */}
    </>
  );
};

export default Campi;
