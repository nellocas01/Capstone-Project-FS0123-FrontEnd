import { Navbar, Container } from "react-bootstrap";
import { Xbox } from "react-bootstrap-icons";

const NavbarComponent = () => {
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("utenteLoggato");
  };

  return (
    <>
      <Navbar bg="success" data-bs-theme="dark" expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="/home" className="text-black">
            StonksBall <Xbox />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="/campi" className="nav-link">
                  Campi disponibili
                </a>
              </li>
              <li className="nav-item">
                <a href="/prenotazioni" className="nav-link">
                  Prenota un campo
                </a>
              </li>
              <li className="nav-item">
                <a href="/profilo" className="nav-link">
                  Il tuo profilo
                </a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link" onClickCapture={logout}>
                  Esci
                </a>
              </li>
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
