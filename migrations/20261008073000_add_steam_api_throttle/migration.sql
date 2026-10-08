CREATE TABLE "SteamApiThrottle" (
  "id" TEXT NOT NULL,
  "next_allowed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lease_token" TEXT,
  "lease_until" TIMESTAMP(3),
  CONSTRAINT "SteamApiThrottle_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "SteamApiThrottle" ENABLE ROW LEVEL SECURITY;
