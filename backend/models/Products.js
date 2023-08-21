import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./Users.js";
import Categories from "./Categories.js";

const { DataTypes } = Sequelize;

const Products = db.define('products', {
    categoryId: {
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
    product_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    image: DataTypes.TEXT,
    url: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER
}, {
    freezeTableName: true
});

Users.hasMany(Products);
Products.belongsTo(Users, { foreignKey: 'userId' });

Categories.hasMany(Products);
Products.belongsTo(Categories, { foreignKey: 'categoryId' });

export default Products;