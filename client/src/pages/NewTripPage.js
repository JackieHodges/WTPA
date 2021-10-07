import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import API from "../utils/API";
import { useAuth0 } from "@auth0/auth0-react";

function NewTripPage() {

    const [stepNumber, setStepNumber] = useState(1)
    const { isAuthenticated, user } = useAuth0();


    function onClick(event) {
        event.preventDefault()
        if (stepNumber === 1) {
            let tripName = document.getElementById("tripName").value
            API.createTrip({
                trip_name: tripName
            })
                .then(res => addAssociation(res.data.id))
                .then(setStepNumber(2))
                // let tripName = document.getElementById("tripName").value
                // let groupMembers = document.getElementById("membersArray").value
                // console.log(groupMembers)
                .catch(err => console.log(err));
        } else if (stepNumber === 2) {
            setStepNumber(3)
        }
    }

    function addAssociation(trip_id) {
        console.log(`this is the trip id ${trip_id}`)
        API.addAssociation({
            tripId: trip_id,
            userId: user.id
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