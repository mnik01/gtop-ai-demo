<script setup lang="ts">
import { ref } from 'vue'

const hasListOfRelatedCVs = ref(true);
</script>

<template>
  <div class="grid h-screen grid-cols-[300px_1fr] gap-x-4">
    <div class="bg-blue-50 flex justify-between flex-col">
      <div class="p-2">
        Settings
        <fieldset class="*:w-full *:flex *:gap-2 mt-2">
          <div>
            <input checked type="checkbox" id="withAI" name="withAI">
            <label for="withAI">Weighted by AI</label>
          </div>
          <div>
            <input checked type="checkbox" id="withAI" name="withAI">
            <label for="withAI">Weighted by skill matrix</label>
          </div>
        </fieldset>
      </div>
      <div class="flex flex-col p-2 gap-2">
        <hr>
        <label for="jobDescription">Job description:</label>
        <textarea class="bg-white p-2" id="jobDescription" name="jobDescription" rows="5" cols="33">
        </textarea>
        <button class="bg-sky-800 text-white text-sm py-1 flex justify-center items-center">
          Submit
        </button>
      </div>
    </div>
    <div class="px-4 py-2 border-l">
      <span>List of related CVs:</span>
      <p v-if="!hasListOfRelatedCVs" class="text-sm text-neutral-600">Submit job description to see list of related CVs or <button class="cursor-pointer underline">see all CVs</button></p>
      <ul v-else class="mt-4">
        <li>
          Name: Maxim Nikonov, Age: 22, Position: Sr. Web Designer at kandasoftware. Figma Adobe XD 3 years of experience
        </li>
        <li>
          Name: Maxim Nikonov, Age: 22, Position: Sr. Frontend developer at kandasoftware. React Typescript
        </li>
      </ul>
    </div>
  </div>
</template>

