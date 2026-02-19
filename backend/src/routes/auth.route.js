import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
import { config } from "../config.js";

const router = express.Router();

router.get("/github", (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${config.GITHUB_CLIENT_ID}&scope=repo user`;
  res.redirect(url);
});

router.get("/github/callback", async (req, res) => {
  const { code } = req.query;

  const tokenRes = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: config.GITHUB_CLIENT_ID,
      client_secret: config.GITHUB_CLIENT_SECRET,
      code
    },
    { headers: { Accept: "application/json" } }
  );

  const githubToken = tokenRes.data.access_token;

  const userRes = await axios.get("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${githubToken}` }
  });

  const ghUser = userRes.data;
  
  const result = await db.query(
    `INSERT INTO users (github_id, username, avatar_url, github_access_token)
     VALUES ($1,$2,$3,$4)
     ON CONFLICT (github_id)
     DO UPDATE SET github_access_token = $4
     RETURNING id, username, avatar_url`,
    [ghUser.id, ghUser.login, ghUser.avatar_url, githubToken]
  );

  const user = result.rows[0];

  const jwtToken = jwt.sign(
    { userId: user.id },
    config.JWT_SECRET,
    { expiresIn: "15m" }
  );

  res.cookie("access_token", jwtToken, {
    httpOnly: true,
    sameSite: "lax"
  });

  res.redirect(config.CLIENT_URL);
});

export default router;
