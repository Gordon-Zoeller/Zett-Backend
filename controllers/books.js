import BookModel from "../models/Book.js";
import BookGenreModel from "../models/BookGenre.js";
import { emptySpace } from "../helpers/emptySpace.js";
import { fileName } from "../helpers/fileName.js";
import { readStream } from "../helpers/readStream.js";

const createBook = async (req, res, next) => {
    try {
        //const hardcover = Date.now() + "_" + req.files.image[0].name;
        //const paperback = Date.now() + "_" + req.files.image[1].name;
        const hardcover = fileName(req.files.image[0].name);
        const paperback = fileName(req.files.image[1].name);
        const data = {
            category: "book",
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            language: req.body.language,
            description: req.body.description,
            edition: {
                one: {
                    pages: req.body.pages[0],
                    publisher: req.body.publisher[0],
                    year: req.body.year[0],
                    price: req.body.price[0],
                    ISBN: req.body.isbn[0],
                    image: {
                        fileName: hardcover,
                        data: req.files.image[0].data,
                        thumbnail: `${process.env.API}${process.env.BOOK_THUMBNAIL}${hardcover}`
                    }
                },
                two: {
                    pages: req.body.pages[1],
                    publisher: req.body.publisher[1],
                    year: req.body.year[1],
                    price: req.body.price[1],
                    ISBN: req.body.isbn[1],
                    image: {
                        fileName: paperback,
                        data: req.files.image[1].data,
                        thumbnail: `${process.env.API}${process.env.BOOK_THUMBNAIL}${paperback}`
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
        const deadSnake = emptySpace(req.params.genre);
        const books = await BookModel.find({genre: deadSnake}).select({"edition.one.image.fileName": 0, "edition.one.image.data": 0, "edition.two.image.fileName": 0, "edition.two.image.data": 0});
        res.json({success: true, data: books});
    } catch (error) {
        next(error);
    }
};

const image = async (req, res, next) => {
    try {
        if(req.params.fileName.includes("Hardcover")) {
            const book = await BookModel.findOne({"edition.one.image.fileName": req.params.fileName}).select({"edition.one.image.data": 1});
            readStream(res, book.edition.one.image.data);
        } else {
            const book = await BookModel.findOne({"edition.two.image.fileName": req.params.fileName}).select({"edition.two.image.data": 1});
            readStream(res, book.edition.two.image.data);
        };
    } catch (error) {
        next(error);
    }
};

const id = async (req, res, next) => {
    try {
        const book = await BookModel.findById(req.params.id).select({"edition.one.image.fileName": 0, "edition.one.image.data": 0, "edition.two.image.fileName": 0, "edition.two.image.data": 0});
        res.json({success: true, data: book});
    } catch (error) {
        next(error);
    }
};

export {createBook, genre, image, id};