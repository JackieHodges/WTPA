const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_USER === "root") {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    },
  );
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER_AWS,
    process.env.DB_PASSWORD_AWS,
    {
      host: 'wtpa-database.cluster-cyk8et2xxhke.us-east-2.rds.amazonaws.com',
      dialect: 'mysql',
      port: 3306,
    },
  );
}

module.exports = sequelize;
