import BookModel from "../models/Book.js";
import BookGenreModel from "../models/BookGenre.js";
import stream from "stream";

const createBook = async (req, res, next) => {
    try {
        const hardcover = Date.now() + "_" + req.files.image[0].name;
        const paperback = Date.now() + "_" + req.files.image[1].name;
        const data = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            language: req.body.language,
            description: req.body.description,
            edition: {
                hardcover: {
                    pages: req.body.pages[0],
                    publisher: req.body.publisher[0],
                    year: req.body.year[0],
                    price: req.body.price[0],
                    ISBN: req.body.isbn[0],
                    image: {
                        fileName: hardcover,
                        data: req.files.image[0].data,
                        thumbnail: `${process.env.THUMBNAIL}${hardcover}`
                    }
                },
                paperback: {
                    pages: req.body.pages[1],
                    publisher: req.body.publisher[1],
                    year: req.body.year[1],
                    price: req.body.price[1],
                    ISBN: req.body.isbn[1],
                    image: {
                        fileName: paperback,
                        data: req.files.image[1].data,
                        thumbnail: `${process.env.THUMBNAIL}${paperback}`
                    }
                }
            }
        };

        const book = await BookModel.create(data);

        const genre = await BookGenreModel.findOne({genre: req.body.genre});
        if(!genre) {
            const genre = await BookGenreModel.create({genre: req.body.genre});
        };

        res.json({success: true, message: "The book was uploaded successfully."});
    } catch (error) {
        next(error);
    };
};

const genre = async (req, res, next) => {
    try {
        const deadSnake = req.params.genre.replaceAll("_", " ");
        const books = await BookModel.find({genre: deadSnake}).select({"edition.hardcover.image.fileName": 0, "edition.hardcover.image.data": 0, "edition.paperback.image.fileName": 0, "edition.paperback.image.data": 0});
        res.json({success: true, data: books});
    } catch (error) {
        next(error);
    }
};

const image = async (req, res, next) => {
    try {
        if(req.params.fileName.includes("Hardcover")) {
            const book = await BookModel.findOne({"edition.hardcover.image.fileName": req.params.fileName}).select({"edition.hardcover.image.data": 1});
            const ReadStream = stream.Readable.from(book.edition.hardcover.image.data);
            ReadStream.pipe(res);
        } else {
            const book = await BookModel.findOne({"edition.paperback.image.fileName": req.params.fileName}).select({"edition.paperback.image.data": 1});
            const ReadStream = stream.Readable.from(book.edition.paperback.image.data);
            ReadStream.pipe(res);
        };
    } catch (error) {
        next(error);
    }
};

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

export {createBook, genre, image, search};