import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/Database';
import SequelizeStore from 'connect-session-sequelize';

dotenv.config();

const app = express();

(async () => {
    await db.sync();
})();

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

store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
});