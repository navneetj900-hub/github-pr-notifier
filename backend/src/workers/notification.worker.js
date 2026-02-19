import { Worker } from "bullmq";
import { config } from "../config.js";

new Worker(
  "pr-notifications",
  async job => {
    console.log("📢 New PR Notification:");
    console.log(job.data);
  },
  { connection: { url: config.REDIS_URL } }
);
