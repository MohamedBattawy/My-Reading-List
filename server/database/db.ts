import Database from 'better-sqlite3';
import { join, resolve } from 'path';

const projectRoot = resolve(process.cwd());
const dbPath = join(projectRoot, 'server', 'database', 'books.db');

let db: Database.Database;

export default function getDb(): Database.Database {
    if (!db) {
        db = new Database(dbPath);
    }
    return db;
}
