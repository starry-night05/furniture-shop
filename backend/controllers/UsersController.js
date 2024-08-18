import Users from "../models/Users.js";
import argon2 from "argon2";
import path from 'path';
import fs from 'fs';
import { Op } from 'sequelize';

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['id', 'firstname', 'lastname', 'image', 'url', 'email', 'tlp', 'address', 'role']
        }); // get all data users
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['id', 'firstname', 'lastname', 'password', 'image', 'url', 'email', 'tlp', 'address', 'role'],
            where: {
                id: req.params.id
            }
        }); // get all data user by id
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const regUser = async (req, res) => {
    const { firstname, lastname, password, confPassword, email, tlp } = req.body; // request parameters

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ msg: 'Password setidaknya mengandung satu huruf kapital, angka, dan simbol (@,#,$,!,&,*), serta memiliki panjang minimal 8 karakter.' });
    } // if password not contain simbols
    if (password !== confPassword) return res.status(400).json({ msg: 'password dan konfirmasi password tidak sama' }); // if password not match with confimPassword
    const hashPassword = await argon2.hash(password); // Hash password
    const emailUser = await Users.findOne({
        attributes: ['email', 'tlp'],
        where: {
            [Op.or]: [{ email: req.body.email }, { tlp: req.body.tlp }]
        }
    });
    if (emailUser) {
        if (email === emailUser.email) {
            return res.status(422).json({ msg: 'Email sudah digunakan, gunakan email lain!' });
        }
        if (tlp === emailUser.tlp) {
            return res.status(422).json({ msg: 'No. Hp sudah digunakan, gunakan No. Hp lain!' });
        }
    }

    try {
        await Users.create({
            firstname: firstname,
            lastname: lastname,
            password: hashPassword,
            email: email,
            tlp: tlp,
            role: 'user'
        }); // Create user account/Register
        res.status(200).json({ msg: 'Registrasi berhasil' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const createUser = async (req, res) => {
    const { firstname, lastname, email, tlp } = req.body; // request parameters
    const password = (firstname.toLowerCase() + lastname.toLowerCase()).replace(/\s/g, '') + '123';

    const hashPassword = await argon2.hash(password); // Hash password
    try {
        await Users.create({
            firstname: firstname,
            lastname: lastname,
            password: hashPassword,
            email: email,
            tlp: tlp,
            role: 'admin'
        }); // Create user account/Register
        res.status(200).json({ msg: 'Akun berhasil ditambah' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const editUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    }); // get user by id
    if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' }); // if user is not found
    const { firstname, lastname, password, confPassword, mail, phone, address, role } = req.body;
    // image upload or update
    const file = req.files.file;
    const size = file.data.length;
    const ext = path.extname(file.name);
    const uniqueIdentifier = Date.now(); // Generate a unique identifier (timestamp)
    const fileName = `${file.md5}_${uniqueIdentifier}${ext}`; // Append the unique identifier to the file name
    const url = `${req.protocol}://${req.get("host")}/images/profile/${fileName}`;
    const allowedType = ['.jpeg', '.jpg', '.png'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Gambar harus berekstensi .jpeg, .jpg, dan .png" }); // if the image is not in the allowed

    if (size > 5000000) return res.status(422).json({ msg: "Ukuran file maksimal 5mb" }); // if size is more than 5MB

    let email;
    let tlp;
    let hashPassword;
    if (password === "" || password === null || mail === "" || mail === null || phone === "" || phone === null) { // check if user not filled in form
        hashPassword = user.password
        email = user.email
        tlp = user.tlp
    } else { // if user change
        // change password
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!&*]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ msg: 'Password setidaknya mengandung satu huruf kapital, angka, dan simbol (@,#,$,!,&,*), serta memiliki panjang minimal 8 karakter' });
        } // if password not contain simbols
        hashPassword = await argon2.hash(password) // hash password
        // change email and phone
        const emailUser = await Users.findOne({
            attributes: ['email', 'tlp'],
            where: {
                id: { [Op.not]: user.id },
                [Op.or]: [{ email: req.body.mail }, { tlp: req.body.phone }]
            }
        });
        if (emailUser) {
            if (mail === emailUser.email) {
                return res.status(422).json({ msg: 'Email sudah digunakan, gunakan email lain!' });
            }
            if (phone === emailUser.tlp) {
                return res.status(422).json({ msg: 'No. Hp sudah digunakan, gunakan No. Hp lain!' });
            }
        }
        email = mail;
        tlp = phone;
    }
    if (password !== confPassword) return res.status(400).json({ msg: 'password dan konfirmasi password tidak sama' }); // if password not match with confimPassword
    file.mv(`./public/images/profile/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Users.update({
                firstname: firstname,
                lastname: lastname,
                password: hashPassword,
                image: fileName,
                url: url,
                email: email,
                tlp: tlp,
                address: address,
                role: role
            }, // update data user
                {
                    where: {
                        id: user.id // get user id
                    }
                }
            );
            res.status(200).json({ msg: 'Update success' });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    });
}

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    }); // get user by id
    if (!user) return res.status(404).json({ msg: 'User not found' }); // if user is not found
    try {
        await Users.destroy({
            where: {
                id: user.id
            }
        }); // delete user by id
        res.status(200).json({ msg: 'Data berhasil dihapus' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}