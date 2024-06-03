const subCategory = require("../models/subCategory");

async function fetchSubCategories() {
  const subCategories = await subCategory.find({});
  return subCategories;
}

module.exports = { fetchSubCategories };
