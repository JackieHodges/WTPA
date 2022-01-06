import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { UserContext } from "../utils/UserContext";

function MyTripsPage() {

    const { currentUser } = useContext(UserContext);
    const { user } = useAuth0();

    const [myTrips, setMyTrips] = useState([])

    useEffect(() => {
        getMyTrips()
    }, [user])

    // fetches trip of current user
    function getMyTrips() {
        document.getElementById("tripName").value = "";
        API.getMyTrips(currentUser.id)
            .then(res => setMyTrips(res.data))
            .then(console.log(myTrips))
            .catch(err => console.log(err))
    }

    // conditional render of trips
    function TripsList() {
        if (myTrips.length > 0) {
            return (
                myTrips.map(trip =>
                    <Row key={trip.trip.id}>
                        <Link className="accordion-title" to={"/myTrips/" + trip.trip.id}>
                            <Button style={{ backgroundColor: "rgb(76,108,116)" }}>{trip.trip.trip_name}</Button>
                        </Link>
                    </Row>
                ))
        } else {
            return <p>No Trips Yet</p>
        }
    }

    // adds a new trip
    function onClick() {
        let tripName = document.getElementById("tripName").value
        console.log(tripName)
        API.createTrip({
            trip_name: tripName
        })
            .then(res => addAssociation(res.data.id))
    }

    // joins the trip to the user
    function addAssociation(tripNumber) {
        console.log(`this is the trip id in initial association${tripNumber}`)
        API.addAssociation({
            tripId: tripNumber,
            userId: currentUser.id,
            is_admin: true
        })
        .then(getMyTrips())
        .catch(err => console.log(err))
    }

    return (
        <Container>
            <Row>
                <Col style={{ padding: "2%" }}>
                    <h2>{user.given_name}'s Trips</h2>
                    <TripsList />
                </Col>
                <Col style={{ padding: "2%" }}>
                    <h2>Add A New Trip Here</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="tripName">
                            <Form.Label>Name Your Trip</Form.Label>
                            <Form.Control autocomplete="off" type="text" placeholder="Trip Name Here" />
                        </Form.Group>
                        <Button style={{ backgroundColor: "rgb(76,108,116)" }} onClick={onClick}>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )


}

export default MyTripsPage;