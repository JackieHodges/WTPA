import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import API from "../utils/API"


function HomePage() {

    const { user, isAuthenticated } = useAuth0();
    const [currentUser, setCurrentUser] = useState({});


    useEffect(() => {
        if (user) {
            API.findOrCreateUser({
                name: user.name,
                auth_o_id: user.sub,
                email: user.email
            })
                .then(res => setCurrentUser(res.data[0]))
                .catch(err => console.log(err));
        }
    }, [user])


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