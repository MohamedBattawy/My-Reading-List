import { BOOK_MESSAGES } from '../../../constants/messages';
import getDb from '../../../database/db';
import type { BookResponse } from '../../../models/book';

export default defineEventHandler((event): BookResponse => {
    try {
        const id = Number(event.context.params?.id);
        
        if (!id) {
            return {
                success: false,
                message: BOOK_MESSAGES.INVALID_INPUT
            };
        }

        const db = getDb();
        
        const book = db.prepare('SELECT id FROM books WHERE id = ?').get(id);
        
        if (!book) {
            return {
                success: false,
                message: BOOK_MESSAGES.NOT_FOUND
            };
        }

        const stmt = db.prepare('DELETE FROM books WHERE id = ?');
        const result = stmt.run(id);

        if (result.changes > 0) {
            return {
                success: true,
                message: BOOK_MESSAGES.DELETE_SUCCESS
            };
        }

        return {
            success: false,
            message: BOOK_MESSAGES.INTERNAL_SERVER_ERROR
        };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : BOOK_MESSAGES.INTERNAL_SERVER_ERROR
        };
    }
}); 