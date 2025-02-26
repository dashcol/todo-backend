import NotesRepository from "./notes.repository.js";

export default class NotesController {
  constructor() {
    this.repository = new NotesRepository();
  }

  async addNotes(req, res, next) {
    try {
      const { notes } = req.body;
      const userId = req.user.id;
      const added = await this.repository.addNotes(notes, userId);
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
      const userId = req.user.id;
      const notes = await this.repository.notesList(userId);
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
      const userId = req.user.id;
      const notes = await this.repository.deleteNotes(id, userId);
      if (!notes) {
        throw new ApplicationError("not deleted Error", 400);
      }
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  }
}
