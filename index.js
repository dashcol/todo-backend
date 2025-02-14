import express from "express";
import userRouter from "./src/Users/users.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorMiddleware from "./src/middleware/error.middleware.js";
import JWTauth from "./src/middleware/JWTauth.js";
import todoRouter from "./src/features/todos/todos.routes.js";
import cors from "cors";
import notesRouter from "./src/features/notes/notes.routes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/todos", JWTauth, todoRouter);
app.use("/api/notes", JWTauth, notesRouter);
app.use(errorMiddleware);

export default app;
