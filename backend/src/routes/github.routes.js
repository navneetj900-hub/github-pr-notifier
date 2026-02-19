import express from "express";
import axios from "axios";
import { db } from "../db.js";

const router = express.Router();

router.get("/repos", async (req, res) => {
  const userId = req.user.userId;

  const user = await db.query(
    "SELECT github_access_token FROM users WHERE id=$1",
    [userId]
  );

  const token = user.rows[0].github_access_token;

  const repos = await axios.get("https://api.github.com/user/repos", {
    headers: { Authorization: `Bearer ${token}` }
  });

  res.json(repos.data);
});

export default router;

router.post("/subscribe", async (req, res) => {
  const { repoFullName } = req.body;
  const userId = req.user.userId;

  const user = await db.query(
    "SELECT github_access_token FROM users WHERE id=$1",
    [userId]
  );

  const token = user.rows[0].github_access_token;

  const [owner, repo] = repoFullName.split("/");

  const webhook = await axios.post(
    `https://api.github.com/repos/${owner}/${repo}/hooks`,
    {
      name: "web",
      events: ["pull_request"],
      config: {
        url: "https://your-ngrok-url/webhook/github",
        content_type: "json"
      }
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  await db.query(
    "INSERT INTO subscriptions (user_id, repo_full_name, webhook_id) VALUES ($1,$2,$3)",
    [userId, repoFullName, webhook.data.id]
  );

  res.json({ success: true });
});
