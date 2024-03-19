import MovieModel from "../models/Movie.js";
import MovieGenreModel from "../models/MovieGenre.js";
import { emptySpace } from "../helpers/emptySpace.js";
import { objectKeys } from "../helpers/objectKeys.js";
import { fileName } from "../helpers/fileName.js";
import { readStream } from "../helpers/readStream.js";

const createMovie = async (req, res, next) => {
    try {
        const actors = [];
        objectKeys(req.body, actors, "actors");
        /*
        Object.keys(req.body).forEach(key => {
            if(key.startsWith("actor")) actors.push(req.body[key]);
        });
        */
        const dvd = fileName(req.files.image[0].name);
        const blueRay = fileName(req.files.image[1].name);
        const data = {
            category: "movie",
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
                one: {
                    year: req.body.year[0],
                    price: req.body.price[0],
                    image: {
                        fileName: dvd,
                        data: req.files.image[0].data,
                        thumbnail: `${process.env.API}${process.env.MOVIE_THUMBNAIL}${dvd}`
                    }
                },
                two: {
                    year: req.body.year[1],
                    price: req.body.price[1],
                    image: {
                        fileName: blueRay,
                        data: req.files.image[1].data,
                        thumbnail: `${process.env.API}${process.env.MOVIE_THUMBNAIL}${blueRay}`
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
        const deadSnake = emptySpace(req.params.genre);
        const movies = await MovieModel.find({genre: deadSnake}).select({"edition.one.image.fileName": 0, "edition.one.image.data": 0, "edition.two.image.fileName": 0, "edition.two.image.data": 0});
        res.json({success: true, data: movies});
    } catch (error) {
        next(error);
    }
};

const image = async (req, res, next) => {
    try {
        if(req.params.fileName.includes("DVD")) {
            const movie = await MovieModel.findOne({"edition.one.image.fileName": req.params.fileName}).select({"edition.one.image.data": 1});
            readStream(res, movie.edition.one.image.data);
        } else {
            const movie = await MovieModel.findOne({"edition.two.image.fileName": req.params.fileName}).select({"edition.two.image.data": 1});
            readStream(res, movie.edition.two.image.data);
        };
    } catch (error) {
        next(error);
    }
};

const id = async (req, res, next) => {
    try {
        const movie = await MovieModel.findById(req.params.id).select({"edition.one.image.fileName": 0, "edition.one.image.data": 0, "edition.two.image.fileName": 0, "edition.two.image.data": 0});
        res.json({success: true, data: movie});
    } catch (error) {
        next(error);
    }
};

export {createMovie, genre, image, id};