<script setup lang="ts">
import LoginForm from "~/components/Auth/LoginForm.vue";

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div>
    <LoginForm/>
  </div>
</template>

<style scoped>

</style>
