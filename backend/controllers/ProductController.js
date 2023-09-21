import Products from "../models/Products.js";
import Users from "../models/Users.js";
import Categories from "../models/Categories.js";
import path from 'path';
import fs from 'fs';

// Get all products
export const getProducts = async (req, res) => {
    try {
        const response = await Products.findAll({
            attributes: ['id', 'product_name', 'description', 'stock', 'image', 'url', 'price', 'discount'],
            include: [{
                model: Users,
                attributes: ['firstname', 'lastname', 'username']
            }, {
                model: Categories,
                attributes: ['category', 'img', 'url']
            }]
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// get products by category
export const getProductBycategory = async (req, res) => {
    try {
        const response = await Products.findAll({
            attributes: ['id', 'product_name', 'description', 'stock', 'image', 'url', 'price', 'discount'],
            include: [{
                model: Users,
                attributes: ['firstname', 'lastname', 'username']
            }, {
                model: Categories,
                attributes: ['category', 'img', 'url']
            }],
            where: {
                categoryId: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// Get Product by id
export const getProductById = async (req, res) => {
    try {
        const response = await Products.findOne({
            attributes: ['id', 'product_name', 'description', 'stock', 'image', 'url', 'price', 'discount'],
            include: [{
                model: Users,
                attributes: ['firstname', 'lastname', 'username']
            }, {
                model: Categories,
                attributes: ['category', 'img', 'url']
            }],
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// Create a new Product
export const createProduct = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: 'No File added' }); // if file didn't exist
    const { categoryId, product_name, description, stock, price, discount } = req.body;
    const file = req.files.file;
    const size = file.data.length;
    const ext = path.extname(file.name);
    const uniqueIdentifier = Date.now(); // Generate a unique identifier (timestamp)
    const fileName = `${file.md5}_${uniqueIdentifier}${ext}`; // Append the unique identifier to the file name
    const url = `${req.protocol}://${req.get("host")}/images/products/${fileName}`;
    const allowedType = ['.jpeg', '.jpg', '.png'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid image" }); // if the image is not in the allowed

    if (size > 200000000) return res.status(422).json({ msg: "Image must be less than 200MB" }); // if size is more than 200MB

    file.mv(`./public/images/products/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Products.create({
                categoryId: categoryId,
                userId: req.userId,
                product_name: product_name,
                description: description,
                stock: stock,
                image: fileName,
                url: url,
                price: price,
                discount: discount
            });
            res.status(201).json({ msg: "Product added successfully" });
        } catch (error) {
            console.log(error.message);
        }
    });
}

// update product
export const updateProduct = async (req, res) => {
    const product = await Products.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!product) return res.status(404).json({ msg: "Product didn't found" });

    let fileName = product.image; // Use the existing image filename

    if (req.files !== null) {
        const file = req.files.file;
        const size = file.data.length;
        const ext = path.extname(file.name);
        const baseName = path.basename(file.name, ext);

        // Generate a unique filename if the file already exists
        let counter = 1;
        let newFileName = fileName;
        while (fs.existsSync(`./public/images/products/${newFileName}`)) {
            newFileName = `${baseName}_${counter}${ext}`;
            counter++;
        }

        fileName = newFileName;

        const allowedTypes = ['.jpeg', '.jpg', '.png'];

        if (!allowedTypes.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid image" });

        if (size > 200000000) return res.status(422).json({ msg: "Image must be less than 200MB" });

        const filePath = `./public/images/products/${product.image}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/products/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    const { categoryId, product_name, description, stock, price, discount } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/products/${fileName}`;

    try {
        await Products.update({
            categoryId: categoryId,
            product_name: product_name,
            description: description,
            stock: stock,
            image: fileName, // Update the image filename
            url: url,
            price: price,
            discount: discount
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Product update successfully" });
    } catch (error) {
        console.log(error.message);
    }
}

// delete product
export const deleteProduct = async (req, res) => {
    const product = await Products.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "Product didn`t found" });

    try {
        const filePath = `./public/images/products/${product.image}`;
        fs.unlinkSync(filePath);
        await Products.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "Product has been deleted" });
    } catch (error) {
        console.log(error.message);
    }
}