import { sql } from "../database/database.js";

const listTopics = async () => {
    const rows = await sql`SELECT * FROM topics ORDER BY name`;
    return rows;
  };

const topicName = async (topicId) => {
    const topicName = await sql`SELECT name FROM topics WHERE id = ${topicId}`;
    return topicName[0].name; 
};

const isAdmin = async (userId) => {
    const user = await sql`SELECT admin FROM users WHERE id = ${userId}`;
    return user[0].admin;
  };  

const addTopic = async (name, userId) => {
    await sql`INSERT INTO topics (user_id, name) VALUES (${userId}, ${name})`;
}

const deleteTopic = async (topicId) => {
    const questions = await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
    if (questions && questions.length > 0) {
        for (let i=0; i < questions.length; i++) {
                await sql`DELETE FROM question_answers WHERE question_id = ${questions[i].id}`;   
                await sql`DELETE FROM question_answer_options WHERE question_id = ${questions[i].id}`;
            };
        await sql`DELETE FROM questions WHERE topic_id = ${topicId}`;
    };
    await sql`DELETE FROM topics WHERE id = ${topicId}`; 
};

export { addTopic, deleteTopic, isAdmin, listTopics, topicName };  