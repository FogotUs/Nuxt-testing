<script setup lang="ts">
import RegistrationForm from "~/components/Auth/RegistrationForm.vue";
import {useRoute} from "#imports";

const route = useRoute()
const query = route.query;

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
<div>
  <RegistrationForm :reffer="query.reffer?.toString()"/>
</div>
</template>

<style scoped>

</style>
