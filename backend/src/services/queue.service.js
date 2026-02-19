import { Queue } from "bullmq";
import { config } from "../config.js";

export const queue = new Queue("pr-notifications", {
  connection: { url: config.REDIS_URL }
});

export const addPRJob = async (data) => {
  await queue.add("new-pr", data);
};
