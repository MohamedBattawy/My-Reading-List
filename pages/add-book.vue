<template>
  <div class="p-4 flex justify-center">
    <UCard class="w-full max-w-md">
      <template #header>
        <h2 class="text-xl font-semibold">Add a New Book</h2>
      </template>

      <form @submit.prevent="submitAddBook" class="space-y-4">
        <UFormGroup label="Book Name">
          <UInput v-model="book.title" placeholder="Enter book name" required />
        </UFormGroup>
        
        <UFormGroup label="Author">
          <UInput v-model="book.author" placeholder="Enter author name" required />
        </UFormGroup>

        <div class="flex justify-end gap-3">
          <UButton
            color="neutral"
            variant="soft"
            type="button"
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

const router = useRouter();
const book = ref({ title: '', author: '' });

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
    const data = await res.json();
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