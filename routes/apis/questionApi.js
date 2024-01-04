import * as quizService from "../../services/quizService.js";

const getRandomQuestion = async ({ response }) => {
    let question = await quizService.randomQuestionApi();
    const result = {};
    if (question !== null) {
        let options = await quizService.listAnswerOptions(question.id);
        result.questionId = question.id;
        result.questionText = question.question_text;
        result.answerOptions = [];
        if (options !== null) {
            for (let i = 0; i < options.length; i++) {
                const opt = {};
                opt.optionId = options[i].id;
                opt.optionText = options[i].option_text;
                result.answerOptions.push(opt);
            };
        };  
    };
    response.body = result;
};

const checkAnswer = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    const document = await body.value;
    let resultado = await quizService.checkAnswer(document.optionId);
    if ( resultado !== null) {
        response.body = { correct: resultado };
    } else {
        response.body = {};
    };
};

export { checkAnswer, getRandomQuestion };