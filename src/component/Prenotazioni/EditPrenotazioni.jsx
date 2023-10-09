import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { format, parse } from "date-fns";

const EditPrenotazione = (props) => {
  const [token, setToken] = useState();
  const [prenotazione, setPrenotazione] = useState({
    data: "",
  });
  const [editData, setEditData] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editStato, setEditStato] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const editPrenotazione = async (e) => {
    e.preventDefault();
    // Format the editData and editTime values
    const formattedDateTime = `${format(editData, "dd-MM-yyyy")} ${editTime}`;

    const prenotazioneModificata = {
      data: formattedDateTime,
      stato: editStato,
    };

    try {
      const response = await fetch(
        `http://localhost:3001/prenotazioni/${props.prenotazione.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(prenotazioneModificata),
        }
      );
      if (response.ok) {
        const risposta = await response.json();
        //console.log(risposta);
        // Chiama la funzione updatePrenotazione con l'ID della prenotazione, la nuova data e lo stato confermato
        props.updatePrenotazione(
          props.prenotazione.id,
          formattedDateTime,
          "CONFERMATA"
        );
        props.onHide();
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modifica Prenotazione
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="my-3" controlId="data">
            <Form.Label>Hai una prenotazione per il:</Form.Label>
            <Form.Control
              readOnly
              type="text"
              required
              value={props.prenotazione.data}
              onChange={(e) => setEditData(e.target.value)}
            />
          </Form.Group>
          <div className="datePicker">
            Quando volete giocare?
            <DatePicker
              selected={editData}
              onChange={(date) => setEditData(date)} // Aggiorna lo stato di editData
              format="dd-mm-yyyy"
            />
          </div>
          <div className="timePicker">
            A che ora?
            <TimePicker
              value={editTime}
              onChange={(time) => setEditTime(time)} // Aggiorna lo stato di editTime
              format="HH:mm"
            />
          </div>
          <Form.Select
            name="formStato"
            aria-label="Default select example"
            className="my-4 ms-2"
            value={editStato}
            onChange={(e) => setEditStato(e.target.value)}
          >
            <option value="">Conferma prenotazione</option>
            <option value="CONFERMATA">CONFERMATA</option>
          </Form.Select>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="w-100 mb-3"
          type="button"
          onClick={editPrenotazione}
        >
          Edit Prenotazione
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default EditPrenotazione;
