import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Categories = db.define('categories', {
    category: DataTypes.STRING,
    img: DataTypes.TEXT,
    url: DataTypes.TEXT
}, {
    freezeTableName: true
});

export default Categories;