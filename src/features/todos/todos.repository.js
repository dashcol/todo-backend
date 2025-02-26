import todoModel from "./todos.schema.js";

export default class TodoRepository {
  async AddTodo(todo, userId) {
    const newTodo = new todoModel({ todo, user: userId });
    await newTodo.save();
    return newTodo;
  }
  async todoList(userId) {
    return await todoModel.find({ user: userId });
  }

  async toggleTodo(id, userId) {
    const todo = await todoModel.findOne({ _id: id, user: userId });
    if (!todo) throw new Error("Todo not found");
    todo.completed = !todo.completed;
    await todo.save();
    return todo;
  }

  async deleteTodo(id, userId) {
    const deletedTodo = await todoModel.findByIdAndDelete({
      _id: id,
      user: userId,
    });
    if (!deletedTodo) throw new Error("Todo not found for deletion");
    return await this.todoList(userId);
  }
}
