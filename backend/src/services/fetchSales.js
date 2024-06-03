const Sales = require("../models/sales");

async function fetchSales() {
  const totalSales = await Sales.find({});
  return totalSales;
}

module.exports = { fetchSales };
