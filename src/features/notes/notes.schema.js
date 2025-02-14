import mongoose from "mongoose";

const notesSchmea = new mongoose.Schema({
  notes: {
    type: String,
    required: [true, "Please enter your notes"],
  },
  userName: {
    type: String,
    default: "Admin",
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

const notesModel = mongoose.model("Notes", notesSchmea);
export default notesModel;
