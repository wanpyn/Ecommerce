const uploadService = require("../services/uploadPaper");

async function upload(req, res) {
  try {
    const uploadData = req.body;
    const fileName = req.file.filename;
    const paper = await uploadService.upload(uploadData, fileName);
    res.status(200).json({ message: "Uploaded successfully", paper });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { upload };
