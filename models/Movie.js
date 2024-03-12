import { model, Schema } from "mongoose";
import { MovieEditionSchema } from "./MovieEdition.js";

const MovieSchema = new Schema({
    category: {type: String, required: true},
    director: {type: String, required: true},
    actors: [String],
    title: {type: String, required: true},
    genre: {type: String, required: true},
    language: {type: String, required: true},
    subtitles: {type: String, required: true},
    runTime: {type: Number, required: true},
    mpaa: {type: String, required: true},
    country: {type: String, required: true},
    distributor: {type: String, required: true},
    description: {type: String, required: true},
    reviews: [{type: Schema.Types.ObjectId, ref: "Review"}],
    edition: {
        one: MovieEditionSchema,
        two: MovieEditionSchema
    }
});

const MovieModel = model("Movie", MovieSchema);

export default MovieModel;