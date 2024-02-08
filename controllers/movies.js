import MovieModel from "../models/Movie.js";
import MovieGenreModel from "../models/MovieGenre.js";

const createMovie = async (req, res, next) => {
    try {
        const dvd = Date.now() + "_" + req.files.image[0].name;
        const blueRay = Date.now() + "_" + req.files.image[1].name;
        const data = {
            director: req.body.director,
            actors: req.body.actors,
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

export {createMovie};