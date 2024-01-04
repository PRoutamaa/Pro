import * as topicService from "../../services/topicService.js";
import * as quizService from "../../services/quizService.js";
import * as questionService from "../../services/questionService.js";

const listTopics = async ({ render }) => {
    const data = {
        allTopics: await topicService.listTopics(),
    };
    render("quiz.eta", data);
  };

const randomQuestion = async ({ params, response, render }) => {
    const question = await quizService.randomQuestion(params.tId);
    if (question !== null) {
        response.redirect(`/quiz/${params.tId}/questions/${question.id}`)
    } else {
        render("noQuestions.eta");
    };
};

const viewQuestion = async ({ params, render }) => {
    render("quizQuestion.eta", {
        question: await questionService.getQuestion(params.qId), 
        answerOptions: await questionService.viewOptions(params.qId),
        topicId: params.tId,
        qId: params.qId,
      });
};

const chooseOption = async ({ params, response, user }) => {
    await quizService.storeAnswer(user.id, params.qId, params.oId);
    
    if (await quizService.checkAnswer(params.oId)) {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
    } else {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
    };
};

const correct = async ({ params, render }) => {
    render("correct.eta", { topicId: params.tId, });
};

const inCorrect = async ({ params, render }) => {
    render("incorrect.eta", { 
        topicId: params.tId, 
        answers: await quizService.correctAnswers(params.qId),
    });
};

export { chooseOption, correct, inCorrect, listTopics, randomQuestion, viewQuestion };  