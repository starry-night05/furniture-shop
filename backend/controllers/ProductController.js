import Products from "../models/Products.js";
import Users from "../models/Users.js";
import Categories from "../models/Categories.js";
import path from 'path';
import fs from 'fs';
import Reviews from "../models/Reviews.js";

// Menampilkan semua produk
export const getProducts = async (req, res) => {
    try {
        const response = await Products.findAll({
            attributes: ['id', 'product_name', 'description', 'stock', 'image', 'url', 'price', 'discount'],
            include: [{
                model: Categories
            }]
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// Menampilkan semua produk berdasarkan kategori
export const getProductBycategory = async (req, res) => {
    try {
        const response = await Products.findAll({
            attributes: ['id', 'product_name', 'description', 'stock', 'image', 'url', 'price', 'discount'],
            include: [
                {
                    model: Categories,
                    attributes: ['id', 'category', 'img', 'url']
                }
            ],
            where: {
                categoryId: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// Menampilkan produk berdasarkan id_produk
export const getProductById = async (req, res) => {
    try {
        const response = await Products.findOne({
            attributes: ['id', 'product_name', 'description', 'stock', 'image', 'url', 'price', 'discount'],
            include: [
                {
                    model: Categories,
                    attributes: ['id', 'category', 'img', 'url']
                }, {
                    model: Reviews,
                    attributes: ['rate', 'review', 'media', 'url']
                }
            ],
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// Menambah produk baru
export const createProduct = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: 'Gambar belum ditambahkan' });
    const { categoryId, product_name, description, stock, price, discount } = req.body;
    const file = req.files.file;
    const size = file.data.length;
    const ext = path.extname(file.name);
    const uniqueIdentifier = Date.now(); // mengambil tanggal jika ada gambar yang mempunyai nama yang sama
    const fileName = `${file.md5}_${uniqueIdentifier}${ext}`; // menggabungkan nama dan tanggal untuk menghindari penamaan file yang sama
    const url = `${req.protocol}://${req.get("host")}/images/products/${fileName}`;
    const allowedType = ['.jpeg', '.jpg', '.png'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Ekstensi gambar tidak sesuai" });

    if (size > 5000000) return res.status(422).json({ msg: "Ukuran gambar maksimal 5MB" });

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
            res.status(201).json({ msg: "Produk berhasil ditambahkan" });
        } catch (error) {
            console.log(error.message);
        }
    });
}

// Memperbarui data produk
export const updateProduct = async (req, res) => {
    const product = await Products.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "Produk tidak ada" });

    let fileName = product.image; // Mendapatkan gambar dari data sebelum diubah

    if (req.files !== null) { // Jika memperbarui gambar
        const file = req.files.file;
        const size = file.data.length;
        const ext = path.extname(file.name);
        const baseName = path.basename(file.name, ext);

        // Membuat pencegahan nama yang sama
        let counter = 1;
        let newFileName = fileName;
        while (fs.existsSync(`./public/images/products/${newFileName}`)) {
            newFileName = `${baseName}_${counter}${ext}`;
            counter++;
        }
        fileName = newFileName; // mengganti file yang lama dengan yang baru

        const allowedTypes = ['.jpeg', '.jpg', '.png'];

        if (!allowedTypes.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Ekstensi gambar tidak sesuai" });

        if (size > 5000000) return res.status(422).json({ msg: "Ukuran gambar maksimal 5MB" });

        const filePath = `./public/images/products/${product.image}`;
        fs.unlinkSync(filePath); // Menghapus gambar yang lama pada folder images/products

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
            image: fileName,
            url: url,
            price: price,
            discount: discount
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Data produk berhasil diperbarui" });
    } catch (error) {
        console.log(error.message);
    }
}

// Menghapus produk
export const deleteProduct = async (req, res) => {
    const product = await Products.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "Produk tidak ada" });

    try {
        const filePath = `./public/images/products/${product.image}`;
        fs.unlinkSync(filePath); // Menghapus gambar pada folder images/products
        await Products.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "Produk berhasil dihapus" });
    } catch (error) {
        console.log(error.message);
    }
}