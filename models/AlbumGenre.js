import { model, Schema } from "mongoose";

const AlbumGenreSchema = new Schema({
    genre: {type: String, required: true}
});

const AlbumGenreModel = model("AlbumGenre", AlbumGenreSchema);

export default AlbumGenreModel