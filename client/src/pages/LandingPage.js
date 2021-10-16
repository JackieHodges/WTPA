import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { UserContext } from "../utils/UserContext";

function LandingPage() {

    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [myTrips, setMyTrips] = useState([])

    useEffect(() => {
        if (user) {
            saveUser()
        }
    }, [user])

    function saveUser() {
        API.findOrCreateUser({
            name: user.name,
            auth_o_id: user.sub,
            email: user.email
        })
            .then(res => setCurrentUser(res.data[0]))
            .then(getMyTrips(currentUser.id))
            .then(`this is the current user ${currentUser}`)
            .catch(err => console.log(err))
    }

    function getMyTrips(id) {
        API.getMyTrips(id)
            .then(res => setMyTrips(res.data))
            .catch(err => console.log(err))
    }

    console.log(myTrips)

    function ButtonChoice() {
        if (isAuthenticated) {
            return <Container>
                <Row>
                    <Col>
                        <h2>{currentUser.user_name}'s Dashboard</h2>
                        <h5>What would you like to do?</h5>
                    </Col>
                </Row>
                <Link to="/myTrips">
                    <Button variant="primary">
                        My Trips
                    </Button>
                </Link>
            </Container>

        } else {
            return (
                <div>
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
                    <Button onClick={loginWithRedirect}>Get Started</Button>
                </div>
            )
        }
    }

    return (
        <Container>
            <ButtonChoice />
        </Container>

    )
}

export default LandingPage;