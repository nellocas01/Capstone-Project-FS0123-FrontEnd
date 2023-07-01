import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import { Xbox } from "react-bootstrap-icons";

const NavbarComponent = () => {
  return (
    <>
      {/* NAVBAR */}
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} bg="success" data-bs-theme="dark">
          <Container fluid>
            <div>
              <Navbar.Brand>
                StonksBall <Xbox />
              </Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                ></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="me-auto">
                  <Nav.Link to="/home">Home</Nav.Link>
                  <Nav.Link to="/partite">Partite</Nav.Link>
                  <Nav.Link href="/login">Logout</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default NavbarComponent;
