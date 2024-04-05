<script setup lang="ts">
import { ref, computed } from 'vue'

defineProps<{ msg: string }>()

const outputPercentage = ref('');
const outputDescription = ref('');

const hasOutput = computed(() => outputPercentage.value !== '' && outputDescription.value !== '');

const hasError = ref(false);
const errorContent = ref('');

const isLoading = ref(false);
const inputJob = ref('');
const inputCV = ref('');

const onSubmit = async () => {
  isLoading.value = true;
  try {
    const response = await fetch('https://gtop-ai.mnik01.workers.dev/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input_job: inputJob.value,
        input_cv: inputCV.value,
      }),
    });
    const data = await response.json();
    outputPercentage.value = data?.percentage || 'No data';
    outputDescription.value = data?.description || 'No data';
  } catch (error) {
    hasError.value = true;
    errorContent.value = JSON.stringify(error);
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
  

</script>

<template>
  <div class="flex gap-12">
    <div class="max-w-md pl-3">
      <div class="grid">
        <label for="jobDescription">Описание вакансии:</label>
        <textarea 
          required
          class="bg-white p-2"
          id="jobDescription"
          name="jobDescription"
          rows="5"
          v-model="inputJob"
          cols="33" 
        />
        <label for="cv">Резюме:</label>
        <textarea
          required
          class="bg-white
          p-2"
          id="cv"
          v-model="inputCV"
          name="cv"
          rows="5"
          cols="33"
        />
      </div>
      <button
        class="text-white text-sm w-full py-2 mt-2 uppercase tracking-wide" 
        type="button"
        @click="onSubmit"
        :class="isLoading ? 'cursor-not-allowed bg-sky-300' : 'cursor-pointer bg-sky-600'"
      >
        сравнить
    </button>
  </div>
  <div>
    <p class="pb-2">Пример</p>
    Job: <pre>UX UI Designer at ACME inc. We're looking for UX UI Designer with 4 years of experience and 2 years of experience with figma</pre>
    CV: <pre>Name: Maxim Nikonov, Age: 22, Position: Sr. Web Designer at kandasoftware. Figma Adobe XD 3 years of experience</pre>
  </div>
  </div>
  <div v-if="hasOutput" class="pl-3">
    <div>
      <span>
        Подходит на: 
      </span>
      <p>
        {{outputPercentage}}%
      </p>
    </div>
    <div>
      <span>
        Объяснение: 
      </span>
      <p>
        {{outputDescription}}
      </p>
    </div>
  </div>
  <div v-if="hasError" class="pl-3">
    <span>Ошибка:</span>
    <span>
      {{errorContent}}
    </span>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
