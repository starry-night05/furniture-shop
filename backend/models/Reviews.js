import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./Users.js";
import Products from "./Products.js";
import Transaction from "./Transaction.js";

const { DataTypes } = Sequelize;

const Reviews = db.define('reviews', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    media: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    freezeTableName: true
});

Users.hasMany(Reviews)
Reviews.belongsTo(Users, { foreignKey: 'userId' });

Products.hasMany(Reviews)
Reviews.belongsTo(Products, { foreignKey: 'productId' });

Transaction.hasMany(Reviews, { foreignKey: 'transactionId' });
Reviews.belongsTo(Transaction, { foreignKey: 'transactionId' });

export default Reviews;