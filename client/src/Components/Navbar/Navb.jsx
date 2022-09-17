import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import mainLogo from'./eye2.png';


function Navb(){
    return(
        <>
          <Navbar bg="dark" variant="dark" className="navbar">
        <Container>
          <Navbar.Brand href="#home" className="logo">
            eyeCoders
            {/* <img src={mainLogo} alt="logo" className="logoimage"/> */}
            </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Code Editor</Nav.Link>
            <Nav.Link href="#pricing">Our Team</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        </>
    )
}

export default Navb;


