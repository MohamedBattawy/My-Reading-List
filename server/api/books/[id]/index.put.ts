import { BOOK_MESSAGES } from '../../../constants/messages';
import getDb from '../../../database/db';
import type { BookResponse } from '../../../models/book';

interface BookStatus {
    is_read: number;
}

export default defineEventHandler(async (event): Promise<BookResponse> => {
    try {
        const id = Number(event.context.params?.id);
        
        if (!id) {
            return {
                success: false,
                message: BOOK_MESSAGES.INVALID_INPUT
            };
        }

        const db = getDb();
        const currentBook = db.prepare('SELECT is_read FROM books WHERE id = ?').get(id) as BookStatus | undefined;
        
        if (!currentBook) {
            return {
                success: false,
                message: BOOK_MESSAGES.NOT_FOUND
            };
        }

        const newStatus = currentBook.is_read === 0 ? 1 : 0;
        const stmt = db.prepare('UPDATE books SET is_read = ? WHERE id = ?');
        const result = stmt.run(newStatus, id);

        if (result.changes > 0) {
            return {
                success: true,
                message: BOOK_MESSAGES.UPDATE_SUCCESS
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