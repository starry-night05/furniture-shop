import Transaction from "../models/Transaction.js";
import Cart from "../models/Cart.js";
import Users from "../models/Users.js";
import Products from "../models/Products.js";
import { Op } from "sequelize";


// User
export const checkoutList = async (req, res) => {
    let response;
    if (req.role == "admin") return res.status(422).json({ msg: 'Lu admin ngapa kepoin transaksi orang' })
    try {
        let products = await Products.findAll({
            attributes: ['id', 'product_name', 'image', 'url', 'price', 'discount']
        });

        // Extract productIds from products
        const productIds = products.map(product => product.id);

        // Find the corresponding cart entries for the products
        let carts = await Cart.findAll({
            where: {
                [Op.and]: [{ productId: productIds }, { userId: req.userId }, { status: 'checkout' }]
            }
        });

        // Extract cartIds from carts
        const cartIds = carts.map(cart => cart.id);

        // Find transactions associated with the cartIds
        response = await Transaction.findAll({
            where: {
                [Op.and]: [{ cartId: cartIds }, { userId: req.userId }]
            },
            include: [
                {
                    model: Users,
                    attributes: ['id', 'firstname', 'lastname', 'email', 'tlp']
                },
                {
                    model: Cart,
                    attributes: ['id', 'subtotal_price', 'subtotal_disc'],
                    include: [
                        {
                            model: Products,
                            attributes: ['id', 'product_name', 'price', 'discount']
                        }
                    ]
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(422).json({ msg: error.message });
    }
}

export const confirmOrder = async (req, res) => {
    const { total_price, total_disc, total_qty, payment, acc_num, address } = req.body;

    const cart = await Cart.findAll({
        attributes: ['id'],
        where: {
            userId: req.userId,
            status: 'checkin'
        }
    });
    try {
        for (const cartItem of cart) {
            const totalItem = cartItem.id;
            await Transaction.create({
                cartId: totalItem,
                userId: req.userId,
                total_price: total_price,
                total_disc: total_disc,
                total_qty: total_qty,
                payment: payment,
                acc_num: acc_num,
                address: address,
                status: 'pending'
            });
            await Cart.update(
                { status: 'checkout' },
                {
                    where: {
                        id: totalItem
                    }
                }
            );
        }
        res.status(200).json({ msg: 'Pembelian berhasil dipesan, mohon tunggu konfirmasi dari kami' });
    } catch (error) {
        res.status(500).json({ msg: 'Pembelian gagal' });
    }
}

export const cancelOrder = async (req, res) => {
    const cekStatus = await Transaction.findOne({
        attributes: ['id', 'status'],
        where: {
            [Op.and]: [{ id: req.params.id, userId: req.userId }]
        }
    });
    if (cekStatus.status === 'shipping') return res.status(422).json({ msg: 'Pesanan tidak dapat dibalkan karena pesanan sedang diantar' });
    try {
        await Transaction.update({
            status: 'cancel'
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: 'Pesanan telah dibatalkan' });
    } catch (error) {
        res.status(422).json({ msg: error.message });
    }
}

export const receiveOrder = async (req, res) => {
    const cekStatus = await Transaction.findOne({
        attributes: ['id', 'status'],
        where: {
            [Op.and]: [{ id: req.params.id, userId: req.userId }]
        }
    });
    if (cekStatus.status === 'recieving') {
        try {
            await Transaction.update({
                status: 'recieved',
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ msg: 'Pesanan telah diterima' });
        } catch (error) {
            res.status(422).json({ msg: error.message });
        }
    }
}

// Admin
export const getAllTransactions = async (req, res) => {
    let response;
    try {
        let products = await Products.findAll({
            attributes: ['id', 'product_name', 'image', 'url', 'price', 'discount']
        });

        // Extract productIds from products
        const productIds = products.map(product => product.id);

        // Find the corresponding cart entries for the products
        let carts = await Cart.findAll({
            where: {
                productId: productIds
            }
        });

        // Extract cartIds from carts
        const cartIds = carts.map(cart => cart.id);

        // Find transactions associated with the cartIds
        response = await Transaction.findAll({
            where: {
                cartId: cartIds
            },
            include: [
                {
                    model: Users,
                    attributes: ['id', 'firstname', 'lastname', 'email', 'tlp']
                },
                {
                    model: Cart,
                    attributes: ['id', 'subtotal_price', 'subtotal_disc', 'qty'],
                    include: [
                        {
                            model: Products,
                            attributes: ['id', 'product_name', 'price', 'discount']
                        }
                    ]
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(422).json({ msg: error.message });
    }
}

export const confirm = async (req, res) => {
    try {
        await Transaction.update({
            status: 'confirmed'
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: 'Pesanan telah dikonfirmasi' });
    } catch (error) {
        res.status(422).json({ msg: error.message });
    }
}

export const cancel = async (req, res) => {
    try {
        await Transaction.update({
            status: 'cancel'
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: 'Pesanan telah dibatalkan' });
    } catch (error) {
        res.status(422).json({ msg: error.message });
    }
}

export const shipping = async (req, res) => {
    try {
        await Transaction.update({
            status: 'shipping'
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: 'Pesanan telah diantar ke alamat anda' });
    } catch (error) {
        res.status(422).json({ msg: error.message });
    }
}

export const receive = async (req, res) => {
    const cekStatus = await Transaction.findOne({
        attributes: ['id', 'status'],
        where: {
            id: req.params.id
        }
    });
    if (cekStatus.status === 'shipping') {
        try {
            await Transaction.update({
                status: 'recieving',
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ msg: 'Pesanan telah diterima pembeli' });
        } catch (error) {
            res.status(422).json({ msg: error.message });
        }
    }
}