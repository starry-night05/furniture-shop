import Transaction from "../models/Transaction.js";
import Cart from "../models/Cart.js";
import Users from "../models/Users.js";

export const checkoutList = async (req, res) => {
    let response;
    try {
        response = await Transaction.findAll({
            attributes: ['id', 'cartId', 'userId', 'total_price', 'total_disc', 'total_qty', 'payment', 'address', 'status', 'created_at'],
            where: {
                [Op.and]: [{ userId: req.userId }, { status: req.params.status }]
            },
            include: [{
                model: Users,
                attributes: ['id', 'firstname', 'lastname', 'email', 'address', 'tlp']
            }, {
                model: Cart,
                attributes: ['id', 'productId', 'qty', 'subtotal_price', 'subtotal_disc']
            }]
        });
    } catch (error) {
    }
}

export const confirmOrder = async (req, res) => {
    // const { total_price, total_disc, total_qty, payment, acc_num, address } = req.body;

    const carts = await Cart.findAll({
        where: {
            userId: req.userId,
            status: 'checkin'
        }
    });

    let cartId;

    for (const cartsId of carts) {
        cartId += cartsId.cartId;
    }

    let total_price = 0;
    let total_disc = 0;
    let total_qty = 0;

    for (const cart of carts) {
        total_price += cart.subtotal_price * cart.qty;
        total_disc += cart.subtotal_disc * cart.qty;
        total_qty += cart.subtotal_qty * cart.qty;
    }

    try {
        // if (address === null || address === '') {
        //     return res.status(422).json({ msg: "Address can't be empty" });
        // }
        while (carts) {
            await Transaction.create({
                cartId: cartId,
                userId: req.userId,
                total_price: total_price,
                total_disc: total_disc,
                total_qty: total_qty,
                payment: 'BCA',
                acc_num: 87172839,
                address: 'GBJ',
                status: 'pending'
            });
        }

        await Cart.update({
            status: 'checkout'
        },
            {
                where: {
                    userId: req.userId
                }
            }
        );

        res.status(200).json({ msg: 'Checkout successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
