import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <Container fluid>
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
      <video
        src="../assets/img/video.mp4"
        className="z-depth-1"
        autoPlay
        loop
        controls
        muted
      ></video>
    </Container>
  );
};

export default StartPage;
