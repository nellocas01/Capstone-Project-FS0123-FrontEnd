import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditPrenotazione = (props) => {
  const [prenotazione, setPrenotazione] = useState({
    data: "",
  });

  useEffect(() => {
    setPrenotazione({
      data: props.prenotazione.data,
    });
    console.log(props.prenotazione);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const editPrenotazione = async (e) => {
    e.preventDefault();
    //setError("");
    try {
      const response = await fetch(
        `http://localhost:3001/prenotazioni/${props.prenotazione.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token,
          },
          body: JSON.stringify(prenotazione),
        }
      );
      if (response.ok) {
        const risposta = await response.json();
        console.log(risposta);
        props.onHide();
        props.reset();
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

  // useEffect(() => {
  //   console.log("props");
  //   console.log(prenotazione);
  // }, [prenotazione]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Prenotazione
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="my-3" controlId="data">
            <Form.Label>Data prenotazione</Form.Label>
            <Form.Control
              type="text"
              required
              value={prenotazione.data}
              onChange={(e) =>
                setPrenotazione({ ...prenotazione, data: e.target.value })
              }
              style={{ background: "#010409", color: "#fff" }}
            />
          </Form.Group>
          <Button
            variant="primary"
            className="w-100 mb-3"
            type="button"
            onClick={editPrenotazione}
          >
            Edit Prenotazione
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default EditPrenotazione;
