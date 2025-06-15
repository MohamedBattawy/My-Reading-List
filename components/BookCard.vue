<template>
  <UCard class="max-w-md w-full mb-4">
    <template #header>
      <span class="font-semibold text-lg">{{ book.title }}</span>
    </template>
    <div class="mb-2">
      <span class="text-gray-500">Author:</span> {{ book.author }}
    </div>
    <div class="flex items-center gap-2 mb-2">
      <span class="text-gray-500">Status:</span>
      <UButton
        :color="book.status === 'read' ? 'green' : 'red'"
        @click="toggleStatus"
        size="sm"
      >
        {{ book.status }}
      </UButton>
    </div>
    <div class="flex justify-center">
      <UButton
        color="red"
        icon="i-heroicons-trash"
        size="sm"
        @click="deleteBook"
      >
        Delete
      </UButton>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { DisplayBook } from '~/server/models/book';

const props = defineProps<{
  book: DisplayBook
}>();
const emit = defineEmits(['update', 'delete']);

async function toggleStatus() {
  const newIsRead = props.book.status !== 'read' ? 1 : 0;
  try {
    const res = await fetch(`/api/books/${props.book.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_read: newIsRead })
    });
    const data = await res.json();
    if (data.success) {
      emit('update', { ...props.book, status: newIsRead === 1 ? 'read' : 'unread' });
    } else {
      alert(data.message || 'Failed to update book status.');
    }
  } catch (e) {
    alert('Failed to update book status.');
  }
}

async function deleteBook() {
  try {
    const res = await fetch(`/api/books/${props.book.id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      emit('delete', props.book.id);
    } else {
      alert(data.message || 'Failed to delete book.');
    }
  } catch (e) {
    alert('Failed to delete book.');
  }
}
</script> 