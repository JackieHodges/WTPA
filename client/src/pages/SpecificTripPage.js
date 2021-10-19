import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
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
        API.getThisTrip(id)
            .then(res => setThisTripData(res.data))
            .then(isAdmin())
            .then(getTripComments())
            .catch(err => console.log(err))
    }

    function getTripComments() {
        API.getTripComments(id)
            .then(res => setTripsComments(res.data.comments))
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

    function deleteFriend(event) {
        API.deleteFriend(event.target.id)
            .then(res => console.log(res.data))
            .then(res => getThisTrip())
            .catch(err => console.log(err))
    }

    console.log(thisTripData.users)
    console.log(tripsComments)

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

    function CommentList() {
        if (tripsComments) {
            return tripsComments.map(comment =>
                <p key={comment.id} >
                    {comment.text} {comment.createdAt} {comment.user.user_name}
                    {/* <Button className="btn-x" style={{ backgroundColor: "rgb(76,108,116)" }} onClick={deleteFriend} id={friend.traveller.id}>X</Button> */}
                </p>
            )
        } else {
            return <p>No Friends Added</p>
        }
    }

    function ShowButton() {
        if (Admin === true) {
            return <Button style={{ backgroundColor: "rgb(76,108,116)" }} onClick={onDelete}>Delete Vote Data</Button>
        } else {
            return null
        }
    }

    function isAdmin() {
        console.log(currentUser)
        API.isAdmin({
            tripId: id,
            userId: currentUser.id
        })
            .then(res => setAdmin(res.data.is_admin))
            .catch(err => console.log(err))

    }

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

    console.log(`this is tripdata ${Admin}`)

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