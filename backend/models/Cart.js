import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./Users.js";
import Products from "./Products.js";

const { DataTypes } = Sequelize;

const Cart = db.define('cart', {
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
    subtotal_disc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'checkin',
        validate: {
            notEmpty: true,
        }
    },
}, {
    freezeTableName: true
});

Users.hasOne(Cart);
Cart.belongsTo(Users, { foreignKey: 'userId' });

Products.hasMany(Cart);
Cart.belongsTo(Products, { foreignKey: 'productId' });

export default Cart;