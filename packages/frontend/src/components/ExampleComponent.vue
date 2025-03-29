<template>
  <div>
    <p>{{ title }}</p>
    <p>{{ apiUrl }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Todo, Meta } from './models';
import { api } from 'src/boot/axios';

const apiUrl = process.env.VITE_API_URL;
console.log('api url', apiUrl);
console.log('import.meta.env', import.meta.env);
console.log('process.env', process.env);

interface Props {
  title: string;
  todos?: Todo[];
  meta: Meta;
  active: boolean;
};

async function getApiUrl() {
  try {

    console.log('api.baseUrl', api.defaults.baseURL);
    const response = await api({
      method: 'GET',
      url: '/'
    });
    console.log('response', response);
  } catch (error) {
    console.error('error', error);
  }
}

await getApiUrl();

const props = withDefaults(defineProps<Props>(), {
  todos: () => []
});

const clickCount = ref(0);
function increment() {
  clickCount.value += 1;
  return clickCount.value;
}

const todoCount = computed(() => props.todos.length);
</script>
