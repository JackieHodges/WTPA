import React, { useContext, useEffect, useState } from "react";
import { Button,Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { UserContext } from "../utils/UserContext";

function MyTripsPage() {

    const { currentUser } = useContext(UserContext);
    const [myTrips, setMyTrips] = useState([])

    useEffect(() => {
        getMyTrips()
    }, [])

    function getMyTrips() {
        document.getElementById("tripName").value = "";
        API.getMyTrips(currentUser.id)
            .then(res => setMyTrips(res.data))
            .then(console.log(myTrips))
            .catch(err => console.log(err))
    }

    function onClick() {
        let tripName = document.getElementById("tripName").value
        console.log(tripName)
        API.createTrip({
            trip_name: tripName
        })
            .then(res => addAssociation(res.data.id))
    }

    function addAssociation(tripNumber) {
        console.log(`this is the trip id in initial association${tripNumber}`)
        API.addAssociation({
            tripId: tripNumber,
            userId: currentUser.id
        })
            .then(res => getMyTrips())
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <h2>{currentUser.user_name}'s Trips</h2>
            {myTrips.map(trip =>
                <Row key={trip.id}>
                    <Link className="accordion-title" to={"/myTrips/" + trip.id}>
                        <Button>{trip.trip.trip_name}</Button>
                    </Link>
                </Row>
            )}
            <Row>
            <h3>Add A New Trip Here</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="tripName">
                        <Form.Label>Name Your Trip</Form.Label>
                        <Form.Control type="text" placeholder="Trip Name Here" />
                    </Form.Group>
                    <Button onClick={onClick}>Submit</Button>
                </Form>
            </Row>
        </Container>
    )


}

export default MyTripsPage;