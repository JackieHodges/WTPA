/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
  createTrip: function(tripData) {
    return axios.post("/api/trips/", tripData);
  },
  getAllTrips: function() {
    return axios.get("/api/trips/");
  },
  getThisTrip: function(id) {
    return axios.get("/api/trips/" + id);
  },
  getTripComments: function(id) {
    return axios.get("/api/comment/" + id);
  },
  addNewComment: function(commentData) {
    return axios.post("/api/comment/", commentData);
  },
  getMyTrips: function(id) {
    return axios.get("/api/user/" + id);
  },
  addAssociation: function(tripData) {
    return axios.post("/api/user/associate/", tripData);
  },
  deleteFriend: function(userData) {
    return axios.delete("/api/user/delete/" + userData);
  },
  findOrCreateUser: function(userData) {
    return axios.post("/api/user/find/", userData)
  },
  findOrCreateFriend: function(userData) {
    return axios.post("/api/user/friend/", userData)
  },
  setVote: function(voteData) {
    return axios.put("/api/trips/vote/", voteData)
  },
  isAdmin: function(userData){
    return axios.post("/api/user/admin/", userData)
  }
};
