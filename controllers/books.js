import BookModel from "../models/Book.js";
import BookGenreModel from "../models/BookGenre.js";

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

export {createBook, genre};