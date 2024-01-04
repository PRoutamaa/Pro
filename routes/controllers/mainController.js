import * as statService from "../../services/statisticsService.js";

const showMain = async ({ render }) => {
  const data = {
    topicCount: await statService.findTopicCount(),
    questionCount: await statService.findQuestionCount(),
    answerCount: await statService.findAnswerCount(),
  };
  const statData = { allCounts: [data.topicCount, data.questionCount, data.answerCount] };
  render("main.eta", statData);
};

export { showMain };
