import bcrypt from 'bcrypt';

import UserModel  from "../models/userModel.js";
import { randomStringSecure } from '../utils/formartter.js';

export const checkAuthorization = async (req, res, next) => {
    const { apiKey } = req.query;
    if (!apiKey) {
        return res.status(401).json({ message: 'Token phải được cung cấp !' });
    }
    try {
        const decoded = apiKey.split('-');
        if (decoded.length !== 4 || decoded[0] !== 'mern') {
            return res.status(401).json({ message: 'Định dạng token không hợp lệ !' });
        }
        const user = await UserModel.findById(decoded[1].slice(1, -1));
        if (!user) {
            return res.status(401).json({ message: 'Người dùng không tồn tại !' });
        }

        const userHeader = {
            id: user._id,
            email: user.email,
        }

        req.user = userHeader;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email này đã được sử dụng !' });
        }

        const salt = await bcrypt.genSalt(10);
        // Băm mật khẩu
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Người dùng đã được đăng ký thành công !' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi đăng ký người dùng !' });
    } 
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Tài khoản hoặc mật khẩu không đúng !' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Tài khoản hoặc mật khẩu không đúng !' });
        }

        const token = `mern-$${user._id}$-$${user.email}$-$${randomStringSecure()}$`



        res.status(200).json({ message: 'Đăng nhập thành công !' , token });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi đăng nhập !' });
    }
}