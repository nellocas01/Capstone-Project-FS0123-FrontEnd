import { Col, Container, Row } from "react-bootstrap";
import { ArrowRightCircle, Github, Linkedin } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <>
      <footer>
        <Container className="my-5" fluid>
          <Row className="d-flex align-items-center">
            <Col md={6}>
              <h2>
                seguici sui nostri canali social <ArrowRightCircle />
              </h2>
            </Col>
            <Col md={6}>
              <a
                href="https://github.com/nellocas01"
                target="blank"
                className="mx-5"
              >
                <Github />
              </a>
              <a
                href="https://www.linkedin.com/in/casolla-aniello/"
                target="blank"
                className="mx-5"
              >
                <Linkedin />
              </a>
            </Col>
          </Row>
          <hr />
          <Row>
            <Link>Scopri come funziona</Link>
            <Link>Suggerimenti</Link>
            <Link>FAQ</Link>
            <Link>Privacy Policy</Link>
            <Link>Contatti</Link>
          </Row>
          <hr />
          <Row>
            <Link className="d-flex justify-content-center">
              The Stonks Studios
            </Link>
            <Link className="d-flex justify-content-center">
              Via Centro Direzionale B8
            </Link>
            <Link className="d-flex justify-content-center">
              Napoli - Italia
            </Link>
            <Link className="d-flex justify-content-center">
              nellocasolla446@gmail.com
            </Link>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default FooterComponent;
