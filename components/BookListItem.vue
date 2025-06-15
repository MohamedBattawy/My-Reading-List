<template>
  <tr>
    <td class="book-title">{{ book.title }}</td>
    <td class="book-author">{{ book.author }}</td>
    <td>
      <button :class="['status-btn', book.status === 'unread' ? 'unread' : 'read']" @click="toggleStatus">{{ book.status }}</button>
    </td>
    <td>
      <button @click="confirmDelete">Delete</button>
    </td>
  </tr>
</template>

<script setup lang="ts">
const props = defineProps<{
  book: {
    title: string;
    author: string;
    status: string;
  }
}>();
const emit = defineEmits(['toggle-status', 'delete', 'update']);

function toggleStatus() {
  emit('update', props.book);
}

function confirmDelete() {
  if (window.confirm(`Are you sure you want to delete '${props.book.title}'?`)) {
    emit('delete', props.book);
  }
}
</script>

<style scoped>
.book-title {
  font-weight: bold;
  padding: 0.5rem 1rem;
}
.book-author {
  padding: 0.5rem 1rem;
}
td {
  text-align: right;
  padding: 0.5rem 1rem;
}
td:first-child {
  text-align: left;
}
button {
  margin: 0 0.25rem;
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #cbd5e1;
}
.status-btn {
  min-width: 80px;
  text-align: center;
  display: inline-block;
}
.status-btn.read {
  background: #d1fae5;
  color: #065f46;
}
.status-btn.unread {
  background: #fecaca;
  color: #991b1b;
}
</style> 