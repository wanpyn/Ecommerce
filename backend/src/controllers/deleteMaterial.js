const deleteService = require("../services/deleteMaterial");

async function deleteMaterial(req, res) {
  try {
    const { materialId } = req.body;
    const material = await deleteService.deleteMaterial(materialId);
    res.status(200).json({ message: "Deleted successfully", material });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { deleteMaterial };
