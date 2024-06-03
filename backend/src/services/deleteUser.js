const User = require("../models/user");

async function deleteUser(userId) {
  if (!userId) {
    throw new Error("User Id not found");
  }

  const paperFound = await User.findById(userId);

  if (!paperFound) {
    throw new Error("User not found");
  }

  const deletedPaper = await User.findByIdAndDelete(userId);

  return deletedPaper;
}

module.exports = { deleteUser };
