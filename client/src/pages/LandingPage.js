import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { UserContext } from "../utils/UserContext";
import MyTripsPage from "./MyTripsPage";

function LandingPage() {

    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [myTrips, setMyTrips] = useState([])

    useEffect(() => {
        if (user) {
            saveUser()
        }
    }, [user])

    // find or create the user, and set it as the current user 
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

    // conditional component that changes once the user is authenticated
    function ButtonChoice() {
        if (isAuthenticated) {
            return <Container>
                <MyTripsPage user={user}/>
                {/* <Row>
                    <Col>
                        <h2>{currentUser.user_name}'s Dashboard</h2>
                        <h5>What would you like to do?</h5>
                        <Link to="/myTrips">
                            <Button style={{ backgroundColor: "rgb(76,108,116)" }} variant="primary">
                                My Trips
                            </Button>
                        </Link>
                    </Col>
                </Row> */}
            </Container>

        } else {
            return (
                <Container>
                    <Row>
                        <Col>
                            <h2>Where's The Party At?</h2>
                            <h5>In need of a vacation? Having a hard time coordinating with a large group?</h5>
                            <h6>This app allows you to gather, plan, and finally execute your long-talked-about trip or event. </h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button style={{ backgroundColor: "rgb(76,108,116)" }} onClick={loginWithRedirect}>Get Started</Button>
                        </Col>
                    </Row>
                </Container>
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