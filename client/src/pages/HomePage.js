import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import API from "../utils/API"
import { UserContext } from "../utils/UserContext";


function HomePage() {

    const { user, isAuthenticated } = useAuth0();
    const { currentUser, setCurrentUser } = useContext(UserContext);

    console.log(`this is the currentUser ${currentUser.name}`)

    return (
        isAuthenticated && (
            <Container>
                <Row>
                    <Col>
                        <h2>{currentUser.user_name}'s Dashboard</h2>
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