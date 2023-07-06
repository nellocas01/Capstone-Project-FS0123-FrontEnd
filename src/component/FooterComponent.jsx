import { Col, Container, Row } from "react-bootstrap";
import {
  ArrowRightCircle,
  Facebook,
  Instagram,
  Twitter,
} from "react-bootstrap-icons";
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
                href="https://www.facebook.com/"
                target="blank"
                className="mx-5"
              >
                <Facebook />
              </a>
              <a
                href="https://www.instagram.com/"
                target="blank"
                className="mx-5"
              >
                <Instagram />
              </a>
              <a
                href="https://twitter.com/i/flow/login?redirect_after_login=%2F%3Flang%3Dit"
                target="blank"
                className="mx-5"
              >
                <Twitter />
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
