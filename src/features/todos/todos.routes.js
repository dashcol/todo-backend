import express from "express";
import TodoController from "./todos.controller.js";

const todoRouter = express.Router();
const controller = new TodoController();

todoRouter.post("/add", (req, res, next) => {
  controller.AddTodo(req, res, next);
});
todoRouter.get("/", (req, res, next) => {
  controller.todoList(req, res, next);
});
todoRouter.post("/toggle/:id", (req, res, next) => {
  controller.toggleTodo(req, res, next);
});
todoRouter.delete("/delete/:id", (req, res, next) => {
  controller.deletetodo(req, res, next);
});

export default todoRouter;
