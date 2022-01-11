require("dotenv").config();

const { Pool, Client } = require("pg");

async function main() {
  try {
    const pool = new Pool();
    const res = await pool.query("SELECT NOW()");
    console.log(res);
    await pool.end();
  } catch (error) {
    console.log(error);
  }
}
main();
