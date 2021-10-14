import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import API from "../utils/API";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../utils/UserContext";
import { Link } from "react-router-dom";

function NewTripPage() {

    const [stepNumber, setStepNumber] = useState(1);
    const { isAuthenticated, user } = useAuth0();
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [selectedTrip, setSelectedTrip] = useState({});

console.log(`this is the selected Trip id global ${selectedTrip.id}`)

    function onClick(event) {
        event.preventDefault()
        if (stepNumber === 1) {
            let tripName = document.getElementById("tripName").value
            API.createTrip({
                trip_name: tripName
            })
                .then(res => addAssociation(res.data.id, currentUser.id))
                .then(setStepNumber(2))
                .catch(err => console.log(err));
        } else if (stepNumber === 2) {
            let groupMembers = document.getElementById("friendsEmails").value
            let groupMembersArray = groupMembers.split(", ");
            groupMembersArray.forEach(enteredEmail => {
                API.findOrCreateFriend({
                    email: enteredEmail
                })
                    .then(res => addFriendAssociation(selectedTrip.id, res.data[0].id))
                    .then(alert(`${enteredEmail} added`))
            })
            setStepNumber(3)
        }
    }

    function addAssociation(tripNumber, userId) {
        console.log(`this is the trip id in initial association${tripNumber}`)
        API.addAssociation({
            tripId: tripNumber,
            userId: userId
        })
            .then(res => setSelectedTrip(res.data))
            .catch(err => console.log(err))
    }

    function addFriendAssociation(tripNumber, userId) {
        console.log(`this is the trip id in friend association${tripNumber}`)
        API.addAssociation({
            tripId: tripNumber,
            userId: userId
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    function onCancel() {
        setStepNumber(1);
    }

    function WizardSteps() {
        if (stepNumber === 1) {
            return (
                <div>
                    <Form.Group className="mb-3" controlId="tripName">
                        <Form.Label>Name Your Trip</Form.Label>
                        <Form.Control type="text" placeholder="Trip Name Here" />
                    </Form.Group>
                </div>
            )
        } else if (stepNumber === 2) {
            return (
                <div>
                    <Form.Group className="mb-3" controlId="friendsEmails">
                        <Form.Label>Add Friend's Emails Here</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Please seperate emails using a comma. You can always add more later." />
                    </Form.Group>
                </div>

            )
        } else {
            return (
                <div>
                    Haven't decided if I end of put react vote here.
                </div>
            )
        }
    }

    return (
        isAuthenticated && (
            <Container>
                <h2>Create your Trip</h2>
                <Form>
                    <WizardSteps />
                </Form>
                <Button onClick={onClick}>Submit</Button>
                <Button variant="secondary" onClick={onCancel}>Cancel</Button>
            </Container>
        )
    )
}

export default NewTripPage;