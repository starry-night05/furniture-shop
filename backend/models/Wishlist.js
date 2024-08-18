import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./Users.js";
import Products from "./Products.js";

const { DataTypes } = Sequelize;

const Wishlist = db.define('wishlist', {
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
    }
}, {
    freezeTableName: true
});

Users.hasOne(Wishlist)
Wishlist.belongsTo(Users, { foreignKey: 'userId' });

Products.hasMany(Wishlist);
Wishlist.belongsTo(Products, { foreignKey: 'productId' });

export default Wishlist;