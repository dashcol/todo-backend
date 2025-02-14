import notesModel from "./notes.schema.js";

export default class NotesRepository {
  async addNotes(notes) {
    const newNote = new notesModel({ notes });
    await newNote.save();
    return newNote;
  }
  async notesList() {
    const result = await notesModel.find();
    return result;
  }
  async deleteNotes(id) {
    const deletedNote = await notesModel.findByIdAndDelete(id);
    if (!deletedNote) throw new Error("Note not found for deletion");
    const updatedNote = await notesModel.find();
    return updatedNote;
  }
}
