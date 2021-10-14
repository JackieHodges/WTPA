import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { UserContext } from "../utils/UserContext";

function MyTripsPage() {

    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [myTrips, setMyTrips] = useState([])

    useEffect(() => {
        getMyTrips(currentUser.id)
    }, [])

    function getMyTrips(id) {
        API.getMyTrips(id)
            .then(res => setMyTrips(res.data))
            .catch(err => console.log(err))
    }

    console.log(`this is my current User ${currentUser.id}`)
    return (
    <Container>
        <h2>{currentUser.user_name}'s Trips</h2>
        <Row>
            {myTrips.map(trip =>
                <Link key={trip.id} className="accordion-title" to={"/myTrips/" + trip.id}>
                    <Button>{trip.trip.trip_name}</Button>
                </Link>
            )}
        </Row>
    </Container>
    )


}

export default MyTripsPage;