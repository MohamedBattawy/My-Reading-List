<template>
  <div>
    <div class="add-btn-wrapper">
      <UButton color="primary" @click="goToAddBook">Add Book</UButton>
    </div>
    <UTable :data="books" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import { h, ref, resolveComponent } from 'vue';
import { useRouter } from 'vue-router';
import type { Book } from '~/server/models/book';

interface DisplayBook {
  id: number;
  title: string;
  author: string;
  status: string;
}

const UButton = resolveComponent('UButton');
const USwitch = resolveComponent('USwitch');

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

const router = useRouter();

const columns = [
  { accessorKey: 'title', header: 'Book Name' },
  { accessorKey: 'author', header: 'Author' },
  { accessorKey: 'status', header: 'Status',
    cell: ({ row }: { row: any }) =>
      h(
        UButton,
        {
          color: row.original.status === 'read' ? 'primary' : 'error',
          onClick: () => updateBook(row.original, row.original.status !== 'read')
        },
        () => row.original.status
      )
  },
  {
    id: 'actions',
    header: 'Actions',
    enableSorting: false,
    cell: ({ row }: { row: any }) =>
      h(
        UButton,
        {
          color: 'error',
          onClick: () => deleteBook(row.original)
        },
        () => 'Delete'
      )
  }
];

function goToAddBook() {
  router.push('/add-book');
}

async function deleteBook(book: DisplayBook) {
  try {
    const res = await fetch(`/api/books/${book.id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      books.value = books.value.filter(b => b.id !== book.id);
    } else {
      alert(data.message || 'Failed to delete book.');
    }
  } catch (e) {
    alert('Failed to delete book.');
  }
}

async function updateBook(book: DisplayBook, val: boolean) {
  const newIsRead = val ? 1 : 0;
  try {
    const res = await fetch(`/api/books/${book.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_read: newIsRead })
    });
    const data = await res.json();
    if (data.success) {
      book.status = newIsRead === 1 ? 'read' : 'unread';
    } else {
      alert(data.message || 'Failed to update book status.');
    }
  } catch (e) {
    alert('Failed to update book status.');
  }
}
</script>

<style scoped>
.add-btn-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.ml-2 {
  margin-left: 0.5rem;
}
</style> 