import { Col, Container, Row } from "react-bootstrap";
import { Facebook, Instagram, Twitter, Xbox } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <>
      <footer>
        <Container fluid>
          <Row>
            <Col>
              <h2>
                StonksBall <Xbox />
              </h2>
            </Col>
            <Col>
              <a href="https://www.facebook.com/" target="blank">
                <Facebook />
              </a>
              <a href="https://www.instagram.com/" target="blank">
                <Instagram />
              </a>
              <a
                href="https://twitter.com/i/flow/login?redirect_after_login=%2F%3Flang%3Dit"
                target="blank"
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
            <Link>The Stonks Studios</Link>
            <Link>Via Centro Direzionale B8</Link>
            <Link>Napoli - Italia</Link>
            <Link>nellocasolla446@gmail.com</Link>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default FooterComponent;
