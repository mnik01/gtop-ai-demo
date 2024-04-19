<script setup lang="ts">
import { computed, ref } from 'vue'

const hasListOfRelatedCVs = ref(true);
const cvs = ref<{text:string, description: string | null, percentage: null | string}[]>([
  { text: 'Name: Maxim Nikonov, Age: 22, Position: Sr. Web Designer at kandasoftware. Figma Adobe XD 3 years of experience', percentage: null, description: null },
  { text: 'Name: Nikola Greenberg, Age: 34, Position: Sr. Frontend developer at EPAM. React Typescript', percentage: null, description: null },
  {
    text: `
    Name: Jane Doe
Age: 24
Position: Middle FullStack developer JS/TS
Sex: Male
Description: 3 years of experience in web development. Tools: git, figma, jira, linear, react, ts, js, redux, github, gitlab, mobx, typescript, js, OOP, ES6, html, css, nodejs, CI/CD
Experience:
- 1 year at Envato as a Middle Fullstack dev
- 2 years at Technodom as a junior FE dev`,
percentage: null, description: null,
  },
  {
    text: `
    Name: Iogan Kostanay
    Position: Senior Python Developer, data scientist
Pune, Maharashtra , India | (+91) 1234567890 
example@gmail.com | linkedin.com/in/example | github.com/example
Professional Skills
Programming Language: Python , Go , R , Scala , Java , Rust, Data Analysis : Pandas , NumPy , Scikit-Learn , TensorFlow, Plotly ,
PyTorch , Matplotlib , Seaborn , Jupyter Notebook, Data Warehousing: Snowflake , Redshift , Postgres , AWS (S3, EC2, EMR), Apache
Iceberg, DBT , ETL , Looker, Git , PowerBI , Excel , Amazon SageMaker, Apache Spark, Sagemaker, Statistics : Bayesian , A/B Test ,
Hypothesis Testing, Cloud Platforms : AWS, GCP, Azure, ML: Regression , Classification , Clustering , Time Series, Databses : SQL ,
NoSQL, KuberFlow , Spark , Athena , Langchain, LlamaIndex,Vector DB, CI/CD, Devops, MLops,, Mixpanel , Braze , Segment,AWS`,
    percentage: null, description: null,
  },
  {
    text: `
    Name: Stanislav Ejiro
    Position: Junior Python Developer, backend
    Skills: Python, Django, Flask, FastAPI, SQL, PostgreSQL, MySQL, SQLite, MongoDB, Redis, RabbitMQ, Celery, Docker, Git, Linux, REST API
    `,
    percentage: null, description: null,
  }
]);
const error = ref('');
const isLoading = ref(false);
const inputJob = ref(`UX UI Designer at ACME inc. We're looking for UX UI Designer with 4 years of experience and 2 years of experience with figma`);
const sorting = ref('desc');
const reverseSorting = () => {
  sorting.value = sorting.value === 'asc' ? 'desc' : 'asc';
}
const cvsHasPercentages = computed(() => cvs.value.every(cv => cv.percentage));
const cvsSorted = computed(() => {
  if (!cvsHasPercentages.value) return cvs.value;
  // @ts-expect-error not narrowed
  return cvs.value.sort((a, b) => sorting.value === 'asc' ? a.percentage - b.percentage : b.percentage - a.percentage);
});

const cache = new Map<string, { percentage: string; description: string }>();

const onSubmit = async () => {
  isLoading.value = true;
  try {
    const promises = cvs.value.map(cv => {
      const cacheKey = `${inputJob.value}-${cv.text}`;

      if (cache.has(cacheKey)) {
        const cachedData = cache.get(cacheKey);
        cv.percentage = cachedData?.percentage || 'No data';
        cv.description = cachedData?.description || 'No data';
        return new Promise(resolve => setTimeout(resolve, 200));
      }

      return fetch('https://heavy-hawk-25.deno.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_job: inputJob.value,
          input_cv: cv.text,
        }),
      })
        .then(res => res.json())
        .then(json => {
          if (json?.percentage && json?.description) {
            cv.percentage = json.percentage;
            cv.description = json.description;
            cache.set(cacheKey, json);
          } else {
            cv.percentage = 'No data';
            cv.description = 'No data';
          }
        })
        .catch(err => {
          error.value = JSON.stringify(err);
          console.error(err);
          cv.percentage = 'No data';
          cv.description = 'No data';
        });
    });

    await Promise.all(promises);
  } catch (err) {
    error.value = JSON.stringify(err);
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}
</script>


<template>
  <div class="h-screen flex-wrap flex gap-4">
    <div class="sm:max-w-[300px] max-sm:w-full bg-blue-50 flex justify-between flex-col">
      <div class="p-2">
        <fieldset class="*:w-full *:flex *:gap-2 mt-2">
          <legend>Параметры:</legend>
            <div>
              <input type="radio" id="huey" name="drone" value="huey" checked />
              <label for="huey">Умная сортировка</label>
            </div>
            <div>
              <input disabled type="radio" id="dewey" name="drone" value="dewey" />
              <label class="cursor-not-allowed text-neutral-600" for="dewey">Сортировка по матрице</label>
            </div>
            <div>
              <input disabled type="radio" id="louie" name="drone" value="louie" />
              <label class="cursor-not-allowed text-neutral-600" for="louie">Комбинированная сортировка</label>
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
    <div class="px-4 max-sm:pb-48 max-w-[800px] py-2 sm:border-l">
      <div class="w-full flex justify-between">
        <span>Резюме кандидатов:</span>
        <button @click="reverseSorting" type="button" v-if="hasListOfRelatedCVs && cvsHasPercentages" class="bg-blue-50 relative size-6 rounded cursor-pointer">
          <svg :class="sorting === 'asc' ? 'rotate-180' : ''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
          </svg>
        </button>
      </div>
      <p v-if="!hasListOfRelatedCVs" class="text-sm text-neutral-600">Submit job description to see list of related CVs or <button class="cursor-pointer underline">see all CVs</button></p>
      <ul :class="isLoading ? 'opacity-50 cursor-not-allowed cursor-wait' : ''" v-else class="mt-4 space-y-2">
        <li v-for="cv in cvsSorted" :key="cv.text" class="bg-white flex sm:flex-row flex-col p-2 border rounded-lg flex justify-between items-center gap-2">
          <span>
            {{cv.text}}
          </span>
          <button class="underline peer" v-if="cv.percentage">
            {{cv.percentage === 'No data' ? 'No data' : `${cv.percentage}%`}}
          </button>
          <div class="peer-hover:block bg-neutral-700 p-2 h-32 max-w-[600px] bottom-3 text-sm rounded text-white hidden fixed">
            {{cv.description}}
          </div>
        </li>
      </ul>
    </div>
    <div v-if="!!error" class="px-4 max-sm:pb-48 max-w-[800px] py-2 sm:border-l">
      <span>Ошибка:</span>
      <p>{{error}}</p>
    </div>
  </div>
</template>

