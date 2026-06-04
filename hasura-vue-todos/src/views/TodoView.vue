<template>
  <div>
    <h1>Todos</h1>
    <form @submit.prevent="onAdd">
      <input v-model="title" placeholder="New todo" />
      <button type="submit">Add</button>
    </form>

    <div v-if="todoStore.loading">Loading...</div>
    <ul>
      <li v-for="t in todoStore.todos" :key="t.id">
        <input type="checkbox" :checked="t.is_done" @change="todoStore.toggleTodo(t)" />
        <span :style="{ textDecoration: t.is_done ? 'line-through' : 'none' }">{{ t.title }}</span>
        <button @click="todoStore.deleteTodo(t.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTodoStore } from '../stores/todo.store'

const todoStore = useTodoStore()
const title = ref('')
let stopRealtime: (() => void) | null = null

onMounted(async () => {
  await todoStore.fetchTodos()
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => stopRealtime?.())

function onAdd() {
  todoStore.addTodo(title.value)
  title.value = ''
}
</script>