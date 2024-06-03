const User = require("../models/user");
const bcrypt = require("bcrypt");

async function createAdminAccount() {
  try {
    const existingAdmin = await User.findOne({ email: "admin@admin.com" });
    if (!existingAdmin) {
      const newAdmin = new User({
        email: "admin@admin.com",
        name: "Admin",
        password: await bcrypt.hash("admin", 10),
        role: "admin",
      });
      await newAdmin.save();
      console.log("Admin account created");
    } else {
      console.log("Admin already exist");
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = createAdminAccount;
