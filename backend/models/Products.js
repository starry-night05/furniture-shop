import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Products = db.define('Products', {
    product_name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER
}, {
    freezeTableName: true
});

export default Products;