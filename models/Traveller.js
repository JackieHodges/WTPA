const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Traveller extends Model { }

Traveller.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
                unique: true
            }
        },
        tripId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'trip',
                key: 'id',
                unique: true
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'traveller'
    }
);

module.exports = Traveller;