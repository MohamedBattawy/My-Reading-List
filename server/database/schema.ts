import getDb from './db';

export const runSchema = () => {
    const db = getDb();
    db.exec(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            is_read INTEGER NOT NULL DEFAULT 0
        )
    `);
}; 