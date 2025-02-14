import ApplicationError from "../errors/errors.js";
import { comparePassword } from "../utils/comparePassword.js";
import userModel from "./users.schema.js";

export default class UserRepository {
  async SignUP(data) {
    const user = new userModel(data);
    await user.save();
    return user;
  }
  async existingUser(data) {
    const existingUser = await userModel.findOne({ email: data.email });
    return existingUser;
  }
  async signIN(data) {
    const validation = await comparePassword(data.password, 12);
  }
}
