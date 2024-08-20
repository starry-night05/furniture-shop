import Transaction from "../models/Transaction.js";
import Cart from "../models/Cart.js";
import Users from "../models/Users.js";
import Products from "../models/Products.js";
import { Op } from "sequelize";
// import { response } from "express";


// User
// Menampilkan transaksi
export const checkoutList = async (req, res) => {
    let response;
    if (req.role == "admin") return res.status(422).json({ msg: 'Tidak dapat mengakses' })
    try {
        let products = await Products.findAll({
            attributes: ['id', 'product_name', 'image', 'url', 'price', 'discount']
        });

        // Mendapatkan id_produk dari semua produk
        const productIds = products.map(product => product.id);

        // Mencari produk yang ada di dalam keranjang berdasakan pengguna
        let carts = await Cart.findAll({
            where: {
                [Op.and]: [{ productId: productIds }, { userId: req.userId }, { status: 'checkout' }]
            }
        });

        // Mendapatkan id_cart dari semua keranjang (cart)
        const cartIds = carts.map(cart => cart.id);

        // Mencari transaksi berdasakan pengguna dan id_cart
        response = await Transaction.findAll({
            attributes: ['total_price', 'total_disc', 'total_qty', 'payment', 'address', 'status'],
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
        if (response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(400).json({ msg: 'Tidak ada transaksi' });
        }
    } catch (error) {
        res.status(422).json({ msg: error.message });
    }
}

// konfirmasi pesanan
export const confirmOrder = async (req, res) => {
    const { payment, acc_num, address } = req.body;

    try {
        const cartItems = await Cart.findAll({
            where: {
                userId: req.userId,
                status: 'checkin'
            }
        });

        // Menghitung total harga, diskon, dan kuantitas
        const total_price = cartItems.reduce((sum, item) => sum + item.subtotal_price, 0);
        const total_disc = cartItems.reduce((sum, item) => sum + item.subtotal_disc, 0);
        const total_qty = cartItems.reduce((sum, item) => sum + item.qty, 0);

        for (const cartItem of cartItems) {
            const product = await Products.findOne({
                where: { id: cartItem.productId }
            });

            if (product) {
                const updatedStock = product.stock - cartItem.qty; // Mengurangi stok produk berdasarkan qty di keranjang
                await Products.update(
                    { stock: updatedStock },
                    { where: { id: product.id } }
                );

                await Transaction.create({
                    cartId: cartItem.id,
                    userId: req.userId,
                    total_price: total_price,
                    total_disc: total_disc,
                    total_qty: total_qty,
                    payment: payment,
                    acc_num: acc_num,
                    address: address,
                    status: 'pending'
                });

                // Update status keranjang menjadi 'checkout'
                await Cart.update(
                    { status: 'checkout' },
                    { where: { id: cartItem.id } }
                );
            } else {
                throw new Error(`Produk dengan ID ${cartItem.productId} tidak ditemukan.`);
            }
        }
        res.status(200).json({ msg: 'Pembelian berhasil dipesan, mohon tunggu konfirmasi' });
    } catch (error) {
        res.status(500).json({ msg: `Pembelian gagal: ${error.message}` });
    }
}

// membatalkan pesanan
export const cancelOrder = async (req, res) => {
    const cekStatus = await Transaction.findOne({
        attributes: ['id', 'status'],
        where: {
            [Op.and]: [{ id: req.params.id, userId: req.userId }]
        }
    });
    // jika barang sudah diantar
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

// Penerimaan pesanan
export const receiveOrder = async (req, res) => {
    const cekStatus = await Transaction.findOne({
        attributes: ['id', 'status'],
        where: {
            [Op.and]: [{ id: req.params.id, userId: req.userId }]
        }
    });
    if (cekStatus.status === 'shipping') {
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
// Menampilkan seluruh transaksi
export const getAllTransactions = async (req, res) => {
    let response;
    try {
        let products = await Products.findAll({
            attributes: ['id', 'product_name', 'image', 'url', 'price', 'discount']
        });

        // Mendapatkan id_product dari setiap produk
        const productIds = products.map(product => product.id);

        // Mendapatkan list keranjang berdasarkan produk
        let carts = await Cart.findAll({
            where: {
                productId: productIds
            }
        });

        // Mendapatkan id_cart dari setiap keranjang (cart)
        const cartIds = carts.map(cart => cart.id);

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

// konfirmasi pembayaran pengguna
export const confirm = async (req, res) => {
    const invalid_id = await Transaction.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!invalid_id) return res.status(404).json({ msg: "Pesanan tidak valid" });
    try {
        await Transaction.update({
            status: 'confirm'
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

// Pembatalan pesanan
export const cancel = async (req, res) => {
    const invalid_id = await Transaction.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!invalid_id) return res.status(404).json({ msg: "Pesanan tidak valid" }); // Pesanan tidak ditemukan
    const CekStatus = await Transaction.findOne({
        where: {
            id: req.params.id
        }
    });
    if (CekStatus.status === 'confirm' || CekStatus.status === 'shipping' || CekStatus.status === 'cancel' || CekStatus.status === 'recieved') {
        return res.status(404).json({ msg: "Pesanan tidak dapat dibatalkan" }); // pembatalan tidak valid
    }
    try {
        await Transaction.update({
            status: 'cancel'
        }, {
            where: {
                [Op.and]: [{ id: req.params.id }, { status: 'pending' }]
            }
        });
        res.status(200).json({ msg: 'Pesanan telah dibatalkan' });
    } catch (error) {
        res.status(422).json({ msg: error.message });
    }
}

// konfirmasi pengiriman pesanan
export const shipping = async (req, res) => {
    try {
        await Transaction.update({
            status: 'shipping'
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: 'Pesanan telah diantar ke alamat tujuan' });
    } catch (error) {
        res.status(422).json({ msg: error.message });
    }
}