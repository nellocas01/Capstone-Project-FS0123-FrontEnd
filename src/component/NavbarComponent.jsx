import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Xbox } from "react-bootstrap-icons";

const NavbarComponent = () => {
  return (
    <>
      {/* NAVBAR */}
      <Navbar bg="success" data-bs-theme="dark" expand="lg">
        <Container className="d-flex justify-content-center">
          <Navbar.Brand href="/home" className="text-black">
            StonksBall <Xbox />
          </Navbar.Brand>
          <Navbar.Brand href="/campi" className="mx-5">
            Campi disponibili
          </Navbar.Brand>
          <Navbar.Brand href="/prenotazioni" className="mx-5">
            Prenota un campo
          </Navbar.Brand>
          <Navbar.Brand href="/profilo" className="mx-5">
            Gestisci il tuo profilo
          </Navbar.Brand>
          <Navbar.Brand href="/" className="mx-5">
            Esci
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
