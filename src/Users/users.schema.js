import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "email is required"],
    minLength: [3, "name should be atleast 3 charachters"],
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: [true, "email is required"],
    match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/],
  },
  password: {
    type: String,
    required: [true, "enter a password"],
    minLength: [3, "password mus t be atleast 6 charachtes long"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;"'<>,.?/~`-])[A-Za-z\d!@#$%^&*()_+{}[\]:;"'<>,.?/~`-]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ],
  },
  confirmPassword: {
    type: String,
    required: [true, "please confirm your password"],
  },
  mobile: {
    type: String,
    required: [true, "enter your mobile number"],
    unique: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
  },
  gender: {
    type: String,
    required: [true, "provide your gender"],
    enum: ["male", "female"],
  },
  signedUpOn: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  if (this.password !== this.confirmPassword) {
    return next(new Error("Passwords do not match"));
  }
  next();
});
userSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
  } catch (error) {
    return next(error);
  }
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
