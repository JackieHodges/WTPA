import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { UserContext } from "../utils/UserContext";

function MyTripsPage(props) {

    const { currentUser } = useContext(UserContext);
    const { user } = useAuth0();

    const [myTrips, setMyTrips] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        getMyTrips()
    }, [user])

    // fetches trip of current user
    function getMyTrips() {
        setMyTrips([])
        API.getMyTrips(props.userId)
            .then(res => {
                let trips = []
                res.data.forEach(element => {
                    trips.push(element.trip)
                })
                setMyTrips(trips)
            })
            .catch(err => console.log(err))
    }

    console.log(`this is myTrips ${myTrips}`)
    console.log(`this is the props userID ${props.userId}`)

    // conditional render of trips
    function TripsList() {
        if (myTrips.length > 0) {
            return (
                myTrips.map(trip =>
                    <div key={trip.id}>
                        <Link className="accordion-title" to={"/myTrips/" + trip.id}>
                            <Button style={{ backgroundColor: "rgb(76,108,116)" }} className="mb-2">{trip.trip_name}</Button>
                        </Link>
                    </div>
                )
            )
        } else {
            return <p>No Trips Yet</p>
        }
    }

    // adds a new trip
    function onClick() {
        let tripName = document.getElementById("tripName").value
        if (!tripName || tripName === "") {
            setShowError(true)
        } else {
            API.createTrip({
                trip_name: tripName
            })
                .then(res => addAssociation(res.data.id))
                .then(getMyTrips())
        }
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
        <div className="container">
                <div className="bg-white max-h-1/2 p-6 pb-10 rounded-lg drop-shadow-2xl absolute inset-1/4 overflow-y-auto">
                    <h2 className="sticky top-0 bg-white/75 mb-4">{user.given_name}'s Plans</h2>
                    <TripsList />
                    <Button variant="primary" onClick={() => setShowModal(true)}>Add New Trip</Button>
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Trip</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="mt-2">
                            <Form>
                                <Form.Group className="mb-1" controlId="tripName">
                                    <Form.Label>Name Your Trip</Form.Label>
                                    <Form.Control className={showError && "ring-2 ring-[#dc3545]"} onChange={() => setShowError(false)} autoComplete="off" type="text" placeholder="Trip Name Here" />
                                </Form.Group>
                                <p className={showError ? "text-[#dc3545]" : "invisible"}>Please check your trip name and try again.</p>
                                <Button className="mb-6" variant={showError ? "danger" : "primary"} onClick={onClick}>Submit</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
    )


}

export default MyTripsPage;