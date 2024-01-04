import { sql } from "../database/database.js";

const addQuestion = async (userId, topicId, text) => {
    await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${userId}, ${topicId}, ${text})`;
};

const addAnswerOption = async (qId, text, isCorrect) => {
    await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${qId}, ${text}, ${isCorrect})`;
};

const deleteOption = async (id, qId) => {
    const answers = await sql`SELECT * FROM question_answers WHERE question_answer_option_id = ${id} AND question_id = ${qId}`;
    if ( answers && answers.length > 0) {
        await sql`DELETE FROM question_answers WHERE question_answer_option_id = ${id} AND question_id = ${qId}`;
    };
    await sql`DELETE FROM question_answer_options WHERE id = ${id}`;
};

const deleteQuestion = async (id, topicId) => {
    await sql`DELETE FROM questions WHERE id = ${id} AND topic_id = ${topicId}`;
};

const viewQuestions = async (userId, topicId) => {
    return await sql`SELECT * FROM questions WHERE user_id = ${userId} AND topic_id = ${topicId}`;
};

const getQuestion = async (qId) => {
    const rows =  await sql`SELECT * FROM questions WHERE id = ${qId}`;
    return rows[0];
};

const viewOptions = async (qId) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${qId}`;
};

export { addAnswerOption, addQuestion, deleteOption, deleteQuestion, getQuestion, viewQuestions, viewOptions };