const customerService = require("../services/fetchCustomers");

async function fetchCustomers(req, res) {
  try {
    const users = await customerService.fetchCustomers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}

module.exports = { fetchCustomers };
