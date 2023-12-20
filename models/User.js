import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    thumbnail: String,
    role: {type: String, enum: ["admin", "user"], default: "user"},
    address: {
        street: String,
        zip: String,
        city: String,
        country: String
    },
    orders: [{type: Schema.Types.ObjectId, ref: "order"}],
    reviews: [{type: Schema.Types.ObjectId, ref: "reviews"}]
});

const UserModel = model("User", UserSchema);

export default UserModel;