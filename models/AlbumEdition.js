import { Schema } from "mongoose";

export const AlbumEditionSchema = new Schema({
    year: {type: Number, required: true},
    price: {type: Number, required: true},
    image: {
        fileName: {type: String, required: true},
        data: {type: Buffer},
        thumbnail: {type: String, required: true}
    }
});