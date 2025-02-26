import mongoose from "mongoose";

const notesSchmea = new mongoose.Schema({
  notes: {
    type: String,
    required: [true, "Please enter your notes"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

const notesModel = mongoose.model("Notes", notesSchmea);
export default notesModel;
