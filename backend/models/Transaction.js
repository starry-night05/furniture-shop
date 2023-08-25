import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Cart from "./Cart.js";
import Users from "./Users.js";

const { DataTypes } = Sequelize;

const Transaction = db.define('transactions', {
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
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
    total_qty: {
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
    acc_num: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    address: {
        type: DataTypes.TEXT,
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

// Relation between cart and transaction
Cart.hasOne(Transaction);
Transaction.belongsTo(Cart, { foreignKey: 'cartId' });

// Relation between user and transaction
Users.hasMany(Transaction);
Transaction.belongsTo(Users, { foreignKey: 'userId' });


export default Transaction;