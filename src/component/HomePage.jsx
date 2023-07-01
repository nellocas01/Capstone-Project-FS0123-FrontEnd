import Container from "react-bootstrap/Container";
import { Col, Image, Row } from "react-bootstrap";
import phoneLogo from "../assets/img/phoneLogo.jpg";
import appStore from "../assets/img/appStore.png";
import googleStore from "../assets/img/googleStore.png";
import phoneCampo from "../assets/img/phoneCampo.jpg";
import formazione from "../assets/img/formazione.jpg";
import phoneFormazione from "../assets/img/phoneFormazione.jpg";
import phoneControllo from "../assets/img/phoneControllo.png";
import NavbarComponent from "./NavbarComponent";
import { HandIndex } from "react-bootstrap-icons";
import FooterComponent from "./FooterComponent";

const HomePage = () => {
  return (
    <>
      {/* NAVBAR */}
      <NavbarComponent />

      {/* * HOME */}
      <Container fluid>
        <Row>
          <Col sm={5}>
            <Row>
              <h3>
                Organizza al meglio
                <br />
                le tue partite di calcio
              </h3>
              <div></div>
              <p>
                StonksBall è un’app che permette di organizzare al meglio le
                partite di calcio con gli amici. Convocazioni, Formazioni,
                Tabellino e Statistiche. <br />
                Crea o unisciti a Gruppi Partita per giocare e/o organizzare
                partite di calcio a 5 senza vincoli con le strutture sportive e
                senza costi aggiuntivi.
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
          <Col sm={6} className="d-sm-block offset-sm-1">
            <Row className="d-xs-block">
              <Image width="100%" src={phoneLogo} alt="phone-logo" />
            </Row>
          </Col>
        </Row>
      </Container>
      <div className="divider">
        <h4>
          Risparmia tempo e organizza le tue partite in modo semplice e rapido.
        </h4>
      </div>
      <Container fluid>
        <Row>
          <Col>
            <Image src={phoneCampo} alt="phone-campo" width={100} />
          </Col>
          <Col>
            <h5>Amministra o iscriviti a Gruppi Partita.</h5>
            <p>
              Goalcup permette a tutti gli utenti di creare Gruppi Partita e
              gestirli come Amministratore in tutte le fasi di organizzazione.
              Inviti al gruppo, convocazioni, composizione squadre e formazioni.
              Ogni utente può sia giocare che amministrare.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col>
                <div className="d-flex">
                  <h3>Organizza le squadre.</h3>
                  <HandIndex width={100} />
                </div>
              </Col>
              <Col>
                <p>Scegli la partita che fa per te.</p>
              </Col>
              <Col>
                <Image src={formazione} alt="formazione" width={100} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Image src={phoneFormazione} alt="phone-formazione" width={100} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>
              Controlla e gestisci tutto da un unico pannello di controllo.
            </h3>
            <p>
              Gruppi partita e partite, squadre, formazioni, tabellino, opzioni
              partita, migliore in campo: tutto gestibile da un unico pannello
              sia per l’amministratore che per il giocatore.
            </p>
          </Col>
          <Col>
            <Image src={phoneControllo} alt="phone-controll" width={100} />
          </Col>
        </Row>
      </Container>

      {/* FOOTER */}
      <FooterComponent />
    </>
  );
};

export default HomePage;
