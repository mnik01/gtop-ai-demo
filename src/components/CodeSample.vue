<script lang="ts" setup>
import { ref } from 'vue';

const isCopied = ref(false);
// Unique ID for each component instance
const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const onCopy = () => {
  const text = document.getElementById(`copy-${id}`)?.textContent;
  if (!text) return;

  navigator.clipboard.writeText(text);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 2000);
}
</script>

<template>
  <div class="relative truncate border border-black/10 overflow-hidden w-64 flex items-center pl-3 py-2 bg-neutral-50 rounded-md text-sm">
    <span :id="`copy-${id}`"><slot /></span>
    <button type="button" @click="onCopy" class="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 cursor-pointer bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex absolute items-center justify-center">
      <span v-if="!isCopied" id="default-icon">
          <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
          </svg>
      </span>
      <span v-else id="success-icon" class="hidden inline-flex items-center">
          <svg class="w-3.5 h-3.5 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
          </svg>
      </span>
    </button>
  </div>
</template>