const paper = require("../models/paper");

async function upload(uploadData, fileName) {
  const { postedId, postedBy, category, year, title } = uploadData;

  if (!fileName) {
    throw new Error("File not found");
  }

  const newMaterial = new paper({
    postedId,
    postedBy,
    category,
    year,
    title,
    url: fileName,
  });

  const savedMaterial = await newMaterial.save();
  return savedMaterial;
}

module.exports = { upload };
