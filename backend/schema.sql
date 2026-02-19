CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  github_id BIGINT UNIQUE,
  username TEXT,
  avatar_url TEXT,
  github_access_token TEXT
);

CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  repo_full_name TEXT,
  webhook_id BIGINT
);
