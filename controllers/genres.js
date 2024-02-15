import BookGenreModel from "../models/BookGenre.js";
import MovieGenreModel from "../models/MovieGenre.js";

const books = async (req, res, next) => {
    try {
        const genres = await BookGenreModel.find();
        res.json({success: true, data: genres});
    } catch (error) {
        next(error);
    }
};

const movies = async (req, res, next) => {
    try {
        const genres = await MovieGenreModel.find();
        res.json({success: true, data: genres});
    } catch (error) {
        next(error);
    }
};

export {books, movies};