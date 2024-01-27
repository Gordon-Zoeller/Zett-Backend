import BookModel from "../models/Book.js";
import GenreModel from "../models/Genre.js";

const createBook = async (req, res, next) => {
    try {
        const fileName = Date.now() + "_" + req.files.image.name;
        const data = {
            title: req.body.title,
            author: req.body.fullName,
            year: parseInt(req.body.year),
            publisher: req.body.publisher,
            genre: req.body.genre,
            description: req.body.description,
            price: parseFloat(req.body.price),
            ISBN: req.body.isbn,
            image: {
                fileName: fileName,
                data: req.files.image.data,
                thumbnail: `${process.env.THUMBNAIL}${fileName}`
            }
        };
        const book = await BookModel.create(data);

        const genre = await GenreModel.findOne({genre: req.body.genre});
        if(!genre) {
            const genre = await GenreModel.create({genre: req.body.genre});
        };

        res.json({success: true, message: "The book was uploaded successfully."});
    } catch (error) {
        next(error);
    };
};

const genre = async (req, res, next) => {
    try {
        const deadSnake = req.params.genre.replaceAll("_", " ");
        const books = await BookModel.find({genre: deadSnake}).select({"image": 0});
        res.json({success: true, data: books});
    } catch (error) {
        next(error);
    }
};

export {createBook, genre};

//image.data 0 image.fileName 0