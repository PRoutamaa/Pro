import { sql } from "../database/database.js";

const findTopicCount = async () => {
  const rows = await sql`SELECT count(*) as count FROM topics`;
    if (rows && rows.length > 0) {
      return rows[0].count;
    } else {
      return 0
    };
};

const findQuestionCount = async () => {
  const rows = await sql`SELECT count(*) as count FROM questions`;
  if (rows && rows.length > 0) {
    return rows[0].count;
  } else {
    return 0
  };  
};

const findAnswerCount = async () => {
  const rows = await sql`SELECT count(*) as count FROM question_answers`;
  if (rows && rows.length > 0) {
    return rows[0].count;
  } else {
    return 0
  };  
};

export { findAnswerCount, findTopicCount, findQuestionCount };