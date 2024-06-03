const deleteService = require("../services/deleteUser");

async function deleteUser(req, res) {
  try {
    const { userId } = req.body;
    const material = await deleteService.deleteUser(userId);
    res.status(200).json({ message: "User Removed", material });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { deleteUser };
