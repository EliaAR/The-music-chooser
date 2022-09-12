import { Pool } from "pg";

let pool;

try {
  pool = new Pool();
} catch (err) {
  console.error("Error connecting to database", err);
  throw new Error("Error connecting to database");
}

export { pool };
