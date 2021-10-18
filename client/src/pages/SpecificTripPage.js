import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import API from "../utils/API";
import ReactVote from 'react-vote';
import { UserContext } from "../utils/UserContext";

function SpecificTripPage() {

    const { id } = useParams();
    const [thisTripData, setThisTripData] = useState({})
    const [Admin, setAdmin] = useState(false)
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        getThisTrip()
    }, [])

    function getThisTrip() {
        document.getElementById("friendsEmails").value = "";
        API.getThisTrip(id)
            .then(res => setThisTripData(res.data))
            .then(isAdmin())
            .catch(err => console.log(err))
    }

    function onClick() {
        let groupMembers = document.getElementById("friendsEmails").value.trim()
        let groupMembersArray = groupMembers.split(", ");
        groupMembersArray.forEach(enteredEmail => {
            API.findOrCreateFriend({
                email: enteredEmail
            })
                .then(res => associateTrip(res.data[0]))
                // .then(alert(`${enteredEmail} added`))
                .catch(err => console.log(err))
        })
    }

    function associateTrip(enteredData) {
        console.log(`this is me making sure the ${parseInt(id)} and ${enteredData.id}`)
        API.addAssociation({
            tripId: parseInt(id),
            userId: enteredData.id,
            is_admin: false
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

    function onVote(data, diff) {
        API.setVote({
            voteData: data,
            id: id
        })
            .then(res => getThisTrip())
            .catch(err => console.log(err))
    }

    function onDelete() {
        API.setVote({
            voteData: "",
            id: id
        })
            .then(res => getThisTrip())
            .catch(err => console.log(err))
    }

    // function deleteFriend(event){
    //     event.preventDefault();
    //     console.log(`this is friend id ${typeof parseInt(event.target.id)} and this is tripId ${typeof parseInt(id)}`)
    //     API.deleteFriend({
    //         tripId: parseInt(id),
    //         userId: parseInt(event.target.id)
    //     })
    //     .then(res => console.log(res.data))
    //     .then(res => getThisTrip())
    //     .catch(err => console.log(err))
    // }

    function FriendsList() {
        if (thisTripData.users) {
            return thisTripData.users.map(friend =>
                <div key={friend.id} >
                    {friend.email}
                    {/* <Button onClick={deleteFriend} id={friend.id}>X</Button> */}
                </div>
            )
        } else {
            return <p>No Friends Added</p>
        }
    }

    function ShowButton() {
        if (Admin  === true) {
            return <Button onClick={onDelete}>Delete Vote Data</Button>
        } else {
            return null
        }
    }

    function isAdmin(){
        console.log(currentUser)
        API.isAdmin({
            tripId: id,
            userId: currentUser.id
        })
        .then(res => setAdmin(res.data.is_admin))
        .catch(err => console.log(err))

    }

    console.log(`this is tripdata ${Admin}`)

    return (
        <Container>
            <h1>{thisTripData.trip_name}</h1>
            <Row>
                <Col>
                    <h2>Invited Friends:</h2>
                    <FriendsList />
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
                    <ReactVote onCreate={onCreate} onUpvote={onVote} onClose={onVote} onExpand={onVote} onDownvote={onVote} onReset={onVote} isAdmin={Admin} clientId={currentUser.email} data={thisTripData.voteData} />
                    <ShowButton />
                </Col>
                <Col>
                    Comments
                </Col>
            </Row>
        </Container>
    )
}

export default SpecificTripPage;