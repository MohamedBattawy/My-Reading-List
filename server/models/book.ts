export interface Book {
    id: number;
    title: string;
    author: string;
    is_read: number;
}

export interface BookInput {
    title: string;
    author: string;
    is_read?: number;
}

export type BookResponse = {
    success: boolean;
    data?: Book | Book[];
    message?: string;
  };