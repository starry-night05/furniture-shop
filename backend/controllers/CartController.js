import Cart from "../models/Cart.js";
import Products from "../models/Products.js";
import Users from "../models/Users.js";
import { Op } from "sequelize";

// Get all products
export const cartList = async (req, res) => {
    try {
        let response;
        // if (req.role === 'user') {
        response = await Cart.findAll({
            attributes: ['id', 'userId', 'productId', 'qty', 'subtotal_price', 'subtotal_disc'],
            where: {
                [Op.and]: [{
                    userId: req.params.id,
                    status: 'checkin'
                }]
            },
            include: [{
                model: Users,
                attributes: ['id', 'firstname', 'lastname', 'email', 'tlp', 'address']
            }, {
                model: Products,
                attributes: ['product_name', 'image', 'url', 'price', 'discount']
            }]
        });
        // }
        // Jika keranjang tidak kosong
        if (response.length > 0) {
            res.status(200).json(response);
        } else { // Jika keranjang kosong
            res.status(422).json({ msg: "Cart is empty, please order some product" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// add product to cart
export const addToCart = async (req, res) => {
    const getProduct = await Products.findOne({
        where: {
            id: req.params.id
        },
    });
    let qty = 1; // quantity defualt ketika user memesan product
    let subtotal_price = getProduct.price; // mengambil harga dari product yang dipesan
    let subtotal_disc = getProduct.discount; // mengambil diskon dari product yang dipesan
    let prdctId = getProduct.id; // mendapat dari productId yang dipesan

    let cartUser = await Cart.findAll({
        where: {
            [Op.and]: [{ userId: 1 }, { productId: prdctId }, { status: 'checkin' }]
        }
    });

    try {
        if (cartUser.length === 0) { // Check if no cart items were found
            await Cart.create({
                userId: 1,
                productId: prdctId,
                qty: qty,
                subtotal_price: subtotal_price,
                subtotal_disc: subtotal_disc,
                status: 'checkin'
            });
            res.status(200).json({ msg: "Products added to cart" });
        } else { // If cart items were found
            res.status(500).json({ msg: 'Product already in cart' });
        }
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
        const cart = await Cart.findOne({
            where: {
                id: req.params.id
            }
        });
        await Cart.destroy({
            where: {
                [Op.and]: [{ id: cart.id }, { userId: 2 }]
            }
        });
        res.status(200).json({ msg: "Product removed from cart" });
    } catch (error) {
        res.status(500).json(error.message);
    }
}