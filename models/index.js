const User = require("./User");
const Trip = require('./Trip');
const Traveller = require("./Traveller");



// User.belongsToMany(Recipes, { through: Favorite });
// Recipes.belongsToMany(User, { through: Favorite });

User.belongsToMany(Trip, { through: Traveller });
Trip.belongsToMany(User, { through: Traveller });
  
  User.hasMany(Traveller);
  Traveller.belongsTo(User);
  Trip.hasMany(Traveller);
  Traveller.belongsTo(Trip);


module.exports = { User, Trip, Traveller };
