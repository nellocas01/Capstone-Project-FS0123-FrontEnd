import { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContext,
  Alert,
  Card,
  Container,
  Image,
  ListGroup,
  ListGroupItem,
  Spinner,
  useAccordionButton,
} from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import campoSingolo from "../assets/img/campoSingolo.jpeg";
import { InfoCircle, Link } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

const Campi = () => {
  const [token, setToken] = useState();
  const [utente, setUtente] = useState({});
  const [campi, setCampi] = useState([]);
  const [loading, setLoading] = useState(true);
  //modale prenotazioone
  const [fullscreen, setFullscreen] = useState(false);
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState("16:00");
  //funzione modale prenotazione
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    setUtente(localStorage.getItem("utenteLoggato"));
    fetchListaCampi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchListaCampi = async (pagina) => {
    if (token) {
      try {
        const response = await fetch(`http://localhost:3001/campi`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          //console.log(userData);
          setCampi(userData.content);
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

  const PINK = "rgba(255, 192, 203, 0.6)";
  const BLUE = "rgba(0, 0, 255, 0.6)";

  function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
      <button
        type="button"
        style={{ backgroundColor: isCurrentEventKey ? PINK : BLUE }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <>
      {/* NAVBAR */}
      <NavbarComponent />

      {/* CAMPI PAGE */}

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
          <Container>
            {campi.map((campo, index) => (
              <Card className="campi-card-group" style={{ width: "30rem" }}>
                <Card.Img src={campoSingolo} alt="campiImg" className="mx-5" />
                <Card.Body>
                  <Card.Title key={index}>{campo.nome}</Card.Title>
                  <Card.Text>{campo.indirizzo}</Card.Text>
                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Card.Header>
                        <ContextAwareToggle eventKey="info">
                          <InfoCircle />
                        </ContextAwareToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="info">
                        <Card.Body>
                          Il {campo.nome}, situato in {campo.indirizzo}, è un
                          campetto di calcio a 5, dove per giocare è necessario
                          formare 2 squadre da 5 per un totale di 10 persone. La
                          struttura è aperta dalle ore 16 alle 24, la durata
                          della partita è di 1 ora. Sono disponibili in
                          struttura anche spogliatoi muniti di docce e
                          asciugacapelli.
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Card.Header>
                        <ContextAwareToggle eventKey="prenotazione">
                          Prenotazione
                        </ContextAwareToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="prenotazione">
                        <Card.Body>
                          Non lasciarti perdere questo campo e
                          <a href="/add-prenotazioni"> Prenotalo qui!</a>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </Card.Body>
              </Card>
            ))}
          </Container>
        </>
      )}
    </>
  );
};

export default Campi;
