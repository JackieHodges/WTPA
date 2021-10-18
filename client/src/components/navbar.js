import React from "react";
import { Container, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

function NavBar() {

    return (
        <Navbar bg="light">
            <Container>
                <Link to="/myTrips">
                    <Navbar.Brand>WTPA</Navbar.Brand>
                </Link>
                <LoginButton />
                <LogoutButton />
            </Container>
        </Navbar>
    )

}

export default NavBar;