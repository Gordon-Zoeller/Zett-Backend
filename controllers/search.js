import { emptySpace } from "../helpers/emptySpace.js";
import AlbumModel from "../models/Album.js";
import BookModel from "../models/Book.js";
import MovieModel from "../models/Movie.js";

const search = async (req, res, next) => {
    try {
        const space = emptySpace(req.params.query);
        let product;
        switch(req.params.category) {
            case "books": product = await BookModel.find({$or: [{title: {$regex: space, $options: "i"}}, {author: {$regex: space, $options: "i"}}]});
                break;
            case "movies": product = await MovieModel.find({$or: [{title: {$regex: space, $options: "i"}}, {director: {$regex: space, $options: "i"}}, {actors: {$regex: space, $options: "i"}}]});
                break;
            default: product = await AlbumModel.find({$or: [{title: {$regex: space, $options: "i"}}, {artist: {$regex: space, $options: "i"}}]});
        };
        res.json({success: true, data: product});
    } catch (error) {
        next(error);
    }
};

export {search};