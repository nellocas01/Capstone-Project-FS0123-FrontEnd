import Container from "react-bootstrap/Container";
import { Carousel, Col, Image, Row } from "react-bootstrap";
import phoneLogo from "../assets/img/phoneLogo.jpg";
import appStore from "../assets/img/appStore.png";
import googleStore from "../assets/img/googleStore.png";
import phoneFormazione from "../assets/img/phoneFormazione.jpg";
import phoneControllo from "../assets/img/phoneControllo.png";
import campiDue from "../assets/img/campiDue.jpg";
import campiImg from "../assets/img/campiImg.jpg";
import docceSpogliatoio from "../assets/img/docceSpogliatoio.jpeg";
import grandangoloCampo from "../assets/img/grandangoloCampo.jpg";
import spogliatoiEsterno1 from "../assets/img/spogliatoiEsterno1.jpeg";
import spogliatoiInterno from "../assets/img/spogliatoiInterno.jpg";
import parcheggioCampo from "../assets/img/parcheggioCampo.jpg";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import { Link } from "react-router-dom";
import { HandIndex } from "react-bootstrap-icons";

const HomePage = () => {
  return (
    <>
      {/* NAVBAR */}
      <NavbarComponent />

      {/* * HOME */}
      <Container>
        <Row className="my-5">
          <Col sm={7}>
            <Row>
              <h3>
                Organizza al meglio
                <br />
                le tue partite di calcio
              </h3>
              <p>
                StonksBall è un’app che permette di organizzare al meglio le
                partite di calcio con gli amici e non solo. <br />
                Crea o unisciti a Gruppi Partita per giocare e/o organizzare
                partite di calcio a 5 senza vincoli con le strutture sportive a
                disposizione e senza costi aggiuntivi. Puoi trovare questa
                sezione in{" "}
                <Link to="/campi" className="text-dark">
                  Campi Disponibili <HandIndex />
                </Link>
              </p>
              <Row className="justify-content-between">
                <Col>
                  <a href="https://www.apple.com/it/app-store/" target="blank">
                    <Image src={appStore} alt="app-store" width={100} />
                  </a>
                  <a
                    href="https://play.google.com/store/games?device=windows&hl=it"
                    target="blank"
                  >
                    <Image src={googleStore} alt="app-store" width={100} />
                  </a>
                </Col>
              </Row>
            </Row>
          </Col>
          <Col sm={4} className="d-sm-block offset-sm-1">
            <Row className="d-xs-block">
              <Image src={phoneLogo} alt="phone-logo" />
            </Row>
          </Col>
        </Row>
      </Container>

      {/* GALLERY  */}
      <Container className="my-5">
        <h2>GALLERY</h2>
        <h4>qualche scatto delle nostre strutture</h4>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              alt="First slide"
              src={campiDue}
              height={550}
            />
            <Carousel.Caption>
              <h3>I CAMPI</h3>
              <p>Nuovi campetti di calcio a 5</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              alt="First slide"
              src={campiImg}
              height={550}
            />
            <Carousel.Caption>
              <h3>I CAMPI</h3>
              <p>Nuovi campetti di calcio a 5</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              alt="First slide"
              src={grandangoloCampo}
              height={550}
            />
            <Carousel.Caption>
              <h3>I CAMPI</h3>
              <p>Nuovi campetti di calcio a 5</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              alt="First slide"
              src={spogliatoiEsterno1}
              height={550}
            />
            <Carousel.Caption>
              <h3>SPOGLIATOI</h3>
              <p>
                Nuovi Spogliatoi muniti di docce, prese elettriche e
                asciugacapelli
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              alt="First slide"
              src={spogliatoiInterno}
              height={550}
            />
            <Carousel.Caption>
              <h3>SPOGLIATOI</h3>
              <p>
                Nuovi Spogliatoi muniti di docce, prese elettriche e
                asciugacapelli
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              alt="First slide"
              src={docceSpogliatoio}
              height={550}
            />
            <Carousel.Caption>
              <h3>SPOGLIATOI</h3>
              <p>
                Nuovi Spogliatoi muniti di docce, prese elettriche e
                asciugacapelli
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              alt="First slide"
              src={parcheggioCampo}
              height={550}
            />
            <Carousel.Caption>
              <h3>PARCHEGGIO</h3>
              <p>Tutti i campi sono muniti di parcheggio gratuito!</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
      <Container>
        <h4 className="my-5">
          Risparmia tempo e organizza le tue partite in modo semplice e rapido.
        </h4>
        <Row className="my-3">
          <Col md={6}>
            <Image src={phoneFormazione} alt="phone-campo" width={300} />
          </Col>
          <Col md={6}>
            <h5>Amministra o iscriviti a Gruppi Partita.</h5>
            <p>
              StonksBall permette a tutti gli utenti di creare prenotazioni e
              confermare il campo scelto tra quelli disponibili. Ogni utente può
              sia giocare che amministrare, ma per eventuali cambiamenti basta
              contattare la struttura. Puoi trovare questa sezione in{" "}
              <Link to="/prenotazioni" className="text-dark">
                Prenota un campo <HandIndex />
              </Link>
            </p>
          </Col>
        </Row>
        <Row className="my-3">
          <Col md={8} className="my-5">
            <h3>
              Controlla e gestisci tutto da un unico pannello di controllo.
            </h3>
            <p>
              Il tuo profilo personale puoi gestirlo, dove puoi anche aggiungere
              il tuo ruolo preferito tra: Portiere, Difensore, Centrocampista o
              Attaccante. Puoi trovare questa sezione in{" "}
              <Link to="/profilo" className="text-dark">
                Gestisci il tuo profilo <HandIndex />
              </Link>
            </p>
          </Col>
          <Col md={4} className="my-4">
            <Image src={phoneControllo} alt="phone-controll" width={300} />
          </Col>
        </Row>

        {/* FOOTER */}
        <FooterComponent />
      </Container>
    </>
  );
};

export default HomePage;
