import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicController.js";
import * as loginController from "./controllers/loginController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionsController from "./controllers/optionsController.js";
import * as quizController from "./controllers/quizController.js";
import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/topics", topicsController.listTopics);
router.post("/topics", topicsController.addTopic);
router.post("/topics/:id/delete", topicsController.deleteTopic);

router.get("/topics/:id", questionController.viewQuestions);
router.post("/topics/:id/questions", questionController.addQuestion);
router.get("/topics/:id/questions/:qId", questionController.viewQuestion);
router.post("/topics/:id/questions/:qId/options", optionsController.addAnswerOption);
router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestion);
router.post("/topics/:tId/questions/:qId/options/:oId/delete", optionsController.deleteOption);

router.get("/auth/login", loginController.showLoginForm);
router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/login", loginController.processLogin);
router.post("/auth/register", registrationController.registerUser);
router.get("/auth/logout", loginController.logout);

router.get("/quiz", quizController.listTopics);
router.get("/quiz/:tId", quizController.randomQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.viewQuestion);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.chooseOption);
router.get("/quiz/:tId/questions/:qId/correct", quizController.correct);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.inCorrect);

router.get("/api/questions/random", questionApi.getRandomQuestion);
router.post("/api/questions/answer", questionApi.checkAnswer);

export { router };
