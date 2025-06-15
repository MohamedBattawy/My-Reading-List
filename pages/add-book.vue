<template>
  <div class="p-4 flex justify-center">
    <UCard class="w-full max-w-md">
      <template #header>
        <h2 class="text-xl font-semibold">Add a New Book</h2>
      </template>

      <form @submit.prevent="submitAddBook" class="space-y-4">
        <UInput
          v-model="book.title"
          label="Book Name"
          placeholder="Enter book name"
          required
        />
        
        <UInput
          v-model="book.author"
          label="Author"
          placeholder="Enter author name"
          required
        />

        <div class="flex justify-end gap-3">
          <UButton
            color="gray"
            @click="goBack"
          >
            Back
          </UButton>
          <UButton
            color="primary"
            type="submit"
          >
            Submit
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { BookInput, BookResponse } from '~/server/models/book';

const router = useRouter();
const book = ref<BookInput>({ title: '', author: '' });

async function submitAddBook() {
  if (!book.value.title.trim() || !book.value.author.trim()) {
    alert('Please fill in all required fields');
    return;
  }

  try {
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...book.value, is_read: 0 })
    });
    const data = await res.json() as BookResponse;
    if (data.success) {
      router.push('/');
    } else {
      alert(data.message || 'Failed to add book.');
    }
  } catch (e) {
    alert('Failed to add book.');
  }
}

function goBack() {
  router.push('/');
}
</script> 