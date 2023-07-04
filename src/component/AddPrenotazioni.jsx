import { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddPrenotazioneForm = () => {
  const navigator = useNavigate();

  const [token, setToken] = useState();

  const [prenotazione, setPrenotazione] = useState({
    data: "",
  });

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const addPrenotazione = async (e) => {
    e.preventDefault();
    //setError("");
    try {
      const response = await fetch(`http://localhost:3001/prenotazioni`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(prenotazione),
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
      <Col sm={12} className="text-center mb-3">
        <h1>Aggiungi Prenotazione</h1>
      </Col>
      <Col sm={12} style={{ background: "#161B22" }}>
        <div>
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
              onClick={addPrenotazione}
            >
              Aggiungi Prenotazione
            </Button>
          </Form>
          <Button
            variant="success"
            className="w-100 mb-3"
            onClick={() => navigator("/home")}
          >
            Torna alla home
          </Button>
        </div>
      </Col>
    </>
  );
};
export default AddPrenotazioneForm;
