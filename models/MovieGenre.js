import { model, Schema } from "mongoose";

const MovieGenreSchema = new Schema({});

const MovieGenreModel = model("MovieGenre", MovieGenreSchema);

export default MovieGenreModel;