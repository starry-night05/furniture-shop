import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Products = db.define('products', {
    // categoryId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    product_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER
}, {
    freezeTableName: true
});

export default Products;