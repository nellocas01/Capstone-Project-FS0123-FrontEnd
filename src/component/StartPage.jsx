import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <Container fluid className="start-cnt">
      <Row className="mt-5 mx-5">
        <Col md={5} className="text-start">
          <h1 className="m-5">StonksBall la partita perfetta per te!</h1>
          <h3 className="my-5">
            Hai già un account? <Link to="/login">Accedi qui!</Link>
          </h3>
          <h3 className="my-5">
            Sei un nuovo utente? <Link to="/register">Registrati!</Link>
          </h3>
        </Col>
        <Col md={7}>
          <Image className="img-start" />
        </Col>
      </Row>
    </Container>
  );
};

export default StartPage;
