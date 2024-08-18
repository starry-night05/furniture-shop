import Users from "../models/Users.js";
import Cart from "../models/Cart.js";
import Products from "../models/Products.js";
import Transaction from "../models/Transaction.js";
import Reviews from "../models/Reviews.js";
import { Op } from "sequelize";
import path from 'path';
import fs from 'fs';

// user
export const reviewsByProduct = async (req, res) => {
    try {
        const reviews = await Reviews.findAll({
            attributes: ['id', 'rate', 'review', 'media', 'url'],
            include: [
                {
                    model: Users,
                    attributes: ['id', 'firstname', 'lastname']
                },
                {
                    model: Products,
                    attributes: ['id', 'product_name']
                }
            ],
            where: {
                productId: req.params.id
            }
        });
        if (reviews.length > 0) {
            res.status(200).json(reviews);
        } else {
            res.status(400).json({ msg: 'Jadilah pembeli pertama' });
        }
    } catch (error) {
        res.status(422).json({ msg: error.message });
    }
}

export const review = async (req, res) => {
    try {
        const { prId, rate, review } = req.body; // Ubah reviewColom menjadi review

        // Mencari transaksi berdasarkan userId dan status dengan join ke tabel Cart untuk memeriksa productId
        const findTransaction = await Transaction.findOne({
            attributes: ['id', 'userId', 'cartId'],
            where: {
                [Op.and]: [{ userId: req.userId }, { status: 'recieved' }]
            },
            include: [
                {
                    model: Cart,
                    attributes: ['id', 'userId', 'productId'],
                    where: {
                        userId: req.userId,
                        productId: prId
                    }
                }
            ]
        });
        if (!findTransaction) {
            return res.status(404).json({ msg: 'Transaksi tidak ditemukan' });
        }

        const reviewStat = await Reviews.findOne({
            where: {
                [Op.and]: [{ userId: req.userId }, { productId: prId }, { transactionId: findTransaction.id }]
            }
        });
        if (reviewStat) {
            return res.status(400).json({
                msg: 'Anda sudah memberi ulasan untuk transaksi ini'
            });
        }

        const file = req.files.file;
        const size = file.data.length;
        const ext = path.extname(file.name).toLowerCase(); // Ekstensi file
        const uniqueIdentifier = Date.now(); // Generate a unique identifier (timestamp)
        const fileName = `${file.md5}_${uniqueIdentifier}${ext}`; // Append the unique identifier to the file name

        // Tentukan URL berdasarkan tipe file
        let url;
        const allowedType = ['.jpeg', '.jpg', '.png', '.mp4'];
        if (ext === '.mp4') {
            url = `${req.protocol}://${req.get("host")}/videos/reviews/${fileName}`;
        } else if (['.jpeg', '.jpg', '.png'].includes(ext)) {
            url = `${req.protocol}://${req.get("host")}/images/reviews/${fileName}`;
        } else {
            return res.status(422).json({ msg: "File harus berekstensi .jpeg, .jpg, .png, atau .mp4" });
        }

        // Validasi ukuran file
        if (size > 20000000) {
            return res.status(422).json({ msg: "Ukuran file maksimal 20mb" });
        }

        // Simpan ulasan ke dalam database
        await Reviews.create({
            userId: req.userId,
            productId: prId,
            transactionId: findTransaction.id,
            rate: rate,
            review: review, // Pastikan nama field ini sama dengan nama kolom di model
            media: fileName,
            url: url
        });

        res.status(200).json({ msg: 'Ulasan terkirim' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const editReview = async (req, res) => {
    try {
        const { rate, review } = req.body; // Mengambil data rate dan review dari body request

        const file = req.files ? req.files.file : null; // Mengecek apakah ada file yang diunggah
        let fileName, url;

        if (file) {
            const size = file.data.length;
            const ext = path.extname(file.name).toLowerCase(); // Ekstensi file
            const uniqueIdentifier = Date.now(); // Generate a unique identifier (timestamp)
            fileName = `${file.md5}_${uniqueIdentifier}${ext}`; // Tambahkan unique identifier ke nama file

            // Tentukan URL berdasarkan tipe file
            const allowedType = ['.jpeg', '.jpg', '.png', '.mp4'];
            if (ext === '.mp4') {
                url = `${req.protocol}://${req.get("host")}/videos/reviews/${fileName}`;
            } else if (allowedType.includes(ext)) {
                url = `${req.protocol}://${req.get("host")}/images/reviews/${fileName}`;
            } else {
                return res.status(422).json({ msg: "File harus berekstensi .jpeg, .jpg, .png, atau .mp4" });
            }

            // Validasi ukuran file
            if (size > 20000000) {
                return res.status(422).json({ msg: "Ukuran file maksimal 20MB" });
            }

            // Simpan file ke server
            if (ext === '.mp4') {
                file.mv(`./public/videos/reviews/${fileName}`);
            } else {
                file.mv(`./public/images/reviews/${fileName}`);
            }
        }

        // Update ulasan di dalam database
        const updateData = {
            rate: rate,
            review: review,
        };

        // Jika ada file yang diunggah, tambahkan media dan url ke updateData
        if (file) {
            updateData.media = fileName;
            updateData.url = url;
        }

        await Reviews.update(updateData, {
            where: {
                userId: req.userId,
                id: req.params.id
            }
        });

        res.status(200).json({ msg: 'Ulasan berhasil diedit' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteReview = async (req, res) => {
    const findTransaction = await Transaction.findOne({
        attributes: ['id', 'userId', 'cartId'],
        where: {
            [Op.and]: [{ userId: req.userId }, { status: 'recieved' }]
        }
    });
    const review = await Reviews.findOne({
        where: {
            [Op.and]: [{ id: req.params.id }, { userId: req.userId }, { transactionId: findTransaction.id }]
        }
    });
    if (!review) return res.status(404).json({ msg: 'Ulasan tidak ditemukan!' });
    try {
        await Reviews.destroy({
            where: {
                [Op.and]: [{ id: review.id }, { userId: req.userId }]
            }
        });
        res.status(200).json({ msg: 'Ulasan berhasil dihapus!' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}