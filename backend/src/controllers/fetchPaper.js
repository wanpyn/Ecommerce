const paperService = require("../services/fetchPaper");

async function fetchQuestionPaper(req, res) {
  try {
    const { category } = req.body;
    const questionPapers = await paperService.fetchQuestionPaper(category);
    res.json(questionPapers);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

module.exports = { fetchQuestionPaper };
