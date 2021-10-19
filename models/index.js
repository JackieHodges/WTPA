const User = require("./User");
const Trip = require('./Trip');
const Traveller = require("./Traveller");
const Comment = require("./Comment");

User.belongsToMany(Trip, { through: Traveller });
Trip.belongsToMany(User, { through: Traveller });

User.hasMany(Traveller);
Traveller.belongsTo(User);
Trip.hasMany(Traveller);
Traveller.belongsTo(Trip);

Comment.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(Trip);
Trip.hasMany(Comment);


module.exports = { User, Trip, Traveller, Comment };
