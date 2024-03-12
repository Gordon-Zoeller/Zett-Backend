import { model, Schema } from "mongoose";
import { BookEditionSchema } from "./BookEdition.js";

const BookSchema = new Schema({
    category: {type: String, required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true},
    language: {type: String, required: true},
    description: {type: String, required: true},
    reviews: [{type: Schema.Types.ObjectId, ref: "Review"}],
    edition: {
        one: BookEditionSchema,
        two: BookEditionSchema
    }
});

const BookModel = model("Book", BookSchema);

export default BookModel;