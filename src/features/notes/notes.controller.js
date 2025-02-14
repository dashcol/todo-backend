import NotesRepository from "./notes.repository.js";

export default class NotesController {
  constructor() {
    this.repository = new NotesRepository();
  }

  async addNotes(req, res, next) {
    try {
      const { notes } = req.body;
      const added = await this.repository.addNotes(notes);
      if (!added) {
        throw new ApplicationError("not added", 400);
      }
      res.status(201).json(added);
    } catch (error) {
      next(error);
    }
  }
  async notesList(req, res, next) {
    try {
      const notes = await this.repository.notesList();
      if (!notes) {
        throw new ApplicationError("no notes add notes", 400);
      }
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  }
  async deleteNotes(req, res, next) {
    try {
      const { id } = req.params;

      const notes = await this.repository.deleteNotes(id);
      if (!notes) {
        throw new ApplicationError("not deleted Error", 400);
      }
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  }
}
