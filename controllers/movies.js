import MovieModel from "../models/Movie.js";
import MovieGenreModel from "../models/MovieGenre.js";
import stream from "stream";

const createMovie = async (req, res, next) => {
    try {
        const actors = [];
        Object.keys(req.body).forEach(key => {
            if(key.startsWith("actor")) actors.push(req.body[key]);
        });
        const dvd = Date.now() + "_" + req.files.image[0].name;
        const blueRay = Date.now() + "_" + req.files.image[1].name;
        const data = {
            director: req.body.director,
            actors: actors,
            title: req.body.title,
            genre: req.body.genre,
            language: req.body.language,
            subtitles: req.body.subtitles,
            runTime: req.body.runTime,
            mpaa: req.body.mpaa,
            country: req.body.country,
            distributor: req.body.distributor,
            description: req.body.description,
            edition: {
                dvd: {
                    year: req.body.year[0],
                    price: req.body.price[0],
                    image: {
                        fileName: dvd,
                        data: req.files.image[0].data,
                        thumbnail: `${process.env.API}${process.env.MOVIE_THUMBNAIL}${dvd}`
                    }
                },
                blueRay: {
                    year: req.body.year[1],
                    price: req.body.price[1],
                    image: {
                        fileName: blueRay,
                        data: req.files.image[1].data,
                        thumbnail: `${process.env.API}${process.env.BOOK_THUMBNAIL}${blueRay}`
                    }
                }
            }
        };

        const movie = await MovieModel.create(data);

        const genre = await MovieGenreModel.findOne({genre: req.body.genre});
        if(!genre) {
            const genre = await MovieGenreModel.create({genre: req.body.genre});
        };
        
        res.json({sucess: true, message: "The movie was uploaded successfully."});
    } catch (error) {
        next(error);
    };
};

const genre = async (req, res, next) => {
    try {
        const deadSnake = req.params.genre.replaceAll("_", " ");
        const movies = await MovieModel.find({genre: deadSnake}).select({"edition.dvd.image.fileName": 0, "edition.dvd.image.data": 0, "edition.blueRay.image.fileName": 0, "edition.blueRay.image.data": 0});
        res.json({success: true, data: movies});
    } catch (error) {
        next(error);
    }
};

const image = async (req, res, next) => {
    try {
        if(req.params.fileName.includes("DVD")) {
            const movie = await MovieModel.findOne({"edition.dvd.image.fileName": req.params.fileName}).select({"edition.dvd.image.data": 1});
            const ReadStream = stream.Readable.from(movie.edition.dvd.image.data);
            ReadStream.pipe(res);
        } else {
            const movie = await MovieModel.findOne({"edition.blueRa.image.fileName": req.params.fileName}).select({"edition.blueRay.image.data": 1});
            const ReadStream = stream.Readable.from(movie.edition.blueRay.image.data);
            ReadStream.pipe(res);
        };
    } catch (error) {
        next(error);
    }
};

export {createMovie, genre, image};