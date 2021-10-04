import React from "react";
import { Container, Navbar } from "react-bootstrap"

function NavBar() {

    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="/">Brand link</Navbar.Brand>
            </Container>
        </Navbar>
    )

}

export default NavBar;