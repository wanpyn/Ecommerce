const userService = require("../services/signup");

async function signup(req, res) {
  try {
    const userData = req.body;
    const user = await userService.signup(userData);
    res
      .status(200)
      .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { signup };
