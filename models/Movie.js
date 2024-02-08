import { model, Schema } from "mongoose";
import { MovieEditionSchema } from "./MovieEdition.js";

const MovieSchema = new Schema({
    director: {type: String, required: true},
    actors: {type: String, required: true},
    title: {type: String, required: true},
    genre: {type: String, required: true},
    language: {type: String, required: true},
    subtitles: {type: String, required: true},
    runTime: {type: Number, required: true},
    mpaa: {type: String, required: true},
    country: {type: String, required: true},
    distributor: {type: String, required: true},
    description: {type: String, required: true},
    edition: {
        dvd: MovieEditionSchema,
        blueRay: MovieEditionSchema
    }
});

const MovieModel = model("Movie", MovieSchema);

export default MovieModel;