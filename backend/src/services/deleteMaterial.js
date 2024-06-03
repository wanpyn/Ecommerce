const material = require("../models/material");

async function deleteMaterial(materialId) {
  if (!materialId) {
    throw new Error("Material Id not found");
  }

  const materialFound = await material.findById(materialId);

  if (!materialFound) {
    throw new Error("Material not found");
  }

  const deletedMaterial = await material.findByIdAndDelete(materialId);

  return deletedMaterial;
}

module.exports = { deleteMaterial };
