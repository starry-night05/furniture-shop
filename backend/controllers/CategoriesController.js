import Categories from "../models/Categories.js";
import path from "path"
import fs from "fs"

export const categoryList = async (req, res) => {
    try {
        const response = await Categories.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}
export const getCategoryById = async (req, res) => {
    try {
        const response = await Categories.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const addCategory = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: 'No File added' });
    const category = req.body;
    const file = req.files.file;
    const size = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/categories/${fileName}`;
    const allowedType = ['.jpeg', '.jpg', '.png', '.mp4', '.mp3'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid image" });

    if (size > 200000000) return res.status(422).json({ msg: "Image must be less than 200MB" });

    file.mv(`./public/images/categories/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Products.create({
                category: category,
                img: fileName,
                url: url
            });
            res.status(201).json({ msg: "Category added successfully" });
        } catch (error) {
            res.status(500).json({ msg: "Error adding category" });
        }
    });
}
export const updateCategory = async (req, res) => {
    const category = await Categories.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!category) return res.status(404).json({ msg: "Not found" });
    let fileName = "";
    if (req.files === null) {
        fileName = Categories.image;
    } else {
        const file = req.files.file;
        const size = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.jpeg', '.jpg', '.png', '.mp4', '.mp3'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid image" });

        if (size > 200000000) return res.status(422).json({ msg: "Image must be less than 200MB" });

        const filePath = `./public/images/categories/${category.img}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/categories/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    const categoryName = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Products.update({
            category: categoryName,
            img: fileName,
            url: url
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Category updated successfully" });
    } catch (error) {
        console.log(error.message);
    }
}
export const removeCategory = async (req, res) => {
    const categories = await Categories.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!categories) return res.status(404).json({ msg: "Not found" });

    try {
        const filePath = `./public/images/categories/${categories.image}`;
        fs.unlinkSync(filePath);
        await Categories.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "Category has been removed" });
    } catch (error) {
        console.log(error.message);
    }
}