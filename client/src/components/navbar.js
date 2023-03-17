import React from "react";
import { Navbar } from "react-bootstrap"
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

function NavBar() {

    return (
        <Navbar bg="dark" variant="dark">
            <div className="container px-2">
                <Link to="/">
                    <Navbar.Brand>WTPA</Navbar.Brand>
                </Link>
                <LoginButton />
                <LogoutButton />
            </div>
        </Navbar>
    )

}

export default NavBar;