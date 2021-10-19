const sequelize = require('../config/connection');
const { User, Trip, Traveller, Comment } = require('../models');

const userData = require('./userData.json');
const tripData = require('./tripData.json');
const travellerData = require('./travellerData.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);

  await Trip.bulkCreate(tripData);

  await Traveller.bulkCreate(travellerData);

  await Comment.bulkCreate(commentData);
  
  process.exit(0);
};

seedDatabase();

