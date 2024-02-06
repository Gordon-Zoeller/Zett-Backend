import { model, Schema } from "mongoose";
import { EditionSchema } from "./Edition.js";

const BookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true},
    language: {type: String, required: true},
    description: {type: String, required: true},
    reviews: [{type: Schema.Types.ObjectId, ref: "Review"}],
    edition: {
        hardcover: EditionSchema,
        paperback: EditionSchema
    }
});

const BookModel = model("Book", BookSchema);

export default BookModel;