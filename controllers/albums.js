import AlbumModel from "../models/Album.js";
import AlbumGenreModel from "../models/AlbumGenre.js";
import stream from "stream";
import { emptySpace } from "../helpers/emptySpace.js";
import { objectKeys } from "../helpers/objectKeys.js";
import { fileName } from "../helpers/fileName.js";
import { readStream } from "../helpers/readStream.js";

const createAlbum = async (req, res, next) => {
    try {
        const tracks = [];
        objectKeys(req.body, tracks, "track");
        /*
        Object.keys(req.body).forEach(key => {
            if(key.startsWith("track")) tracks.push(req.body[key]);
        });
        */
        const cd = fileName(req.files.image[0].name);
        const vinyl = fileName(req.files.image[1].name);
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
        const deadSnake = emptySpace(req.params.genre);
        const album = await AlbumModel.find({genre: deadSnake}).select({"edition.cd.image.fileName": 0, "edition.cd.image.data": 0, "edition.vinyl.image.fileName": 0, "edition.vinyl.image.data": 0});
        res.json({success: true, data: album});
    } catch (error) {
        next(error);
    }
};

const image = async (req, res, next) => {
    try {
        if(req.params.fileName.includes("CD")) {
            const album = await AlbumModel.findOne({"edition.cd.image.fileName": req.params.fileName}).select({"edition.cd.image.data": 1});
            //const ReadStream = stream.Readable.from(album.edition.cd.image.data);
            //ReadStream.pipe(res);
            readStream(res, album.edition.cd.image.data);
        } else {
            const album = await AlbumModel.findOne({"edition.vinyl.image.fileName": req.params.fileName}).select({"edition.vinyl.image.data": 1});
            //const ReadStream = stream.Readable.from(album.edition.vinyl.image.data);
            //ReadStream.pipe(res);
            readStream(res, album.edition.vinyl.image.data);
        };
    } catch (error) {
        next(error);
    }
};

export {createAlbum, genre, image};