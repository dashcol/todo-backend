import jwt from "jsonwebtoken";
import ApplicationError from "../errors/errors.js";
import { comparePassword } from "../utils/comparePassword.js";
import UserRepository from "./users.repository.js";
import { sendEmail } from "../utils/email.js";

export default class UserController {
  constructor() {
    this.repository = new UserRepository();
  }

  async signUP(req, res, next) {
    try {
      const data = req.body;
      const existingUser = await this.repository.existingUser(data);
      await sendEmail(data);
      if (existingUser) {
        throw new ApplicationError("User already exists", 409);
      }
      await this.repository.SignUP(data);
      res.status(201).send("sucess,welcome");
    } catch (error) {
      next(error);
    }
  }
  async signIN(req, res, next) {
    try {
      const data = req.body;
      const user = await this.repository.existingUser(data);
      if (!user) {
        throw new ApplicationError("Please sign up", 400);
      }

      const validation = await comparePassword(user.password, data.password);

      if (!validation) {
        throw new ApplicationError("Incorrect password", 400);
      }
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ message: `sucess! Hey ${user.name}`, token: token });
    } catch (error) {
      next(error);
    }
  }
}
