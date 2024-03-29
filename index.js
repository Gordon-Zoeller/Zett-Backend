import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { database } from "./database/database.js";
import { errorStatus, notFound } from "./middleware/errors.js";
import user from "./routes/user.js";
import books from "./routes/books.js";
import movies from "./routes/movies.js";
import albums from "./routes/albums.js";
import genres from "./routes/genres.js";
import search from "./routes/search.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(cors({origin: `${process.env.HOST}`, exposedHeaders: [`${process.env.HEADER}`]}));
app.use(express.json({limit: "100mb"}));
app.use(express.urlencoded({extended: true}));
app.use(express.static("./views/public"));
app.use(fileUpload());
app.use(morgan("tiny"));

database();

app.use("/api/user", user);
app.use("/api/books", books);
app.use("/api/movies", movies);
app.use("/api/albums", albums),
app.use("/api/genres", genres);
app.use("/api/search", search);

app.use(notFound);
app.use(errorStatus);

app.listen(PORT, () => console.log("the server is running on port", PORT));