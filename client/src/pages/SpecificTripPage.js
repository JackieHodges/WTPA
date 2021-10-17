import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams } from "react-router";
import API from "../utils/API";

function SpecificTripPage() {

    const { id } = useParams();


    function onClick() {
        let groupMembers = document.getElementById("friendsEmails").value
        let groupMembersArray = groupMembers.split(", ");
        groupMembersArray.forEach(enteredEmail => {
            API.findOrCreateFriend({
                email: enteredEmail
            })
                .then(res => associateTrip(res.data[0]))
                .then(alert(`${enteredEmail} added`))
        })
    }

    function associateTrip(enteredData) {
        console.log(`this is me making sure the ${parseInt(id)} and ${enteredData.id}`)
        API.addAssociation({
            tripId: parseInt(id),
            userId: enteredData.id
        })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="friendsEmails">
                    <Form.Label>Add Friend's Emails Here</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Please seperate emails using a comma. You can always add more later." />
                </Form.Group>
                <Button onClick={onClick}>Add Friend(s)</Button>
            </Form>
        </Container>
    )
}

export default SpecificTripPage;