import ApplicationError from "../../errors/errors.js";
import TodoRepository from "./todos.repository.js";

export default class TodoController {
  constructor() {
    this.repository = new TodoRepository();
  }

  async AddTodo(req, res, next) {
    try {
      const { todo } = req.body;
      const userId = req.user.id;

      const added = await this.repository.AddTodo(todo, userId);
      if (!added) {
        throw new ApplicationError("not added", 400);
      }
      res.status(201).json(added);
    } catch (error) {
      next(error);
    }
  }
  async todoList(req, res, next) {
    const userId = req.user.id;
    try {
      const todos = await this.repository.todoList(userId);
      if (!todos) {
        throw new ApplicationError("no todos add todos", 400);
      }
      res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  }

  async toggleTodo(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const todo = await this.repository.toggleTodo(id, userId);
      if (!todo) {
        throw new ApplicationError("no todo", 400);
      }

      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  }

  async deletetodo(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const todo = await this.repository.deleteTodo(id, userId);
      if (!todo) {
        throw new ApplicationError("not deleted Error", 400);
      }

      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  }
}
