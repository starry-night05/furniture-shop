import Users from "../models/Users.js";
import argon2 from "argon2";
import path from 'path';
import fs from 'fs';

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
    if (req.files === null) return res.status(400).json({ msg: 'No File added' }); // if file didn't exist
    const { firstname, lastname, password, confPassword, email, tlp } = req.body; // request parameters
    // image
    const file = req.files.file;
    const size = file.data.length;
    const ext = path.extname(file.name);
    const uniqueIdentifier = Date.now(); // Generate a unique identifier (timestamp)
    const fileName = `${file.md5}_${uniqueIdentifier}${ext}`; // Append the unique identifier to the file name
    const url = `${req.protocol}://${req.get("host")}/images/profile/${fileName}`;
    const allowedType = ['.jpeg', '.jpg', '.png'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid image" }); // if the image is not in the allowed
    if (err) return res.status(500).json({ msg: err.message });

    if (password !== confPassword) return res.status(400).json({ msg: 'password dan konfirmasi password tidak sama' }); // if password not match with confimPassword
    const hashPassword = await argon2.hash(password); // Hash password
    const emailUser = await Users.findOne({
        where: {
            email: req.body.email
        }
    });
    if (emailUser.length === 1) return res.status(422).json({ msg: 'Email sudah digunakan, gunakan email lain!' }); // if email has already been added
    if (size > 200000000) return res.status(422).json({ msg: "Image must be less than 200MB" }); // if size is more than 200MB
    file.mv(`./public/images/profile/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Users.create({
                firstname: firstname,
                lastname: lastname,
                password: hashPassword,
                image: fileName,
                url: url,
                email: email,
                tlp: tlp,
                role: 'user'
            }); // Create user account/Register
            res.status(200).json({ msg: 'Registrasi berhasil' });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    });
}

export const createUser = async (req, res) => {
    const { firstname, lastname, password, confPassword, email, tlp, role } = req.body; // request parameters
    // image
    const file = req.files.file;
    const size = file.data.length;
    const ext = path.extname(file.name);
    const uniqueIdentifier = Date.now(); // Generate a unique identifier (timestamp)
    const fileName = `${file.md5}_${uniqueIdentifier}${ext}`; // Append the unique identifier to the file name
    const url = `${req.protocol}://${req.get("host")}/images/profile/${fileName}`;
    const allowedType = ['.jpeg', '.jpg', '.png'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid image" }); // if the image is not in the allowed

    if (password !== confPassword) return res.status(400).json({ msg: 'password dan konfirmasi password tidak sama' }); // if password not match with confimPassword
    const hashPassword = await argon2.hash(password); // Hash password
    if (size > 200000000) return res.status(422).json({ msg: "Image must be less than 200MB" }); // if size is more than 200MB
    file.mv(`./public/images/profile/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Users.create({
                firstname: firstname,
                lastname: lastname,
                password: hashPassword,
                image: fileName,
                url: url,
                email: email,
                tlp: tlp,
                role: role
            }); // Create user account/Register
            res.status(200).json({ msg: 'Akun berhasil ditambah' });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    });
}

export const editUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    }); // get user by id
    if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' }); // if user is not found
    const { firstname, lastname, password, confPassword, email, tlp, address, role } = req.body;
    let hashPassword;

    if (password === "" || password === null) { // check if user not filled in password form
        hashPassword = user.password
    } else { // if user change password
        hashPassword = await argon2.hash(password) // hash password
    }
    if (password !== confPassword) return res.status(400).json({ msg: 'password and confirmation password didn`t match' }); // if password not match with confimPassword
    try {
        await Users.update({
            firstname: firstname,
            lastname: lastname,
            password: hashPassword,
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