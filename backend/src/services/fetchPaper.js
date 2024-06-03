const paper = require("../models/paper");

async function fetchQuestionPaper(category) {
  if (category) {
    const papers = await paper.find({ category: category });
    return papers;
  } else {
    const papers = await paper.find();
    return papers;
  }
}

module.exports = { fetchQuestionPaper };
