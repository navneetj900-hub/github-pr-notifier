GitHub PR Notifier
  Overview
This project is a full-stack web application that integrates with GitHub.
It allows users to:
Authenticate using GitHub OAuth
View their GitHub profile
View public & private repositories
Subscribe to repositories
Receive notifications for new Pull Requests via webhooks and Pub/Sub
 Architecture
The system is divided into two domains:
1 Authentication & Authorization
GitHub OAuth for identity
Backend stores GitHub access token securely
App issues JWT for session management
 2 GitHub Integration Domain
Fetch repositories using GitHub API
Subscribe to repositories
Create GitHub webhooks for PR events
Process events asynchronously using BullMQ
Send notifications (console/email)
  End-to-End Flow
User logs in via GitHub OAuth
Backend exchanges code for GitHub access token
User record is created/updated in DB
App issues JWT session
User fetches repositories
User subscribes to a repository
Backend creates GitHub webhook
GitHub sends pull_request event
Backend pushes job to queue
Worker processes job and sends notification
 Tech Stack
Frontend
React (Vite)
Backend
Node.js
Express.js
PostgreSQL
BullMQ (Pub/Sub)
Redis
Integration
GitHub OAuth
GitHub Webhooks
 Database Schema
Located in:
Copy code

backend/schema.sql
Tables:
users
subscriptions
* Local Setup

1. Clone repository
Copy code

git clone <repo-url>
cd github-pr-notifier

2. Setup Backend
Copy code

cd backend
npm install
Create .env file:
Copy code

GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
Start server:
Copy code

node src/server.js
3. Start Worker
Copy code

node src/workers/notification.worker.js
4. Setup Frontend
Copy code

cd frontend
npm install
npm run dev
5. Expose Webhook (Development)
Copy code

ngrok http 4000
Update webhook URL in subscribe API.

Security Considerations
GitHub access tokens stored server-side only
JWT stored in HTTP-only cookies
Webhooks validated using GitHub event headers
Refresh token rotation architecture discussed

Scalability
Async processing via BullMQ
Webhook → Queue → Worker model
Auth domain separated from business logic
Easily extendable to multi-device sessions
