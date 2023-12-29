import BookModel from "../models/Book.js";

const createBook = async (req, res, next) => {
    try {
        const fileName = Date.now() + "_" + req.files.image.name;
        const data = {
            title: req.body.title,
            author: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            },
            year: parseInt(req.body.year),
            publisher: req.body.publisher,
            price: parseFloat(req.body.price),
            ISBN: req.body.isbn,
            image: {
                fileName: fileName,
                data: req.files.image.data,
                thumbnail: `${process.env.THUMBNAIL}${fileName}`
            }
        };
        const book = await BookModel.create(data);
        res.json({success: true, message: "The book was uploaded successfully."});
    } catch (error) {
        next(error);
    };
};

export {createBook};