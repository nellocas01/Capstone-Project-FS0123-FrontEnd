import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <Container className="start-container">
      <Row>
        <Col md={9}>
          <div className="img-start"></div>
        </Col>
        <Col md={3}>
          <div className="text-start">
            <h1>StonksBall trova la partita perfetta per te!</h1>
            <h3>
              Hai già un account? <Link to="/login">Accedi qui!</Link>
            </h3>
            <h3>
              Sei un nuovo utente? <Link to="/register">Registrati!</Link>
            </h3>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default StartPage;
