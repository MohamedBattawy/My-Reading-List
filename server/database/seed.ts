import getDb from './db';
import { runSchema } from './schema';

const books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', is_read: 0 },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', is_read: 0 },
    { title: '1984', author: 'George Orwell', is_read: 0 }
];

export const seedDatabase = () => {
    const db = getDb();
    
    const insertBook = db.prepare(`
        INSERT INTO books (title, author, is_read)
        SELECT @title, @author, @is_read
        WHERE NOT EXISTS (
            SELECT 1 FROM books 
            WHERE title = @title AND author = @author
        )
    `);

    const insertMany = db.transaction((books) => {
        for (const book of books) {
            insertBook.run(book);
        }
    });

    insertMany(books);
};

try {
    runSchema();
    seedDatabase();
    console.log('Database seeded successfully!');
} catch (error) {
    console.error('Error seeding database:', error);
} 