const uploadService = require("../services/addProduct");

async function addProduct(req, res) {
  try {
    const uploadData = req.body;
    const fileName = req.file.filename;
    const product = await uploadService.upload(uploadData, fileName);
    res.status(200).json({ message: "Added successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { addProduct };
