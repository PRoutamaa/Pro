import { sql } from "../database/database.js";

const randomQuestion = async (topicId) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topicId} ORDER BY RANDOM()`;
    if (rows && rows.length > 0) {
        return rows[0];
    } else {
        return null;
    }; 
};

const storeAnswer = async (userId, qId, qAOId) => {
    await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id)
              VALUES (${userId}, ${qId}, ${qAOId})`;
};

const checkAnswer = async (qAOId) => {
    const answer = await sql`SELECT is_correct FROM question_answer_options WHERE id = ${qAOId}`;
    if (answer && answer.length > 0) {
        return answer[0].is_correct;
    } else {
        return null;
    };
};

const correctAnswers = async (qId) => {
    const answer = await sql`SELECT * FROM question_answer_options WHERE question_id = ${qId} AND is_correct = TRUE`;
    if (answer && answer.length > 0) {
        return answer;
    } else {
        return null;
    };
};

const listAnswerOptions = async (qId) => {
    const result = await sql`SELECT * FROM question_answer_options WHERE question_id = ${qId}`;
    if (result && result.length > 0) {
        return result;
    } else {
        return null;
    };
};

const randomQuestionApi = async () => {
    const rows = await sql`SELECT * FROM questions ORDER BY RANDOM()`;
    if (rows && rows.length > 0) {
        return rows[0];
    } else {
        return null;
    }; 
};

export { checkAnswer, correctAnswers, listAnswerOptions, randomQuestion, randomQuestionApi, storeAnswer };