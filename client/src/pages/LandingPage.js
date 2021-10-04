import React, { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

function LandingPage() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Where's The Party At?</h2>
                    <h5>In need of a vacation? Having a hard time coordinating with a large group?</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h7>This app allows you to gather, plan, and finally execute your long-talked-about trip or event. </h7>
                </Col>
            </Row>
            <Button onClick={handleShow}>Get Started</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>WTPA</Modal.Title>
                </Modal.Header>
                <Modal.Body>Which of the following would you like to do?:</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Find a trip
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Start a trip
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>

    )
}

export default LandingPage;