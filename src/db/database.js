import Database from 'better-sqlite3';
const db = new Database('urls.db');

// создаём таблицу если её нет
db.prepare(`
  CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    originalUrl TEXT NOT NULL,
    shortId TEXT NOT NULL UNIQUE,
    clicks INTEGER DEFAULT 0,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )
`).run();

export default db;