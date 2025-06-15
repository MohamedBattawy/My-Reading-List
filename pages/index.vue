<template>
  <div>
    <div class="add-btn-wrapper">
      <UButton color="primary" @click="goToAddBook">Add Book</UButton>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <BookCard
        v-for="book in books"
        :key="book.id"
        :book="book"
        @update="updateBookInList"
        @delete="removeBookFromList"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Book, DisplayBook } from '~/server/models/book';

const router = useRouter();
const { data: booksData } = await useFetch<{ success: boolean, data: Book[] }>('/api/books');
const books = ref<DisplayBook[]>(
  booksData.value?.success && Array.isArray(booksData.value.data)
    ? booksData.value.data.map(b => ({
        id: b.id,
        title: b.title,
        author: b.author,
        status: b.is_read === 1 ? 'read' : 'unread'
      }))
    : []
);

function goToAddBook() {
  router.push('/add-book');
}

function updateBookInList(updatedBook: DisplayBook) {
  const index = books.value.findIndex(b => b.id === updatedBook.id);
  if (index !== -1) {
    books.value[index] = updatedBook;
  }
}

function removeBookFromList(bookId: number) {
  books.value = books.value.filter(b => b.id !== bookId);
}
</script>

<style scoped>
.add-btn-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
</style> 