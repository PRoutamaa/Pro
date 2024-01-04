import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const choreValidationRules = {
    name: [validasaur.required, validasaur.lengthBetween(1, 255)],
  };

const listTopics = async ({ render, user }) => {
    const data = {
        allTopics: await topicService.listTopics(),
        admin:  await topicService.isAdmin(user.id),
    };
    
    if (data.admin) {
        render("topicsAdmin.eta", data);
    } else {
        render("topics.eta", data);
    };   
  };

  
const addTopic = async ({ request, response, render, user }) => {
    if (topicService.isAdmin(user.id)) {
        const body = request.body({ type: "form" });
        const params = await body.value;
        const data = {
            name: params.get("name"),
        };

        const [passes, errors] = await validasaur.validate(
            data,
            choreValidationRules,
        );

        if (!passes) {
            console.log(errors);
            data.validationErrors = errors;
            render("topics.eta", data);
        } else {
            await topicService.addTopic(data.name, user.id);    
        }
    };
    response.redirect("/topics");
};  

const deleteTopic = async ({ params, response, user }) => {
    if (topicService.isAdmin(user.id)) {
        await topicService.deleteTopic(params.id);
    };
    response.redirect("/topics");    
}

export { addTopic, deleteTopic, listTopics };  