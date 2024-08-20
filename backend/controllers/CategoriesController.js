import Categories from "../models/Categories.js";
import path from "path"
import fs from "fs"

// Menampilkan kategori yang ada
export const categoryList = async (req, res) => {
    try {
        const response = await Categories.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// menampilkan kategori berdasarkan id_kategori
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

// menambahkan kategori
export const addCategory = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: 'Gambar belum ditambahkan' }); // jika gambar untuk kategori tidak ada
    const { category } = req.body;
    const cekCategory = await Categories.findOne({ // jika kategori sudah ada
        attributes: ['category'],
        where: {
            category: category
        }
    });
    if (cekCategory) return res.status(422).json({ msg: 'Kategori sudah ada dalam database' });
    const file = req.files.file;
    const size = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/categories/${fileName}`;
    const allowedType = ['.jpeg', '.jpg', '.png'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Ekstensi gambar tidak sesuai" });

    if (size > 5000000) return res.status(422).json({ msg: "Ukuran gambar maksimal 5MB" });

    file.mv(`./public/images/categories/${fileName}`, async (err) => { // memindahkan file gambar ke folder images/categories
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Categories.create({
                category: category,
                img: fileName,
                url: url
            });
            res.status(201).json({ msg: "Kategori barang berhasil ditambahkan" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    });
}

// Memperbarui kategori
export const updateCategory = async (req, res) => {
    const { category } = req.body;
    const categoryById = await Categories.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!categoryById) return res.status(404).json({ msg: "Kategori barang tidak valid" });
    let fileName = "";
    let url = "";
    if (req.files === null) {
        fileName = Categories.image;
        url = Categories.url;
    } else {
        const file = req.files.file;
        const size = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.jpeg', '.jpg', '.png', '.mp4', '.mp3'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Ekstensi gambar tidak sesuai" });

        if (size > 5000000) return res.status(422).json({ msg: "Ukuran gambar maksimal 5MB" });

        const filePath = `./public/images/categories/${categoryById.img}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/categories/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }
    url = `${req.protocol}://${req.get("host")}/images/categories/${fileName}`;

    try {
        await Categories.update({
            category: category,
            img: fileName,
            url: url
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Kategori barang berhasil diperbarui" });
    } catch (error) {
        console.log(error.message);
    }
}

// Menghapus kategori
export const removeCategory = async (req, res) => {
    const categories = await Categories.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!categories) return res.status(404).json({ msg: "Kategori barang tidak valid" });

    try {
        const filePath = `./public/images/categories/${categories.img}`;
        fs.unlinkSync(filePath);
        await Categories.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "Kategori barang berhasil dihapus" });
    } catch (error) {
        console.log(error.message);
    }
}