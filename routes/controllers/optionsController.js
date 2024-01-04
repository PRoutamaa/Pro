import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const choreValidationRules = {
    qId: [validasaur.required],
    text: [validasaur.required, validasaur.minLength(1)],
    isCorrect: [validasaur.required, validasaur.isBool],
  };

const addAnswerOption = async ({ request, response, params }) => {
    const body = request.body({ type: "form" });
    const inputValues = await body.value;
    const data = {
        qId: params.qId,
        text: inputValues.get("option_text"),
        isCorrect: inputValues.get("is_correct"),
    };
    if (data.isCorrect !== null) {
        data.isCorrect = true 
    } else {
        data.isCorrect = false
    };
    const [passes, errors] = await validasaur.validate(
        data,
        choreValidationRules,
    );

    if (!passes) {
        console.log(errors);
        data.validationErrors = errors;
        render("question.eta", data);
    } else {
        await questionService.addAnswerOption(data.qId, data.text, data.isCorrect);

        response.redirect(`/topics/${params.id}/questions/${data.qId}`);
    };
};

const deleteOption = async ({ params, response }) => {
    await questionService.deleteOption(params.oId, params.qId);
    response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
}

export { addAnswerOption, deleteOption };