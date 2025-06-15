import { BOOK_MESSAGES } from '~/server/constants/messages';
import getDb from '../../database/db';
import type { Book, BookResponse } from '../../models/book';

export default defineEventHandler((event): BookResponse => {
    try {
        const db = getDb();
        const books = db.prepare('SELECT * FROM books').all() as Book[];
        return {
            success: true,
            data: books
        };
    } catch (error) {
        console.error('Error in GET /api/books:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : BOOK_MESSAGES.INTERNAL_SERVER_ERROR
        };
    }
}); 