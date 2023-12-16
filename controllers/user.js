import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

const register = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await UserModel.create({...req.body, password: hashedPassword});
        res.json({success: true, data: user});
    } catch (error) {
        next(error);
    };
};

export {register};