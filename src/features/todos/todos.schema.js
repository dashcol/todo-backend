import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: [true, "enter your todo"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userName: {
    type: String,
    default:"Admin"
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

const todoModel = mongoose.model("Todo", todoSchema);
export default todoModel;
