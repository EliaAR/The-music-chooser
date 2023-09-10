import { Pool } from "pg";

let pool: Pool;

try {
  if (process.env.ISLOCAL === "true") {
    pool = new Pool();
  } else {
    if (!process.env.POSTGRES_URL) {
      throw new Error("POSTGRES_URL not found");
    }
    pool = new Pool({
      connectionString: `${process.env.POSTGRES_URL}?sslmode=require`,
    });
  }
} catch (err) {
  console.error("Error connecting to database", err);
  throw new Error("Error connecting to database");
}

export { pool };
