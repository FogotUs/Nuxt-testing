<script setup lang="ts">
import { useApp } from "~/store/app";
import { useUserStore } from "~/store/user";
import ReferalTable from "~/components/Account/ReferalTable.vue";
import PasswordChange from "~/components/Account/PasswordChange.vue";
import ReferalField from "~/components/Account/ReferalField.vue";

const router = useRouter();
const appStore = useApp()
const userStore = useUserStore()

definePageMeta({
  middleware: ['auth']
})

onBeforeMount(() => {
  if (userStore.user) {
    userStore.fetchUser(userStore.user.data.login)
  }
  else {
    router.push("/login")
    appStore.createNotification('neutral','Повторите авторизацию','')
  }
})
</script>

<template>
<section class="flex flex-col gap-11">
  <div class="flex  flex-col gap-11">
    <PasswordChange/>
    <ReferalField/>
  </div>
  <div class="flex flex-col gap-y-5">
    <h2 class="dark:text-gray-300">Ваши рефералы</h2>
    <ReferalTable v-if="userStore.user" :nodes="userStore.user.data.children"/>
  </div>
</section>
</template>

<style scoped>

</style>
