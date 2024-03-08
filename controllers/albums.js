import AlbumModel from "../models/Album.js";
import AlbumGenreModel from "../models/AlbumGenre.js";

const createAlbum = async (req, res, next) => {
    try {
        const tracks = [];
        Object.keys(req.body).forEach(key => {
            if(key.startsWith("track")) tracks.push(req.body[key]);
        });
        const cd = Date.now() + "_" + req.files.image[0].name;
        const vinyl = Date.now() + "_" + req.files.image[1].name;
        const data = {
            title: req.body.title,
            artist: req.body.artist,
            label: req.body.label,
            language: req.body.language,
            genre: req.body.genre,
            runTime: req.body.runTime,
            description: req.body.description,
            tracks: tracks,
            edition: {
                cd: {
                    year: req.body.year[0],
                    price: req.body.price[0],
                    imn: req.body.imn[0],
                    image: {
                        fileName: cd,
                        data: req.files.image[0].data,
                        thumbnail: `${process.env.API}${process.env.ALBUM_THUMBNAIL}${cd}`
                    }
                },
                vinyl: {
                    year: req.body.year[1],
                    price: req.body.price[1],
                    imn: req.body.imn[1],
                    image: {
                        fileName: vinyl,
                        data: req.files.image[1].data,
                        thumbnail: `${process.env.API}${process.env.ALBUM_THUMBNAIL}${vinyl}`
                    }
                }
            }
        };
        const album = await AlbumModel.create(data);

        const genre = await AlbumGenreModel.findOne({genre: req.body.genre});
        if(!genre) {
            const genre = await AlbumGenreModel.create({genre: req.body.genre});
        };

        res.json({success: true, message: "The album was uploaded successfully."});
    } catch (error) {
        next(error);
    };
};

const genre = async (req, res, next) => {
    try {
        const deadSnake = req.params.genre.replaceAll("_", " ");
        const album = await AlbumModel.find({genre: deadSnake}).select({"edition.cd.image.fileName": 0, "edition.cd.image.data": 0, "edition.vinyl.image.fileName": 0, "edition.vinyl.image.data": 0});
        res.json({success: true, data: album});
    } catch (error) {
        next(error);
    }
};

export {createAlbum, genre};