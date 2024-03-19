<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="grid h-screen grid-cols-[300px_1fr] gap-x-4">
    <div class="bg-blue-50 flex justify-between flex-col">
      <p>1</p>
      <div class="flex flex-col gap-2 p-2 ">
        <hr>
        <label for="jobDescription">Upload job description:</label>
        <textarea class="bg-white p-2" id="jobDescription" name="jobDescription" rows="5" cols="33">
        </textarea>
        <button class="bg-sky-800 text-white text-sm py-1 flex justify-center items-center">
          Submit
        </button>
      </div>
    </div>
    <div>
      <span>List of related CVs:</span>
      <ul>
        <li>
          CV1
        </li>
        <li>
          CV2
        </li>
      </ul>
    </div>
  </div>
</template>
