import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import API from "../utils/API";
import ReactVote from 'react-vote';
import { UserContext } from "../utils/UserContext";

function SpecificTripPage() {

    const { id } = useParams();
    const [thisTripData, setThisTripData] = useState({})
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        getThisTrip()
    }, [])

    function getThisTrip() {
        document.getElementById("friendsEmails").value = "";
        API.getThisTrip(id)
            .then(res => setThisTripData(res.data))
            .catch(err => console.log(err))
    }

    function onClick() {
        let groupMembers = document.getElementById("friendsEmails").value
        let groupMembersArray = groupMembers.split(", ");
        groupMembersArray.forEach(enteredEmail => {
            API.findOrCreateFriend({
                email: enteredEmail
            })
                .then(res => associateTrip(res.data[0]))
                .then(alert(`${enteredEmail} added`))
                .catch(err => console.log(err))
        })
    }

    function associateTrip(enteredData) {
        console.log(`this is me making sure the ${parseInt(id)} and ${enteredData.id}`)
        API.addAssociation({
            tripId: parseInt(id),
            userId: enteredData.id
        })
            .then(res => getThisTrip())
            .catch(err => console.log(err))
    }

    function onCreate(data, diff) {
        API.setVote({
            voteData: data,
            id: id
        })
        .then(res => getThisTrip())
        .catch(err => console.log(err))
    }

    function onUpvote(data, diff) {
        API.setVote({
            voteData: data,
            id: id
        })
        .then(res => getThisTrip())
        .catch(err => console.log(err))
    }

    console.log(thisTripData)

    return (
        <Container>
            <h1>{thisTripData.trip_name}</h1>
            <Row>
                <Col>
                    <h2>Invited Friends:</h2>
                    {/* {thisTripData.users.map(friend =>
                        <div key={friend.id}>
                            {friend.email}
                        </div> */}
                    {/* )} */}
                    <h2>Invite More Friends:</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="friendsEmails">
                            <Form.Label>Add Friend's Emails Here</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Please seperate emails using a comma. You can always add more later." />
                        </Form.Group>
                        <Button onClick={onClick}>Add Friend(s)</Button>
                    </Form>
                </Col>
                <Col>
                    <ReactVote onCreate={onCreate} onUpvote={onUpvote} onClose={onUpvote} onReset={onUpvote} isAdmin={true} clientId={currentUser.email} data={thisTripData.voteData}/>
                </Col>
                <Col>
                Comments
                </Col>
            </Row>
        </Container>
    )
}

export default SpecificTripPage;