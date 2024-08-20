import Users from '../models/Users.js'
import argon2 from 'argon2'

export const Login = async (req, res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Username atau password salah" });
    req.session.userId = user.id;
    const id = user.id;
    const firstname = user.firstname;
    const lastname = user.lastname;
    const email = user.email;
    const role = user.role;
    res.status(200).json({ id, firstname, lastname, email, role });
}

export const Me = async (req, res) => {
    const user = await Users.findOne({
        attributes: ['id', 'firstname', 'lastname', 'email', 'image', 'url', 'tlp', 'address', 'role'],
        where: {
            id: req.session.userId
        }
    });
    res.status(200).json(user);
}

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
        res.status(200).json({ msg: "Berhasil Logout" });
    })
}