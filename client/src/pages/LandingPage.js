import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { UserContext } from "../utils/UserContext";

function LandingPage() {

    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const { currentUser, setCurrentUser } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            saveUser();
        }
    }, [user])

    function saveUser() {
        API.findOrCreateUser({
            name: user.name,
            auth_o_id: user.sub,
            email: user.email
        })
            .then(res => setCurrentUser(res.data[0]))
            .then(`the user has been saved`)
            .catch(err => console.log(err))
    }

    console.log(`this is the current user on landing page ${currentUser}`)

    function ButtonChoice() {
        if (isAuthenticated) {
            return <Link variant="primary" to="/home">
                <Button>Home</Button>
            </Link>

        } else {
            return <Button onClick={loginWithRedirect}>Get Started</Button>
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Where's The Party At?</h2>
                    <h5>In need of a vacation? Having a hard time coordinating with a large group?</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h7>This app allows you to gather, plan, and finally execute your long-talked-about trip or event. </h7>
                </Col>
            </Row>
            <ButtonChoice />
        </Container>

    )
}

export default LandingPage;