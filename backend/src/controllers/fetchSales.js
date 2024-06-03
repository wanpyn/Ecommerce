const salesService = require("../services/fetchSales");

async function fetchSales(req, res) {
  try {
    const sales = await salesService.fetchSales();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}

module.exports = { fetchSales };
