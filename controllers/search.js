import BookModel from "../models/Book.js";

const search = async (req, res, next) => {
    try {
        const space = req.params.query.replaceAll("+", " ");
        let book;
        switch(req.params.category) {
            case "books": {
                book = await BookModel.find({$or: [{title: {$regex: space, $options: "i"}}, {author: {$regex: space, $options: "i"}}]});
            };
            break;
            case "movies": {};
            break;
            default: {};
        };
        res.json({success: true, data: book});
    } catch (error) {
        next(error);
    }
};

export {search};