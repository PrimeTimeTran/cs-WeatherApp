import React from "react";
import { Nav, Navbar } from "react-bootstrap";

export default class AppNav extends React.Component {
  render() {
    return (
      <Navbar
        bg="dark"
        fixed="top"
        expand="lg"
        variant="dark"
        collapseOnSelect
        style={{ marginRight: 0 }}
      >
        <Navbar.Brand href="#home">Weather</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Profile</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Settings
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
