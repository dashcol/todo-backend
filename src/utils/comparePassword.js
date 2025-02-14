import bcrypt from "bcrypt";
export const comparePassword = async (hash, passsword) => {
  try {
    return await bcrypt.compare(passsword, hash);
  } catch (error) {
    next(error);
  }
};
