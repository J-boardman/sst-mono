<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
    <p>API URL: {{ api.defaults.baseURL }}</p>
    <q-form @submit.prevent="submit">
      <q-file color="purple-12" v-model="file" label="Label" :rules="[(val) => !!val || 'File is required']"></q-file>
      <q-btn type="submit" label="Submit" />
    </q-form>
    <a :href="api.defaults.baseURL + '/latest'">Download</a>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Todo, Meta } from './models';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

const $q = useQuasar();

interface Props {
  title: string;
  todos?: Todo[];
  meta: Meta;
  active: boolean;
};

console.log(import.meta.env)

const file = ref<File | null>(null);
async function submit() {
  const notification = $q.notify({
    message: 'Uploading file...',
    type: 'ongoing',
    icon: 'cloud_upload',
    position: 'bottom-right',
  });
  try {
    const formData = new FormData();
    if (!file.value) return;
    formData.append('file', file.value);
    await api.post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    notification({
      message: 'File uploaded successfully',
      type: 'positive',
      icon: 'check',
      timeout: 3000,
    });
  } catch (error) {
    console.error(error);
    notification({
      type: 'negative',
      message: 'File upload failed',
      icon: 'close',
      timeout: 3000,
    });
  }
}


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
