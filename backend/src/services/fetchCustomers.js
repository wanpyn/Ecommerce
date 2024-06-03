const User = require("../models/user");

async function fetchCustomers() {
  const users = await User.find({}).select("-password");
  const filteredUsers = users.filter((user) => user.role !== "admin");
  return filteredUsers;
}

module.exports = { fetchCustomers };
