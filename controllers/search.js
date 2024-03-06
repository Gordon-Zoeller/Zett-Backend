import BookModel from "../models/Book.js";
import MovieModel from "../models/Movie.js";

const search = async (req, res, next) => {
    try {
        const space = req.params.query.replaceAll("+", " ");
        let product;
        switch(req.params.category) {
            case "books": {
                product = await BookModel.find({$or: [{title: {$regex: space, $options: "i"}}, {author: {$regex: space, $options: "i"}}]});
            };
            break;
            case "movies": {
                product = await MovieModel.find({$or: [{title: {$regex: space, $options: "i"}}, {director: {$regex: space, $options: "i"}}, {actors: {$regex: space, $options: "i"}}]});
            };
            break;
            default: {};
        };
        res.json({success: true, data: product});
    } catch (error) {
        next(error);
    }
};

export {search};