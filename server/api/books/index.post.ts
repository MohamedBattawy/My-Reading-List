import { BOOK_MESSAGES } from '../../constants/messages';
import getDb from '../../database/db';
import type { Book, BookInput, BookResponse } from '../../models/book';

export default defineEventHandler(async (event): Promise<BookResponse> => {
    try {
        const body = await readBody(event) as BookInput;
        
        if (!body.title || !body.author) {
            return {
                success: false,
                message: BOOK_MESSAGES.INVALID_INPUT
            };
        }

        const db = getDb();
        const stmt = db.prepare('INSERT INTO books (title, author, is_read) VALUES (?, ?, ?)');
        const result = stmt.run(body.title, body.author, body.is_read ?? 0);
        
        if (result.lastInsertRowid) {
            const createdBook: Book = {
                id: result.lastInsertRowid as number,
                title: body.title,
                author: body.author,
                is_read: body.is_read ?? 0
            };
            
            return {
                success: true,
                data: createdBook,
                message: BOOK_MESSAGES.CREATE_SUCCESS
            };
        }
        
        return {
            success: false,
            message: BOOK_MESSAGES.INTERNAL_SERVER_ERROR
        };
    } catch (error) {
        console.error('Error in POST /api/books:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : BOOK_MESSAGES.INTERNAL_SERVER_ERROR
        };
    }
}); 