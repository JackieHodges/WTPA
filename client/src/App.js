import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import "react-bootstrap"
import NavBar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewTripPage from './pages/NewTripPage';
import HomePage from './pages/HomePage';
import { UserContext } from './utils/UserContext';


function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <NavBar />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/newTrip" component={NewTripPage} />
          <Route exact path="/home" component={HomePage} />
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
