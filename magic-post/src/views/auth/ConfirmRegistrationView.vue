<template>
  <el-row type="flex" justify="center" class="alert-container">
    <el-col :lg="8" :md="12" :sm="24">
      <el-alert
        v-if="isSuccess"
        show-icon
        class="alert-message"
        title="Kích hoạt tài khoản thành công, vui lòng đăng nhập hệ thống để sử dụng"
        type="success"
      ></el-alert>
      <el-alert
        v-else
        show-icon
        :title="
          description
            ? description + '. '
            : 'Có lỗi đã xảy ra. ' +
              'Để nhận lại đường dẫn kích hoạt mới, bạn hãy vui lòng nhập e-mail đã đăng ký vào biểu mẫu bên dưới.'
        "
        type="error"
        class="alert-message"
        effect="light"
        :closable="false"
      ></el-alert>
    </el-col>
  </el-row>
  <login v-if="isSuccess" />
  <resend-confirm-registration v-else />
</template>

<script lang="ts" setup>
import Login from './LoginView.vue'
import ResendConfirmRegistration from './ResendConfirmRegistrationView.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { confirmRegistration } from '@/services/auth'
import { useAuthenticationStore } from '@/stores/authentication'
import { storeToRefs } from 'pinia'
import { router } from '@/router'
import { Paths } from '@/router/paths'

const isSuccess = ref(false)
const description = ref('')
const route = useRoute()

const authenticationStore = useAuthenticationStore()
const { authenticated } = storeToRefs(authenticationStore)

watch(
  authenticated,
  (newAuth) => {
    if (newAuth) {
      router.push(Paths.HOME)
    }
  },
  {
    immediate: true,
  }
)

onMounted(() => {
  confirmRegistration(route.query.token as string, onSuccess, onError)
})

function onSuccess() {
  isSuccess.value = true
}

function onError(message: string) {
  isSuccess.value = false
  description.value = message
}
</script>

<style>
.alert-message.el-alert--error.is-light {
  background-color: #ffe3e3;
  color: #cf4a4a;
}
</style>

<style scoped>
.alert-message {
  margin-bottom: 0.5rem;
}

.alert-container {
  margin-top: 2rem;
  padding: 0 5px;
}
</style>
