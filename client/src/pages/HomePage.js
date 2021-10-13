import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../utils/API"
import { UserContext } from "../utils/UserContext";


function HomePage() {

    const { user, isAuthenticated } = useAuth0();
    const { currentUser, setCurrentUser } = useContext(UserContext);

    console.log(`this is the currentUser ${currentUser.user_name}`)

    // useEffect(() => {
    //     if (user) {
    //         saveUser();
    //     }
    // }, [user])

    // function saveUser() {
    //     API.findOrCreateUser({
    //         name: user.name,
    //         auth_o_id: user.sub,
    //         email: user.email
    //     })
    //         .then(res => setCurrentUser(res.data[0]))
    //         .then(`the user has been saved`)
    //         .catch(err => console.log(err))
    // }


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
                <Link to="/newTrip">
                    <Button variant="primary">
                        Start a trip
                    </Button>
                </Link>
            </Container>
        )
    )
}

export default HomePage;