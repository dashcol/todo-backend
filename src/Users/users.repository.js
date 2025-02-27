import ApplicationError from "../errors/errors.js";
import { comparePassword } from "../utils/comparePassword.js";
import otpModel from "./otp.schema.js";
import userModel from "./users.schema.js";
import crypto from "crypto";

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
    return validation;
  }
  async findUserByEmail(email) {
    return await userModel.findOne({ email });
  }
  async handleOTP(email, otp = null) {
    if (!otp) {
      const newOtp = crypto.randomInt(100000, 999999).toString();
      const result = new otpModel({ email, otp: newOtp });
      await result.save();
      return { type: "store", otp: newOtp };
    } else {
      const otpRecord = await otpModel
        .findOne({ email })
        .sort({ createdAt: -1 });
      if (!otpRecord) {
        throw new ApplicationError("OTP not found or expired", 400);
      }
      if (otpRecord.otp !== otp) {
        throw new ApplicationError("Invalid OTP", 400);
      }
      await otpModel.deleteOne({ _id: otpRecord._id });
      return {
        type: "verify",
        success: true,
        message: "OTP verified successfully",
      };
    }
  }
  async changePass(email, hashedPassword) {
    return await userModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );
  }
}
