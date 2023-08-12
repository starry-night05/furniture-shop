import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./Users.js";
import Products from "./Products.js";

const { DataTypes } = Sequelize;

const Transactions = db.define('transactions', {
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
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    subtotal_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    total_disc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    payment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    freezeTableName: true
});

Users.hasMany(Transactions);
Transactions.belongsTo(Users, { foreignKey: 'userId' });

Products.hasOne(Transactions);
Transactions.belongsTo(Products, { foreignKey: 'productId' });

export default Transactions;