import BookModel from "../models/Book.js";

const createBook = async (req, res, next) => {
    try {
        const book = await BookModel.create(req.body);
        res.json({success: true, data: book});
    } catch (error) {
        next(error);
    };
};

export {createBook};