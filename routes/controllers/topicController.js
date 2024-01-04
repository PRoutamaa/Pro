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
    render("topics.eta", data);  
  };

  
const addTopic = async ({ request, response, render, user }) => {
    const admin = await topicService.isAdmin(user.id)
    if (admin) {
        const body = request.body({ type: "form" });
        const params = await body.value;
        const topicData = {
            name: params.get("name"),
        };
        const [passes, errors] = await validasaur.validate(
            topicData,
            choreValidationRules,
        );

        if (!passes) {
            console.log(errors);
            topicData.allTopics = await topicService.listTopics();
            topicData.validationErrors = errors;
            topicData.admin = admin;
            render("topics.eta", topicData);
        } else {
            await topicService.addTopic(topicData.name, user.id);  
            response.redirect("/topics");  
        }
    } else {
        response.redirect("/topics");
    };
};  

const deleteTopic = async ({ params, response, user }) => {
    if (await topicService.isAdmin(user.id)) {
        await topicService.deleteTopic(params.id);
    };
    response.redirect("/topics");    
}

export { addTopic, deleteTopic, listTopics };  