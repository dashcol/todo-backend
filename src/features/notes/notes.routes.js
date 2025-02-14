import express from "express";
import NotesController from "./notes.controller.js";

const notesRouter = express.Router();
const controller = new NotesController();

notesRouter.post("/add", (req, res, next) => {
  controller.addNotes(req, res, next);
});
notesRouter.get("/", (req, res, next) => {
  controller.notesList(req, res, next);
});

notesRouter.delete("/:id", (req, res, next) => {
  controller.deleteNotes(req, res, next);
});

export default notesRouter;
