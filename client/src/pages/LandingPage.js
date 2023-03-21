import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import API from "../utils/API";
import { UserContext } from "../utils/UserContext";
import MyTripsPage from "./MyTripsPage";

function LandingPage() {

    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [myTrips, setMyTrips] = useState([])

    useEffect(() => {
        if (user) {
            saveUser()
        }
    }, [user])

    // find or create the user, and set it as the current user 
    function saveUser() {
        API.findOrCreateUser({
            name: user.name,
            auth_o_id: user.sub,
            email: user.email
        })
            .then(res => setCurrentUser(res.data[0]))
    }

    // conditional component that changes once the user is authenticated
    function ButtonChoice() {
        if (isAuthenticated) {
            return <div className="container">
                <MyTripsPage userId={currentUser.id} />
            </div>

        } else {
            return (
                <div className="container">
                    <div className="flex flex-col items-stretch absolute inset-1/4">
                        <div className="bg-white p-10 rounded-lg drop-shadow-2xl">
                            <h1>Where's The Party At?</h1>
                            <h5>In need of a vacation? Having a hard time coordinating with a large group?</h5>
                            <h6>This app allows you to gather, plan, and finally execute your long-talked-about trip or event. </h6>
                            <div className="d-grid mt-4">
                            <Button size="lg"  onClick={loginWithRedirect}>Get Started</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="container">
            <ButtonChoice />
        </div>

    )
}

export default LandingPage;