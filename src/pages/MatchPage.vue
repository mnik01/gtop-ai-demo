<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <form action="#">
    <div>
      <label for="jobDescription">Job description:</label>
      <textarea required class="bg-white p-2" id="jobDescription" name="jobDescription" rows="5" cols="33">
      </textarea>
    </div>
    <div>
      <label for="cv">CV:</label>
      <textarea required class="bg-white p-2" id="cv" name="cv" rows="5" cols="33">
      </textarea>
    </div>
    <button type="submit">submit</button>
  </form>
  <span>output:</span>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
