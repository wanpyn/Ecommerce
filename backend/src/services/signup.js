const bcrypt = require("bcrypt");
const user = require("../models/user");

async function signup(userData) {
  const { name, email, password, role } = userData;

  const existingUser = await user.findOne({ email });

  if (existingUser) {
    throw new Error("Already registered! Please sigin");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new user({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const savedUser = await newUser.save();
  return savedUser;
}

module.exports = { signup };
