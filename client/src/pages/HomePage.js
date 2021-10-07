import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";


function HomePage() {

    const { user, isAuthenticated } = useAuth0();


    return (
        isAuthenticated && (
            <Container>
                <Row>
                    <Col>
                        <h2>{user.name}'s Dashboard</h2>
                        <h5>What would you like to do?</h5>
                    </Col>
                </Row>
                <Button variant="primary">
                    Find a trip
                </Button>
                <Button variant="primary" href="/newTrip">
                    Start a trip
                </Button>
            </Container>
        )
    )
}

export default HomePage;