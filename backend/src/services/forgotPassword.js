const bcrypt = require("bcryptjs");
const User = require("../models/user");

async function forgotPassword(email, password) {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("User not found");
    }
    // const isPasswordSame = await bcrypt.compare(
    //   password,
    //   existingUser.password
    // );
    // if (!isPasswordSame) {
    //   throw new Error("Can not set password as the previous password");
    // }
    if (!password) {
      throw new Error("New password not found");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    existingUser.password = hashedPassword;

    existingUser.save();

    return existingUser;
  } catch (error) {
    console.log("Login error: ", error.message);
    throw new Error("Invalid credentials");
  }
}

module.exports = { forgotPassword };
