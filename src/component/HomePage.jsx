import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const HomePage = () => {
  return (
    <Navbar bg="success" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">StonksBall</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link to="/home">Home</Nav.Link>
          <Nav.Link to="/partite">Partite</Nav.Link>
          <Nav.Link href="/login">Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default HomePage;
