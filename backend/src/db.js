import pkg from "pg";
const { Pool } = pkg;

export const db = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/github_app"
});
