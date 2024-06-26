<script setup lang="ts">
import { ref, computed } from 'vue';
import CodeSample from '../components/CodeSample.vue';
import { getHash } from '../getHash';

const outputPercentage = ref('');
const outputDescription = ref('');

const hasOutput = computed(() => outputPercentage.value !== '' && outputDescription.value !== '');

const hasError = ref(false);
const errorContent = ref('');

const isLoading = ref(false);
const inputJob = ref('');
const inputCV = ref('');

const cache = new Map<string, string>();

const onSubmit = async (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  
  const cacheKey = `${getHash(inputJob.value)}-${getHash(inputCV.value)}`;
  
  isLoading.value = true;
  try {
    if (cache.has(cacheKey)) {
      const resp = JSON.parse(cache.get(cacheKey)!);
      outputPercentage.value = resp.percentage;
      outputDescription.value = resp.description;
      
      await new Promise((resolve) => setTimeout(resolve, 200));
      return;
    }
    const response = await fetch('https://heavy-hawk-25.deno.dev/', {
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

    cache.set(cacheKey, JSON.stringify(data));
  } catch (error) {
    hasError.value = true;
    errorContent.value = JSON.stringify(error, Object.getOwnPropertyNames(error))
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
  

</script>

<template>
  <div class="flex flex-wrap w-screen gap-12">
    <form @submit="onSubmit" class="max-w-md pl-3">
      <div class="grid gap-2">
        <label for="jobDescription">Описание вакансии:</label>
        <textarea 
          required
          class="bg-white w-full"
          id="jobDescription"
          name="jobDescription"
          rows="5"
          v-model="inputJob"
          cols="33" 
        />
        <label for="cv">Резюме:</label>
        <textarea
          required
          class="bg-white w-full"
          id="cv"
          v-model="inputCV"
          name="cv"
          rows="5"
          cols="33"
        />
      </div>
      <button
        class="text-white text-sm w-full py-2 mt-2 uppercase tracking-wide" 
        type="submit"
        :class="isLoading ? 'cursor-not-allowed bg-sky-300' : 'cursor-pointer bg-sky-600'"
      >
        сравнить
      </button>
    </form>
    <section>
      <p class="pb-2">Пример</p>
      <code>
        <span>
          Job:
        </span>
        <code-sample>
          UX UI Designer at ACME inc. We're looking for UX UI Designer with 4 years of experience and 2 years of experience with figma
        </code-sample>
      </code>
      <code>
        <span>
          CV:
        </span>
        <code-sample>
            Name: Maxim Nikonov, Age: 22, Position: Sr. Web Designer at kandasoftware. Figma Adobe XD 3 years of experience
        </code-sample>
      </code>
    </section>
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

