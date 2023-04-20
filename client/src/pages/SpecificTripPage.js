import React, { useContext, useEffect, useState } from "react";
import { Form, Button, ListGroup, Modal } from "react-bootstrap";
import { useParams } from "react-router";
import API from "../utils/API";
import ReactVote from 'react-vote';
import { UserContext } from "../utils/UserContext";

function SpecificTripPage() {

    const { id } = useParams();
    const [thisTripData, setThisTripData] = useState({})
    const [tripsComments, setTripsComments] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showError, setShowError] = useState(false);
    const [Admin, setAdmin] = useState(false)
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        getThisTrip()
    }, [])

    function getThisTrip() {
        API.getThisTrip(id)
            .then(res => setThisTripData(res.data))
            .then(isAdmin())
            .then(getTripComments())
            .catch(err => console.log(err))
    }

    // set if the user is admin for special permissions
    function isAdmin() {
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
        let groupMembers = document.getElementById("friendsEmails").value.trim().split(", ")
        const validateEmails = groupMembers.filter(email => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
        if (groupMembers.length === validateEmails.length) {
            groupMembers.forEach(enteredEmail => {
                API.findOrCreateFriend({
                    email: enteredEmail
                })
                    .then(res => associateTrip(res.data[0]))
                    // .then(alert(`${enteredEmail} added`))
                    .catch(err => console.log(err))
            })
            setShowModal(false)
        } else {
            setShowError(true);
        }
    }

    // adds a new comment
    function onComment() {
        let newComment = document.getElementById("newComment").value.trim()
        if (newComment) {
            API.addNewComment({
                tripId: id,
                userId: currentUser.id,
                text: newComment
            })
                .then(res => getThisTrip())
                // .then(alert(`${enteredEmail} added`))
                .catch(err => console.log(err))
            document.getElementById("newComment").value = "";
        }
    }

    // creates the join between the trip and user
    function associateTrip(enteredData) {
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

    // conditional component that only lists friends if they exist
    function FriendsList() {
        if (thisTripData.users) {
            return thisTripData.users.map(friend =>
                <p key={friend.id} >
                    {friend.email}
                    <Button size="sm" className="btn-x" style={{ backgrounddivor: "rgb(76,108,116)" }} onClick={deleteFriend} id={friend.traveller.id}>X</Button>
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
                        <ListGroup.Item key={comment.id} style={{ backgrounddivor: "rgb(76,108,116, 0.9)", marginBottom: "1%" }}>
                            <div className="flex flex-col">
                                <p>{comment.text} -- {comment.user.user_name}</p>
                                <p>at {new Date(comment.createdAt).toLocaleString()}</p>
                            </div>
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
            return <Button style={{ backgrounddivor: "rgb(76,108,116)" }} onClick={onDelete}>Delete Vote Data</Button>
        } else {
            return null
        }
    }

    return (
        <div className="container overflow-y-auto">
            <h1 className="mb-4">{thisTripData.trip_name}</h1>
            <div className="flex md:flex-row md:gap-x-10 flex-col gap-y-4 justify-center mx-6">
                <div className="sm:flex sm:flex-col sm:gap-y-8">
                    <div className="bg-white p-10 rounded-lg drop-shadow-2xl">
                        <h2>Invited Friends:</h2>
                        <div className="overflow-y-auto max-h-48">
                            <FriendsList />
                        </div>
                        <Button onClick={() => setShowModal(true)}>Invite More Friends</Button>
                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Friends</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="mt-2">
                                <Form>
                                    <Form.Group className="mb-3" controlId="friendsEmails">
                                        <Form.Label>Add Friend's Emails Here</Form.Label>
                                        <Form.Control onChange={() => setShowError(false)} className={showError && "ring-2 ring-[#dc3545]"} as="textarea" rows={3} placeholder="Please seperate emails using a comma. You can always add more later." />
                                    </Form.Group>
                                    <p className={showError ? "text-[#dc3545]" : "invisible"}>Please check the entered emails and try again.</p>
                                    <Button style={{ backgrounddivor: "rgb(76,108,116)" }} onClick={onClick}>Add Friend(s)</Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-lg drop-shadow-2xl">
                    <h2>Comments</h2>
                    <div className="overflow-y-auto max-h-64 w-full">
                        {tripsComments.length > 0 ? tripsComments.map(comment => (
                            <div key={comment.id}>
                                <p>{comment.text}</p>
                                <p>-- {comment.user.user_name} at {new Date(comment.createdAt).toLocaleString()}</p>
                            </div>)) :
                            <p>No Comments Added Yet.</p>
                        }
                    </div>
                    <Form className="mt-4">
                        <Form.Group controlId="newComment">
                            <Form.Control type="text" placeholder="Add comment here" />
                            <Button onClick={onComment}>Add Comment</Button>
                        </Form.Group>
                    </Form>
                </div>
                <div className="bg-white p-10 rounded-lg drop-shadow-2xl">
                    <h2>Vote Here</h2>
                    <ReactVote onCreate={onCreate} onUpvote={onVote} onClose={onVote} onExpand={onVote} onDownvote={onVote} onReset={onVote} isAdmin={Admin} clientId={currentUser.email} data={thisTripData.voteData} />
                    <ShowButton />
                </div>
            </div>
        </div>
    )
}

export default SpecificTripPage;