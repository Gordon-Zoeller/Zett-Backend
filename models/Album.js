import { model, Schema } from "mongoose";
import { AlbumEditionSchema } from "./AlbumEdition.js";

const AlbumSchema = new Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    label: {type: String, required: true},
    language: {type: String, required: true},
    genre: {type: String, required: true},
    runTime: {type: Number, required: true},
    description: {type: String, required: true},
    tracks: [String],
    reviews: [{type: Schema.Types.ObjectId, ref: "Review"}],
    edition: {
        cd: AlbumEditionSchema,
        vinyl: AlbumEditionSchema
    }
});

const AlbumModel = model("Album", AlbumSchema);

export default AlbumModel;