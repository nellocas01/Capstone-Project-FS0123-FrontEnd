import { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { format, parse } from "date-fns";

const AddPrenotazioneForm = () => {
  const navigator = useNavigate();

  const [token, setToken] = useState();

  const [prenotazione, setPrenotazione] = useState({
    data: "",
  });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const addPrenotazione = async (e) => {
    e.preventDefault();
    const formStato = document.querySelector('[name="formStato"]');
    const selectedOption = formStato.options[formStato.selectedIndex];
    const statoValue = selectedOption.value;
    // Formatta la data nel formato desiderato (es. "dd-MM-yyyy")
    const formattedDate = format(startDate, "dd-MM-yyyy");

    // Parse dell'ora nel formato desiderato (es. "HH:mm")
    const parsedTime = parse(startTime, "HH:mm", new Date());

    // Combina la data formattata e l'ora parsata
    const dataPrenotazione = `${formattedDate} ${format(parsedTime, "HH:mm")}`;

    const nuovaPrenotazione = {
      ...prenotazione,
      data: dataPrenotazione,
      stato: statoValue,
    };
    //setError("");
    try {
      const response = await fetch(`http://localhost:3001/prenotazioni`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(nuovaPrenotazione),
      });
      if (response.ok) {
        const risposta = await response.json();
        console.log(risposta);
        navigator("/prenotazioni");
      } else {
        //setError("Credenziali errate. Riprova.");
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
      //setError("Si è verificato un errore. Riprova più tardi.");
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <NavbarComponent />

      {/* PRENOTAZIONE CAMPO */}
      <Container className="mt-5">
        <h1>Prenota il campo che hai scelto:</h1>
        <Button className="m-2" onClick={() => handleShow()}>
          Prenotalo qui!
        </Button>
        <Modal
          show={show}
          fullscreen={fullscreen}
          onHide={() => setShow(false)}
        >
          <Container>
            <Modal.Header closeButton>
              <Modal.Title>Per prenotare:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="datePicker">
                Quando volete giocare?
                <DatePicker
                  selected={startDate} // La data selezionata
                  onChange={(date) => setStartDate(date)} // Funzione per gestire il cambio di data
                  format="dd-mm-yyyy"
                />
              </div>
              <div className="timePicker">
                A che ora?
                <TimePicker
                  value={startTime}
                  onChange={(time) => setStartTime(time)}
                  format="HH:mm"
                />
              </div>
              <Form.Select
                name="formStato"
                aria-label="Default select example"
                className="my-4 ms-2"
              >
                <option value="">Conferma prenotazione</option>
                <option value="CONFERMATA">CONFERMATA</option>
              </Form.Select>
              <Button
                variant="primary"
                className="w-100 mb-3"
                type="button"
                onClick={(e) => addPrenotazione(e)}
              >
                Aggiungi Prenotazione
              </Button>
            </Modal.Body>
          </Container>
        </Modal>

        <Button
          variant="success"
          className="w-100 mb-3"
          onClick={() => navigator("/campi")}
        >
          Torna ai campi
        </Button>
      </Container>
    </>
  );
};
export default AddPrenotazioneForm;
