import Cart from "../models/Cart.js";
import Products from "../models/Products.js";
import Users from "../models/Users.js";
import Transaction from "../models/Transaction.js";
import { Op } from "sequelize";

// Get all products
export const cartList = async (req, res) => {
    try {
        let response;
        if (req.role === 'user') {
            response = await Cart.findAll({
                attributes: ['id', 'userId', 'productId', 'qty', 'subtotal_price', 'subtotal_disc'],
                where: {
                    [Op.and]: [{
                        userId: req.userId,
                        status: 'checkin'
                    }]
                },
                include: [{
                    model: Users, Products,
                    attributes: ['id', 'firstname', 'lastname', 'email', 'tlp', 'address', 'product_name', 'img', 'url', 'price', 'discount']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Create a new Product
export const addToCart = async (req, res) => {
    let qty;
    let subtotal_price;
    let subtotal_disc;
    try {
        // Cek apakah sudah ada product di dalam cart
        const cart = await Cart.findAll({
            // Mengambil data cart berdasarkan user id dan status
            where: {
                [Op.and]: [{
                    userId: req.userId,
                    status: 'checkin'
                }]
            }
        });
        if (!cart) {
            qty = 1;
            const getProduct = await Products.findOne({
                where: {
                    id: req.params.id
                },
            });
            subtotal_price = getProduct.price;
            subtotal_disc = getProduct.disc;
            await Cart.create({
                userId: req.userId,
                productId: req.productId,
                qty: qty,
                subtotal_price: subtotal_price,
                subtotal_disc: subtotal_disc,
                status: 'checkin'
            });
        }
        res.status(200).json({ msg: "Products added to cart" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Update quantity
export const updateCartProduct = async (req, res) => {
    let subtotal_disc;
    try {
        const product = await Products.findOne({
            where: {
                id: req.params.id
            }
        });
        const qty = req.body;
        if (qty <= product.stock) {
            const subtotal_price = product.price * qty;
            if (product.id === req.params.id) {
                subtotal_disc = product.disc;
            } else {
                subtotal_disc = product.disc * qty;
            }
            await Products.update({
                qty,
                subtotal_price,
                subtotal_disc
            });
            res.status(200).json({
                msg: 'Product updated successfully'
            });
        } else {
            res.status(400).json({ msg: "Order quantity exceeds available stock" });
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// delete product from cart
export const deleteCartProduct = async (req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                id: req.params.id
            }
        });
        await Products.destroy({
            where: {
                [Op.and]: [{ id: product.id }, { userId: req.userId }]
            }
        });
        res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// checkout product from cart
export const confirmOrder = async (req, res) => {
    const { total_price, total_disc, payment, address } = req.body;
    const cartId = result.Cart.id;
    try {
        if (address === null || address === '') {
            res.status(422).json({ msg: "Address can`t be empty" });
        }
        await Transaction.create({
            cartId: cartId,
            userId: req.userId,
            total_price: total_price,
            total_disc: total_disc,
            payment: payment,
            address: address,
            status: 'pending'
        });
        res.status(200).json({ msg: 'Checkout successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
}