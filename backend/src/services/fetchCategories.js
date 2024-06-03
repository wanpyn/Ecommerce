const Category = require("../models/category");

async function fetchCategories() {
  const categories = await Category.find({});
  return categories;
}

module.exports = { fetchCategories };
