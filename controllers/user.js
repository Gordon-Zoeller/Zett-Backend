import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const register = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await UserModel.create({...req.body, password: hashedPassword});
        const token = jwt.sign({_id: user._id, email: user.email}, process.env.TOKEN_KEY, {issuer: "Zett"});
        res.header("token", token).json({success: true, data: user});
    } catch (error) {
        next(error);
    };
};

const authorizeUser = (req, res) => {
    res.json({success: true, data: req.user});
};

export {register, authorizeUser};