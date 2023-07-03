import Container from "react-bootstrap/Container";
import { Col, Image, Row } from "react-bootstrap";
import phoneLogo from "../assets/img/phoneLogo.jpg";
import appStore from "../assets/img/appStore.png";
import googleStore from "../assets/img/googleStore.png";
import phoneFormazione from "../assets/img/phoneFormazione.jpg";
import phoneControllo from "../assets/img/phoneControllo.png";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

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
              <div></div>
              <p>
                StonksBall è un’app che permette di organizzare al meglio le
                partite di calcio con gli amici e non solo. <br />
                Crea o unisciti a Gruppi Partita per giocare e/o organizzare
                partite di calcio a 5 senza vincoli con le strutture sportive a
                disposizione e senza costi aggiuntivi.
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
              StonksBall permette a tutti gli utenti di creare Gruppi Partita e
              gestirli come Amministratore in tutte le fasi di organizzazione.
              Inviti al gruppo, convocazioni, composizione squadre e formazioni.
              Ogni utente può sia giocare che amministrare.
            </p>
          </Col>
        </Row>
        <Row className="my-3">
          <Col md={8} className="my-5">
            <h3>
              Controlla e gestisci tutto da un unico pannello di controllo.
            </h3>
            <p>
              Gruppi partita e partite, squadre, formazioni, tabellino, opzioni
              partita, migliore in campo: tutto gestibile da un unico pannello
              sia per l’amministratore che per il giocatore.
            </p>
          </Col>
          <Col md={4} className="my-5">
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
