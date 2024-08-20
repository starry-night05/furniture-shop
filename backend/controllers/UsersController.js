import Users from "../models/Users.js";
import argon2 from "argon2";
import path from 'path';
import fs from 'fs';
import { Op } from 'sequelize';

// Menampilkan semua pengguna
export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['id', 'firstname', 'lastname', 'image', 'url', 'email', 'tlp', 'address', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Menampilkan data pengguna berdasarkan id_user
export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['id', 'firstname', 'lastname', 'password', 'image', 'url', 'email', 'tlp', 'address', 'role'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Registrasi akun
export const regUser = async (req, res) => {
    const { firstname, lastname, password, confPassword, email, tlp } = req.body; // request parameters

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ msg: 'Password setidaknya mengandung satu huruf kapital, angka, dan simbol (@,#,$,!,&,*), serta memiliki panjang minimal 8 karakter.' });
    } // Jika password tidak sesuai ketentuan
    if (password !== confPassword) return res.status(400).json({ msg: 'password dan konfirmasi password tidak sama' }); // Jika password tidak sesuai dengan confPassword
    const hashPassword = await argon2.hash(password); // Enkripsi password
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
        });
        res.status(200).json({ msg: 'Registrasi berhasil' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Admin menambah akun untuk role admin
export const createUser = async (req, res) => {
    const { firstname, lastname, email, tlp } = req.body;
    const password = (firstname.toLowerCase() + lastname.toLowerCase()).replace(/\s/g, '') + '123';

    const hashPassword = await argon2.hash(password); // Enkripsi password
    try {
        await Users.create({
            firstname: firstname,
            lastname: lastname,
            password: hashPassword,
            email: email,
            tlp: tlp,
            role: 'admin'
        });
        res.status(200).json({ msg: 'Akun berhasil ditambah' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// edit profile
export const editProfile = async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.userId
        }
    });
    if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' });
    const { firstname, lastname, password, confPassword, mail, phone, address } = req.body;
    const file = req.files.file;
    const size = file.data.length;
    const ext = path.extname(file.name);
    const uniqueIdentifier = Date.now();
    const fileName = `${file.md5}_${uniqueIdentifier}${ext}`;
    const url = `${req.protocol}://${req.get("host")}/images/profile/${fileName}`;
    const allowedType = ['.jpeg', '.jpg', '.png'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Gambar harus berekstensi .jpeg, .jpg, dan .png" }); // Jika ekstensi gambar tidak sesuai

    if (size > 5000000) return res.status(422).json({ msg: "Ukuran file maksimal 5mb" });

    let email;
    let tlp;
    let hashPassword;
    if (password === "" || password === null || mail === "" || mail === null || phone === "" || phone === null) { // Jika pengguna tidak melakukan update
        hashPassword = user.password
        email = user.email
        tlp = user.tlp
    } else { // Jika pengguna melakukan update data
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!&*]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ msg: 'Password setidaknya mengandung satu huruf kapital, angka, dan simbol (@,#,$,!,&,*), serta memiliki panjang minimal 8 karakter' });
        }
        hashPassword = await argon2.hash(password)
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
    if (password !== confPassword) return res.status(400).json({ msg: 'password dan konfirmasi password tidak sama' });
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
                address: address
            },
                {
                    where: {
                        id: user.id
                    }
                }
            );
            res.status(200).json({ msg: 'Update berhasil' });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    });
}

// edit user
export const editUser = async (req, res) => {
    // Cari pengguna berdasarkan ID dari parameter request
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    });

    // Jika pengguna tidak ditemukan, kembalikan respon 404
    if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' });

    // Ambil data dari body request
    const { firstname, lastname, password, confPassword, mail, phone, address, role } = req.body;

    // Inisialisasi variabel untuk email, telepon, dan password yang di-hash
    let email = user.email; // Default ke email pengguna saat ini
    let tlp = user.tlp; // Default ke nomor telepon pengguna saat ini
    let hashPassword = user.password; // Default ke password pengguna saat ini

    // Jika pengguna ingin mengubah password, email, atau nomor telepon
    if (password && mail && phone) {
        // Validasi password dengan regex
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!&*]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ msg: 'Password setidaknya mengandung satu huruf kapital, angka, dan simbol (@,#,$,!,&,*), serta memiliki panjang minimal 8 karakter' });
        }

        // Hash password baru
        hashPassword = await argon2.hash(password);

        // Cek apakah email atau nomor telepon sudah digunakan oleh pengguna lain
        const emailUser = await Users.findOne({
            attributes: ['email', 'tlp'],
            where: {
                id: { [Op.not]: user.id }, // Pastikan pengguna lain, bukan pengguna saat ini
                [Op.or]: [{ email: mail }, { tlp: phone }] // Cek berdasarkan email atau telepon
            }
        });

        // Jika email atau nomor telepon sudah digunakan, kembalikan error
        if (emailUser) {
            if (mail === emailUser.email) {
                return res.status(422).json({ msg: 'Email sudah digunakan, gunakan email lain!' });
            }
            if (phone === emailUser.tlp) {
                return res.status(422).json({ msg: 'No. Hp sudah digunakan, gunakan No. Hp lain!' });
            }
        }

        // Set email dan nomor telepon baru
        email = mail;
        tlp = phone;
    }

    // Pastikan password dan konfirmasi password sama
    if (password !== confPassword) return res.status(400).json({ msg: 'Password dan konfirmasi password tidak sama' });

    try {
        // Update data pengguna
        await Users.update({
            firstname: firstname,
            lastname: lastname,
            password: hashPassword,
            email: email,
            tlp: tlp,
            address: address,
            role: role
        }, {
            where: {
                id: user.id
            }
        });

        // Kembalikan respon berhasil
        res.status(200).json({ msg: 'Update berhasil' });
    } catch (error) {
        // Tangani error dan kembalikan pesan error
        res.status(400).json({ msg: error.message });
    }
}

// hapus akun
export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' });
    try {
        await Users.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: 'Akun berhasil dihapus' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}