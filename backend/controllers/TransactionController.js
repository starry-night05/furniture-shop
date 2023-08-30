import Transaction from "../models/Transaction.js";
import Cart from "../models/Cart.js";
import Users from "../models/Users.js";
import Products from "../models/Products.js";
import { Op } from "sequelize";

export const checkoutList = async (req, res) => {
    let response;
    try {
        let transactions = await Transaction.findAll({
            attributes: ['id', 'cartId', 'userId', 'total_price', 'total_disc', 'total_qty', 'payment', 'address', 'status'],
            where: {
                [Op.and]: [{ userId: req.userId }, { status: 'pending' }]
            }
        });

        // Extract cartIds from transactions
        const cartIds = transactions.map(transaction => transaction.cartId);

        let carts = await Cart.findAll({
            where: {
                [Op.and]: [{ id: cartIds }, { userId: req.userId }]
            }
        });

        // Extract productIds from carts
        const productIds = carts.map(cart => cart.productId);

        response = await Products.findAll({
            where: {
                id: productIds
            }
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

export const getAllTransactions = async (req, res) => {
    let response;
    try {
        let transactions = await Transaction.findAll({
            attributes: ['id', 'cartId', 'userId', 'total_price', 'total_disc', 'total_qty', 'payment', 'address', 'status']
        });

        // Extract cartIds from transactions
        const cartIds = transactions.map(transaction => transaction.cartId);

        let carts = await Cart.findAll({
            where: {
                id: cartIds
            }
        });

        // Extract productIds from carts
        const productIds = carts.map(cart => cart.productId);

        response = await Products.findAll({
            where: {
                id: productIds
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(422).json({ msg: error.message });
    }
}