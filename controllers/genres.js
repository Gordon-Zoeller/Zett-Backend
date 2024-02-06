import BookGenreModel from "../models/BookGenre.js";

const books = async (req, res, next) => {
    try {
        const genres = await BookGenreModel.find();
        res.json({success: true, data: genres});
    } catch (error) {
        next(error);
    }
};

export {books};