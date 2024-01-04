import { sql } from "../database/database.js";

const addUser = async ( email, password) => {
  await sql`INSERT INTO users
      (email, admin, password)
        VALUES (${email}, FALSE, ${password})`;
};

const findUserByEmail = async (email) => {
    const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
    return rows;
  };
  

export { addUser, findUserByEmail };