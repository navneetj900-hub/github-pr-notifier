import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: 4000,
  CLIENT_URL: "http://localhost:5173",
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  JWT_SECRET: "supersecret",
  REDIS_URL: "redis://localhost:6379"
};
