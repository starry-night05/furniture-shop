import Wishlist from '../models/Wishlist.js'
import Products from '../models/Products.js'
import Categories from '../models/Categories.js';
import { Op } from 'sequelize';

export const WishList = async (req, res) => {
    let response;
    try {
        response = await Wishlist.findAll({
            where: {
                userId: req.userId
            },
            include: [{
                model: Products,
                attributes: ['id', 'product_name', 'image', 'url', 'price', 'discount'],
                include: [{
                    model: Categories,
                    attributes: ['category']
                }]
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(422).json({ msg: error.message });
    }
}

export const addToWishlist = async (req, res) => {
    const product = await Products.findOne({
        where: {
            id: req.params.id
        }
    });
    let productId = product.id;
    const cekWishlist = await Wishlist.findAll({
        where: {
            [Op.and]: [{ userId: req.userId }, { productId: productId }]
        }
    });
    if (cekWishlist.length === 1) return res.status(422).json({ msg: 'produk sudah ada dalam wishlist' });
    try {
        await Wishlist.create({
            userId: req.userId,
            productId: productId
        });
        res.status(200).json({ msg: 'Produk berhasil ditambah ke wishlist' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const removeFromWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({
            where: {
                id: req.params.id
            }
        });
        await Wishlist.destroy({
            where: {
                [Op.and]: [{ id: wishlist.id }, { userId: req.userId }]
            }
        });
        res.status(200).json({ msg: 'berhasil menghapus wishlist' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}