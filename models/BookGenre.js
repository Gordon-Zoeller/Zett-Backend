import { model, Schema } from "mongoose";

const BookGenreSchema = new Schema({
    genre: {type: String, required: true},
});

const BookGenreModel = model("BookGenre", BookGenreSchema);

export default BookGenreModel;