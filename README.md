# Book Management System

A simple web application to manage your book collection. Built with Nuxt 3, SQLite, and Nuxt UI.

## Features

- View all your books in a table format
- Add new books to your collection
- Mark books as read/unread
- Delete books from your collection
- Clean and modern UI using Nuxt UI components

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/MohamedBattawy/My-Reading-List.git
cd My-Reading-List
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the database:
```bash
npm run seed
```
This command will create the SQLite database file at `server/database/books.db` and populate it with some sample books. This step is required before starting the application.

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

## Using the Application

1. **View Books**
   - All books are displayed in a table on the home page
   - The table shows each book's title, author, and read status

2. **Add a Book**
   - Click the "Add Book" button at the top of the page
   - Fill in the book's title and author
   - Click "Submit" to add the book

3. **Update Book Status**
   - Click the status button (read/unread) to toggle a book's read status
   - The status will update immediately

4. **Delete a Book**
   - Click the "Delete" button next to any book to remove it from your collection

## Project Structure

- `pages/` - Contains the main pages of the application
- `server/` - Backend API endpoints and database configuration
- `components/` - Reusable Vue components
- `database/` - SQLite database configuration and initialization

## Development

To run the application in development mode with hot-reload:
```bash
npm run dev
```

## Production

To build the application for production:

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## Technologies Used

- [Nuxt 3](https://nuxt.com/) - The Vue.js Framework
- [SQLite](https://www.sqlite.org/) - Database
- [Nuxt UI](https://ui.nuxt.com/) - UI Components
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) - SQLite client for Node.js
