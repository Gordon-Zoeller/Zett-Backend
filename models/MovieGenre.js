import { model, Schema } from "mongoose";

const MovieGenreSchema = new Schema({
    genre: {type: String, required: true},
});

const MovieGenreModel = model("MovieGenre", MovieGenreSchema);

export default MovieGenreModel;