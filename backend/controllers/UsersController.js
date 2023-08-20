import Users from "../models/Users.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['id', 'firstname', 'lastname', 'username', 'email', 'tlp', 'address', 'role']
        }); // get all data users
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['id', 'firstname', 'lastname', 'username', 'password', 'email', 'tlp', 'address', 'role'],
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
    const { firstname, lastname, username, password, confPassword, email, tlp } = req.body; // request parameters
    if (password !== confPassword) return res.status(400).json({ msg: 'password and confirmation password didn`t match' }); // if password not match with confimPassword
    const hashPassword = await argon2.hash(password); // Hash password
    try {
        await Users.create({
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: hashPassword,
            email: email,
            tlp: tlp,
            role: 'user'
        }); // Create user account/Register
        res.status(200).json({ msg: 'Registration complete' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const createUser = async (req, res) => {
    const { firstname, lastname, username, password, confPassword, email, tlp, role } = req.body; // request parameters
    if (password !== confPassword) return res.status(400).json({ msg: 'password and confirmation password didn`t match' }); // if password not match with confimPassword
    const hashPassword = await argon2.hash(password); // Hash password
    try {
        await Users.create({
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: hashPassword,
            email: email,
            tlp: tlp,
            role: role
        }); // Create user account/Register
        res.status(200).json({ msg: 'Registration complete' });
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
    if (!user) return res.status(404).json({ msg: 'User not found' }); // if user is not found
    const { firstname, lastname, username, password, confPassword, email, tlp, address, role } = req.body;
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
            username: username,
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
        res.status(200).json({ msg: 'User has been deleted' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}