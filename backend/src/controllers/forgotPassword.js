const forgotPasswordService = require("../services/forgotPassword");

async function forgotPassword(req, res) {
  try {
    const { email, password } = req.body;
    const updatedUser = await forgotPasswordService.forgotPassword(
      email,
      password
    );
    res.json({
      success: true,
      message: "Password changed successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Could not change password" });
  }
}

module.exports = { forgotPassword };
