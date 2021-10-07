import React from "react";
import { Container, Navbar } from "react-bootstrap"
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

function NavBar() {

    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="/">Brand link</Navbar.Brand>
                <LoginButton />
                <LogoutButton />
            </Container>
        </Navbar>
    )

}

export default NavBar;