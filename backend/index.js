import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import fileUpload from "express-fileupload";
import db from './config/Database.js';
import SequelizeStore from 'connect-session-sequelize';
import UserRoute from './routes/UserRoute.js'
import CategoriesRoute from './routes/CategoriesRoute.js'
import ProductRoute from './routes/ProductRoute.js'
import CartRoute from './routes/CartRoute.js'
import TransactionsRoute from './routes/TransactionsRoute.js'
import AuthRoute from './routes/AuthRoute.js'
import WishlistRoute from './routes/WishlistRoute.js'
import ReviewsRoute from './routes/ReviewsRoute.js'

dotenv.config();

const app = express();

// Create tables
// (async () => {
//     await db.sync({ alter: true });
// })();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:3000',
    }));
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(ProductRoute);
app.use(CategoriesRoute);
app.use(ProductRoute);
app.use(CartRoute);
app.use(TransactionsRoute);
app.use(AuthRoute);
app.use(WishlistRoute);
app.use(ReviewsRoute);

// Create a new session
// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
});