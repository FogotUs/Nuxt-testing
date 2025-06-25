<script setup lang="ts">
import { useApp } from '~/store/app'
import Spinner from "~/components/Spinner.vue";
const toast = useToast()
const appStore = useApp()


// Показываем toast по store.notification
watch(
    () => appStore.notification.show,
    (show) => {
      if (show) {
        toast.add({
          title: appStore.notification.title,
          description: appStore.notification.message,
          color: appStore.notification.color,
          icon:
              appStore.notification.color === 'success'
                  ? 'i-heroicons-check-circle'
                  : 'i-heroicons-exclamation-circle',
        })

        appStore.removeNotification()
      }
    }
)
</script>

<template>
  <Header />
  <Spinner  v-if="appStore.loading"/>
  <main>
    <NuxtPage />
  </main>
</template>

<style scoped>
</style>
