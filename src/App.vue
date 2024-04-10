<script setup lang="ts">
</script>

<template>
  <nav class="fixed capitalize bottom-0 right-0 text-sm flex gap-2 bg-blue-50 px-2 underline rounded-t-lg py-1">
    <RouterLink v-if="$route.path !== '/'" to="/">demo page</RouterLink>
    <RouterLink v-else to="/match">matcher page</RouterLink>
    <!-- <RouterLink to="/modify">modifier page</RouterLink> -->
  </nav>
  <main>
    <RouterView />
  </main>
</template>
