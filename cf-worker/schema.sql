-- ============================================================
-- Pedro dApps Blog — D1 schema (Cloudflare)
-- Banco do sistema de notificações: e-mail + Web Push
-- ============================================================

CREATE TABLE IF NOT EXISTS emails (
  email      TEXT PRIMARY KEY,
  name       TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS push_subs (
  endpoint   TEXT PRIMARY KEY,
  p256dh     TEXT NOT NULL,
  auth       TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS kv (
  key   TEXT PRIMARY KEY,
  value TEXT
);
