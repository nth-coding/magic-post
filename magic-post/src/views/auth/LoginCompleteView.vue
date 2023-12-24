<template>
  <div></div>
</template>

<script lang="ts" setup>
import { Paths } from '@/router/paths'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const $route = useRoute()
const $router = useRouter()
const query = $route.query as any

if (query.status === 'SUCCESS') {
  if (query.logInByAuthCode === 'true') $router.push(Paths.LOGIN_ADDIN_SUCCESS)
  else $router.push(Paths.HOME)
} else {
  if (query.status == 'ERROR') ElMessage.error(query.error)
  setTimeout(() => {
    $router.push(Paths.LOGIN)
  }, 4500)
}
</script>

<style scoped></style>
