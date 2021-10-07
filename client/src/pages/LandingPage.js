import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

function LandingPage() {

    const { loginWithRedirect, isAuthenticated } = useAuth0();

    function ButtonChoice() {
        if (isAuthenticated) {
            return <Button variant="primary" href="/home">Home</Button>
            
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