import todoModel from "./todos.schema.js";

export default class TodoRepository {
  async AddTodo(todo) {
    const newTodo = new todoModel({ todo });
    await newTodo.save();
    return newTodo;
  }
  async todoList() {
    const result = await todoModel.find();
    return result;
  }

  async toggleTodo(id) {
    const todo = await todoModel.findById(id);
    if (!todo) throw new Error("Todo not found");
    todo.completed = !todo.completed;
    await todo.save();
    return todo;
  }

  async deleteTodo(id) {
    const deletedTodo = await todoModel.findByIdAndDelete(id);
    if (!deletedTodo) throw new Error("Todo not found for deletion");
    const updatedTodo = await todoModel.find();
    return updatedTodo;
  }
}
