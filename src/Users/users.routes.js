import express from "express";
import UserController from "./users.controller.js";

const userRouter = express.Router();
const controller = new UserController();

userRouter.post("/register", (req, res, next) => {
  controller.signUP(req, res, next);
});

userRouter.post("/signin", (req, res, next) => {
  controller.signIN(req, res, next);
});
userRouter.post("/forgot-pass", (req, res, next) => {
  controller.handleOTP(req, res, next);
});
userRouter.post("/change-pass",(req,res,next)=>{
  controller.changePass(req,res,next)
})

export default userRouter;
