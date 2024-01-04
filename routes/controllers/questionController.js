import * as questionService from "../../services/questionService.js";
import { topicName } from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const choreValidationRules = {
    topicId: [validasaur.required, validasaur.isNumeric],
    text: [validasaur.required, validasaur.minLength(1)],
  };

const addQuestion = async ({ params, request, response, render, user }) => {
    const body = request.body({ type: "form" });
    const inputValues = await body.value;
    const data = {
      topicId: params.id,
      text: inputValues.get("question_text"),
    };

    const [passes, errors] = await validasaur.validate(
        data,
        choreValidationRules,
    );

    if (!passes) {
        console.log(errors);
        data.currentTopic = await topicName(params.id);
        data.validationErrors = errors;
        render("topic.eta", data);
    } else {
        await questionService.addQuestion(user.id, data.topicId, data.text,);

        response.redirect(`/topics/${data.topicId}`);
    }
};

const deleteQuestion = async ({ params, response }) => {
    await questionService.deleteQuestion(params.qId, params.tId);
    response.redirect(`/topics/${params.tId}`);
};

const viewQuestions = async ({ params, render, user }) => {
    render("topic.eta", {
        currentTopic: await topicName(params.id),
        allQuestions: await questionService.viewQuestions(user.id, params.id),
        topicId: params.id,
      });
};

const viewQuestion = async ({ params, render }) => {
    render("question.eta", {
        question: await questionService.getQuestion(params.qId), 
        answerOptions: await questionService.viewOptions(params.qId),
        topicId: params.id,
        qId: params.qId,
      });
};

export { addQuestion, deleteQuestion, viewQuestion, viewQuestions };