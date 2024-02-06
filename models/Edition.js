import { Schema } from "mongoose";

export const EditionSchema = new Schema({
    pages: {type: Number, required: true},
    publisher: {type: String, required: true},
    year: {type: Number, required: true},
    price: {type: Number, required: true},
    ISBN: {type: String, required: true, index: {unique: true}},
    image: {
        fileName: {type: String, required: true},
        data: {type: Buffer},
        thumbnail: {type: String, required: true}
    }
});