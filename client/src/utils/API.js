/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
  createTrip: function(tripData) {
    return axios.post("/api/trips/", tripData);
  },
  getAllTrips: function() {
    return axios.get("/api/trips/");
  },
  addAssociation: function(tripData) {
    return axios.post("/api/user/", tripData);
  },
};
