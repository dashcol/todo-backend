import jwt from "jsonwebtoken";
import ApplicationError from "../errors/errors.js";
import { comparePassword } from "../utils/comparePassword.js";
import UserRepository from "./users.repository.js";
import { sendEmail } from "../utils/email.js";
import { sendOTPEmail } from "../utils/otp.js";
import bcrypt from "bcrypt";
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
      res.status(201).json({ message: "success, welcome" });
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
          id: user._id,
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

  async handleOTP(req, res, next) {
    try {
      const { email, otp } = req.body;

      if (!email) {
        throw new ApplicationError("Email is required", 400);
      }
      const result = await this.repository.handleOTP(email, otp);
      if (result.type === "store") {
        await sendOTPEmail(email, result.otp);
        res.status(200).json({ message: "OTP sent to your email" });
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }
  async changePass(req, res, next) {
    try {
      const { email, newPassword } = req.body;

      if (!email || !newPassword) {
        throw new ApplicationError("Email and new password are required", 400);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      await this.repository.changePass(email, hashedPassword);

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      next(error);
    }
  }
}
