import React from "react";
import { Container, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

function NavBar() {

    return (
        <Navbar bg="light">
            <container>
                <Link to="/">
                    <Navbar.Brand>WTPA</Navbar.Brand>
                </Link>
                <LoginButton />
                <LogoutButton />
            </container>
        </Navbar>
    )

}

export default NavBar;