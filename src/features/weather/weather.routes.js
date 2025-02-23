import express from "express";
import weatherController from "./weather.controller.js";
const weatherRouter = express.Router();
const weatherControl = new weatherController();

weatherRouter.get("/", (req, res, next) => {
  weatherControl.weather(req, res, next);
});

export default weatherRouter;
