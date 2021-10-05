import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import "react-bootstrap"
import NavBar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewTripPage from './pages/NewTripPage';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/newTrip" component={NewTripPage} />
      </Router>
    </div>
  );
}

export default App;
