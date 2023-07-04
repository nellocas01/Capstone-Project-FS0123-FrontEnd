import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditCampi = (props) => {
  const [campo, setCampo] = useState({
    nome: "",
    indirizzo: "",
    //prenotazione: "",
  });

  useEffect(() => {
    setCampo({
      nome: props.campo.nome,
      indirizzo: props.campo.indirizzo,
      //prenotazione: props.campo.prenotazione,
    });
  }, [props]);

  const editCampo = async (e) => {
    e.preventDefault();
    //setError("");
    try {
      const response = await fetch(
        `http://localhost:3001/campi/${props.campo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token,
          },
          body: JSON.stringify(campo),
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

  //   useEffect(() => {
  //     console.log("props");
  //     console.log(campo);
  //   }, [campo]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Campo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="my-3" controlId="nome">
            <Form.Label>Nome del campo</Form.Label>
            <Form.Control
              type="text"
              required
              value={campo.nome}
              onChange={(e) => setCampo({ ...campo, nome: e.target.value })}
              style={{ background: "#010409", color: "#fff" }}
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="indirizzo">
            <Form.Label>Indirizzo del campo</Form.Label>
            <Form.Control
              type="text"
              required
              value={campo.indirizzo}
              onChange={(e) =>
                setCampo({ ...campo, indirizzo: e.target.value })
              }
              style={{ background: "#010409", color: "#fff" }}
            />
          </Form.Group>
          {/* <Form.Group className="my-3" controlId="prenotazione">
            <Form.Label>Prenotazione</Form.Label>
            <Form.Control
              type="text"
              required
              value={campo.prenotazione}
              onChange={(e) =>
                setCampo({ ...campo, prenotazione: e.target.value })
              }
              style={{ background: "#010409", color: "#fff" }}
            />
          </Form.Group> */}
          <Button
            variant="primary"
            className="w-100 mb-3"
            type="button"
            onClick={editCampo}
          >
            Edit Campo
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default EditCampi;
