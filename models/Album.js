import { Schema } from "mongoose";
import { AlbumEditionSchema } from "./AlbumEdition.js";

const AlbumSchema = new Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    label: {type: String, required: true},
    imn: {type: Number, required: true},
    genre: {type: String, required: true},
    runTime: {type: String, required: true},
    tracks: [String],
    reviews: [{type: Schema.Types.ObjectId, ref: "Review"}],
    edition: {
        cd: AlbumEditionSchema,
        vinyl: AlbumEditionSchema
    }
});