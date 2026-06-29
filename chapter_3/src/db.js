import { DatabaseSync } from 'node:sqlite';

// 标记函数，让 prettier-plugin-sql 识别并格式化 SQL
const sql = (strings) => strings.join('');

const db = new DatabaseSync(':memory:');

db.exec(sql`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

db.exec(sql`
  CREATE TABLE todos (
    id INTEGER   PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    task TEXT,
    completed BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )
`);

export default db