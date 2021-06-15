import { faCashRegister } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <FontAwesomeIcon icon={faCashRegister} />
          <strong> Cashier App</strong>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
