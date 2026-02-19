import express from "express";
import { addPRJob } from "../services/queue.service.js";

const router = express.Router();

router.post("/github", async (req, res) => {
  const event = req.headers["x-github-event"];

  if (event === "pull_request" && req.body.action === "opened") {
    await addPRJob({
      repo: req.body.repository.full_name,
      title: req.body.pull_request.title,
      url: req.body.pull_request.html_url
    });
  }

  res.sendStatus(200);
});

export default router;
