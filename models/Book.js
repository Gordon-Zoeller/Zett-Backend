import { model, Schema } from "mongoose";

const BookSchema = new Schema({
    title: {type: String, required: true},
    author: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    },
    year: {type: Number, required: true},
    publisher: {type: String, required: true},
    genre: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    ISBN: {type: String, required: true, index: {unique: true}},
    reviews: [{type: Schema.Types.ObjectId, ref: "Review"}],
    image: {
        fileName: {type: String, required: true},
        data: {type: Buffer},
        thumbnail: {type: String, required: true}
    }
});

const BookModel = model("Book", BookSchema);

export default BookModel;