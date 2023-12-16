import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { database } from "./database/database.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(cors({origin: `${process.env.HOST}`, exposedHeaders: ["token"]}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./views/public"));
app.use(fileUpload());
app.use(morgan("tiny"));

database();

app.listen(PORT, () => console.log("the server is running on port", PORT));