import notesModel from "./notes.schema.js";

export default class NotesRepository {
  async addNotes(notes, userId) {
    const newNote = new notesModel({ notes, user: userId });
    await newNote.save();
    return newNote;
  }
  async notesList(userId) {
    const result = await notesModel.find({ user: userId });
    return result;
  }
  async deleteNotes(id, userId) {
    const deletedNote = await notesModel.findByIdAndDelete({
      _id: id,
      user: userId,
    });
    if (!deletedNote) throw new Error("Note not found for deletion");
    const updatedNote = await notesModel.find();
    return updatedNote;
  }
}
