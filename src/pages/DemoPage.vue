<script setup lang="ts">
import { ref } from 'vue'

const hasListOfRelatedCVs = ref(true);
const cvs = ref([
  { text: 'Name: Maxim Nikonov, Age: 22, Position: Sr. Web Designer at kandasoftware. Figma Adobe XD 3 years of experience', percentage: null },
  { text: 'Name: Maxim Nikonov, Age: 22, Position: Sr. Frontend developer at kandasoftware. React Typescript', percentage: null },
]);

const isLoading = ref(false);
const inputJob = ref(`UX UI Designer at ACME inc. We're looking for UX UI Designer with 4 years of experience and 2 years of experience with figma`);


const onSubmit = async () => {
  isLoading.value = true;
  try {
    const [response1, response2] = await Promise.all([
      fetch('https://heavy-hawk-25.deno.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_job: inputJob.value,
          input_cv: cvs.value[0].text,
        }),
      }),
      fetch('https://heavy-hawk-25.deno.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_job: inputJob.value,
          input_cv: cvs.value[1].text,
        }),
      }),
    ]);

    const [data1, data2] = await Promise.all([response1.json(), response2.json()]);
    cvs.value[0].percentage = data1?.percentage || 'No data';
    cvs.value[1].percentage = data2?.percentage || 'No data';
    
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

</script>

<template>
  <div class="grid h-screen grid-cols-[300px_1fr] gap-x-4">
    <div class="bg-blue-50 flex justify-between flex-col">
      <div class="p-2">
        <fieldset class="*:w-full *:flex *:gap-2 mt-2">
          <legend>Параметры:</legend>
            <div>
              <input type="radio" id="huey" name="drone" value="huey" checked />
              <label for="huey">Умная сортировка</label>
            </div>
            <div>
              <input type="radio" id="dewey" name="drone" value="dewey" />
              <label for="dewey">Сортировка по матрице</label>
            </div>
            <div>
              <input type="radio" id="louie" name="drone" value="louie" />
              <label for="louie">Комбинированная сортировка</label>
            </div>
        </fieldset>
      </div>
      <div class="flex flex-col p-2 gap-2">
        <hr>
        <label for="jobDescription">Описание вакансии:</label>
        <textarea required v-model="inputJob" class="bg-white p-2" id="jobDescription" name="jobDescription" rows="5" cols="33" />
        <button 
          @click="onSubmit"
          :class="isLoading ? 'cursor-not-allowed bg-sky-300' : 'cursor-pointer bg-sky-600'"
          class="text-white text-sm py-1 flex justify-center items-center"
        >
          Сортировать
        </button>
      </div>
    </div>
    <div class="px-4 py-2 border-l">
      <span>Резюме кандидатов:</span>
      <p v-if="!hasListOfRelatedCVs" class="text-sm text-neutral-600">Submit job description to see list of related CVs or <button class="cursor-pointer underline">see all CVs</button></p>
      <ul v-else class="mt-4">
        <li>
          {{cvs[0].percentage || '?'}}% - {{cvs[0].text}}
        </li>
        <li>
          {{cvs[1].percentage || '?'}}% - {{cvs[1].text}}
        </li>
      </ul>
    </div>
  </div>
</template>

