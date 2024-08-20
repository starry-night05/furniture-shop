import Cart from "../models/Cart.js";
import Products from "../models/Products.js";
import Users from "../models/Users.js";
import { Op } from "sequelize";

// Menampilkan semua produk di keranjang
export const cartList = async (req, res) => {
    try {
        let response;
        if (req.role === 'user') {
            response = await Cart.findAll({
                attributes: ['id', 'userId', 'productId', 'qty', 'subtotal_price', 'subtotal_disc'],
                where: {
                    [Op.and]: [{
                        userId: req.userId
                    },
                    {
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
            // Jika keranjang tidak kosong
            if (response.length > 0) {
                res.status(200).json(response);
            } else { // Jika keranjang kosong
                res.status(422).json({ msg: "Tidak ada pembelian" });
            }
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Menambah produk ke dalam keranjang
export const addToCart = async (req, res) => {
    const getProduct = await Products.findOne({
        where: {
            id: req.params.id
        },
    });

    if (getProduct.stock === 0) return res.status(400).json({ msg: "Stok tidak tersedia" });
    let qty; // jumlah awal ketika user memesan product
    let subtotal_price = getProduct.price; // mengambil harga dari product yang dipesan
    let subtotal_disc = getProduct.discount; // mengambil diskon dari product yang dipesan
    let prdctId = getProduct.id; // mendapat dari productId yang dipesan

    let cartUser = await Cart.findAll({
        where: {
            [Op.and]: [{ userId: req.userId }, { productId: prdctId }, { status: 'checkin' }]
        }
    });

    try {
        if (req.role === 'user') {
            if (cartUser.length === 0) { // Jika produk tidak ada di keranjang
                qty = 1;
                await Cart.create({
                    userId: req.userId,
                    productId: prdctId,
                    qty: qty,
                    subtotal_price: subtotal_price,
                    subtotal_disc: subtotal_disc,
                    status: 'checkin'
                });
                res.status(200).json({ msg: "Pesanan ditambahkan ke keranjang" });
            } else { // jika sudah ada produk di keranjang
                const updateQty = await Cart.findOne({
                    where: {
                        [Op.and]: [{ userId: req.userId }, { productId: prdctId }, { status: 'checkin' }]
                    }
                });
                qty = updateQty.qty + 1;
                const product = await Products.findOne({
                    attributes: ['stock'],
                    where: {
                        id: prdctId
                    }
                });
                if (qty > product.stock) { // jika menambah produk yang sama, namun jumlah pesanan melebihi yang tersedia
                    return res.status(422).json({ msg: "Jumlah melebihi dari stok yang tersedia" });
                }
                await Cart.update({
                    qty: qty,
                    subtotal_price: subtotal_price * qty
                }, {
                    where: {
                        [Op.and]: [{ userId: req.userId }, { productId: prdctId }, { status: 'checkin' }]
                    }
                });
                res.status(200).json({ msg: "Jumlah pesanan diperbarui" });
            }
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Memperbarui jumlah pesanan
export const updateCartProduct = async (req, res) => {
    const cart = await Cart.findOne({
        where: {
            id: req.params.id
        }
    });
    const product = await Products.findOne({
        attributes: ['stock', 'price', 'discount'],
        where: {
            id: cart.productId
        }
    });
    const { qty } = req.body;
    const subtotal_price = product.price;
    if (qty > product.stock) return res.status(422).json({ msg: 'Jumlah pesanan melebihi stok yang tersedia' }) // jumlah melebihi stok yang tersedia
    try {
        await Cart.update({
            qty: qty,
            subtotal_price: subtotal_price * qty
        }, {
            where: {
                id: cart.id
            }
        });
        res.status(200).json({ msg: 'Pesanan telah diperbarui' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Menghapus produk dari keranjang
export const deleteCartProduct = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: {
                id: req.params.id
            }
        });
        await Cart.destroy({
            where: {
                [Op.and]: [{ id: cart.id }, { userId: req.userId }]
            }
        });
        res.status(200).json({ msg: "Pesanan berhasil dihapus" });
    } catch (error) {
        res.status(500).json(error.message);
    }
}