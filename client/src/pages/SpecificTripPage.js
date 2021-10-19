import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { useParams } from "react-router";
import API from "../utils/API";
import ReactVote from 'react-vote';
import { UserContext } from "../utils/UserContext";

function SpecificTripPage() {

    const { id } = useParams();
    const [thisTripData, setThisTripData] = useState({})
    const [tripsComments, setTripsComments] = useState([])
    const [Admin, setAdmin] = useState(false)
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        getThisTrip()
    }, [])

    function getThisTrip() {
        document.getElementById("friendsEmails").value = "";
        document.getElementById("newComment").value = "";
        API.getThisTrip(id)
            .then(res => setThisTripData(res.data))
            .then(isAdmin())
            .then(getTripComments())
            .catch(err => console.log(err))
    }

    // set if the user is admin for special permissions
    function isAdmin() {
        console.log(currentUser)
        API.isAdmin({
            tripId: id,
            userId: currentUser.id
        })
            .then(res => setAdmin(res.data.is_admin))
            .catch(err => console.log(err))

    }

    // load comments that are specific for the trip
    function getTripComments() {
        API.getTripComments(id)
            .then(res => setTripsComments(res.data.comments))
    }

    // adds new users to a trip
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

    // adds a new comment
    function onComment() {
        let newComment = document.getElementById("newComment").value.trim()
        API.addNewComment({
            tripId: id,
            userId: currentUser.id,
            text: newComment
        })
            .then(res => getThisTrip())
            // .then(alert(`${enteredEmail} added`))
            .catch(err => console.log(err))
    }

    // creates the join between the trip and user
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

    // initialization of the vote component
    function onCreate(data, diff) {
        API.setVote({
            voteData: data,
            id: id
        })
            .then(res => getThisTrip())
            .catch(err => console.log(err))
    }

    // reguardless of what the user does, this will save the new vote data
    function onVote(data, diff) {
        API.setVote({
            voteData: data,
            id: id
        })
            .then(res => getThisTrip())
            .catch(err => console.log(err))
    }

    // when the vote is deleted, the create vote will render
    function onDelete() {
        API.setVote({
            voteData: "",
            id: id
        })
            .then(res => getThisTrip())
            .catch(err => console.log(err))
    }

    function deleteFriend(event) {
        API.deleteFriend(event.target.id)
            .then(res => console.log(res.data))
            .then(res => getThisTrip())
            .catch(err => console.log(err))
    }

    console.log(thisTripData.users)
    console.log(tripsComments)

    // conditional component that only lists friends if they exist
    function FriendsList() {
        if (thisTripData.users) {
            return thisTripData.users.map(friend =>
                <p key={friend.id} >
                    {friend.email}
                    <Button className="btn-x" style={{ backgroundColor: "rgb(76,108,116)" }} onClick={deleteFriend} id={friend.traveller.id}>X</Button>
                </p>
            )
        } else {
            return <p>No Friends Added</p>
        }
    }

    // conditional component based on if there are comments
    function CommentList() {
        if (thisTripData.users) {
            return (
                <ListGroup>
                    {tripsComments.map(comment =>
                        <ListGroup.Item key={comment.id} style={{ backgroundColor: "rgb(76,108,116, 0.9)", marginBottom: "1%" }}>
                            {comment.text} -- {comment.user.user_name} at {comment.createdAt}
                            {/* <Button className="btn-x" style={{ backgroundColor: "rgb(76,108,116)" }} onClick={deleteFriend} id={friend.traveller.id}>X</Button> */}
                        </ListGroup.Item>
                    )}
                </ListGroup>
            )
        } else {
            return <p>No Comments Added Yet.</p>
        }
    }

    // conditional component based onif the user is the admin of the trip or not
    function ShowButton() {
        if (Admin === true) {
            return <Button style={{ backgroundColor: "rgb(76,108,116)" }} onClick={onDelete}>Delete Vote Data</Button>
        } else {
            return null
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>{thisTripData.trip_name}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Invited Friends:</h2>
                    <FriendsList />
                    <h3>Invite More Friends:</h3>
                    <Form>
                        <Form.Group className="mb-3" controlId="friendsEmails">
                            <Form.Label>Add Friend's Emails Here</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Please seperate emails using a comma. You can always add more later." />
                        </Form.Group>
                        <Button style={{ backgroundColor: "rgb(76,108,116)" }} onClick={onClick}>Add Friend(s)</Button>
                    </Form>
                </Col>
                <Col>
                    <h2>Vote Here</h2>
                    <ReactVote onCreate={onCreate} onUpvote={onVote} onClose={onVote} onExpand={onVote} onDownvote={onVote} onReset={onVote} isAdmin={Admin} clientId={currentUser.email} data={thisTripData.voteData} />
                    <ShowButton />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Comments</h2>
                    <CommentList />
                    <Form>
                        <Form.Group className="mb-3" controlId="newComment">
                            <Form.Control type="text" placeholder="Add comment here" />
                            <Button style={{ backgroundColor: "rgb(76,108,116)" }} onClick={onComment}>Add Comment</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SpecificTripPage;