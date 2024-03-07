import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const signup = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };
        const user = await UserModel.create({...data, password: hashedPassword});
        const token = jwt.sign({_id: user._id, email: user.email}, process.env.TOKEN_KEY, {issuer: `${process.env.ISSUER}`});
        res.header("token", token).json({success: true, data: user});
    } catch (error) {
        next(error);
    };
};

const signin = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({email: req.body.email}).select({"image.fileName": 0, "image.data": 0});
        if(user) {
            const password = await bcrypt.compare(req.body.password, user.password);
            if(password) {
                const token = jwt.sign({_id: user._id, email: user.email}, process.env.TOKEN_KEY, {issuer: `${process.env.ISSUER}`});
                res.header("token", token).json({success: true, data: user});
            } else {
                res.json({success: false, message: "Please make sure your password is correct."});
            };
        } else {
            res.json({success: false, message: "Please make sure your email is correct."});
        };
    } catch (error) {
        next(error);
    }
};

const authorizedUser = (req, res) => {
    res.json({success: true, data: req.user});
};

export {signup, signin, authorizedUser};