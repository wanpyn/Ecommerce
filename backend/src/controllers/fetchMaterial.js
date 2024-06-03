const materialService = require("../services/fetchMaterial");

async function fetchMaterial(req, res) {
  try {
    const { category } = req.body;
    const materials = await materialService.fetchMaterial(category);
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

module.exports = { fetchMaterial };
