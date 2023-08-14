import Cart from "../models/Cart.js";
import Products from "../models/Products.js";
import Users from "../models/Users.js";

// Get all products
export const cartList = async (req, res) => {
    try {
        let response;
        if (req.role === 'user') {
            response = await Cart.findAll({
                attributes: ['id', 'userId', 'productId', 'qty', 'subtotal_price', 'subtotal_disc'],
                where: {
                    userId: req.userId,
                    status: 'checkin'
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
            where: {
                userId: req.userId,
                status: 'checkin'
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

    }
}
export const updateProduct = async (req, res) => {

}
export const deleteProduct = async (req, res) => {

}