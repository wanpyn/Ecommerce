const material = require("../models/material");

async function fetchMaterial(category) {
  if (category) {
    const materials = await material.find({ category: category });
    return materials;
  } else {
    const materials = await material.find({});
    return materials;
  }
}

module.exports = { fetchMaterial };
