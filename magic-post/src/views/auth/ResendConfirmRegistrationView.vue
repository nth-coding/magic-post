<template>
  <el-row
    :gutter="10"
    type="flex"
    justify="center"
    class="login-form-container"
  >
    <el-col :lg="8" :md="16" :sm="24">
      <el-card>
        <template #header
          ><h2 class="login-title">Gửi lại email kích hoạt</h2></template
        >
        <el-row>
          <el-col :span="24">
            <el-form
              :ref="toRef('MAIN_FORM')"
              :model="form"
              :rules="rules"
              :hide-required-asterisk="true"
              inline
              @submit.prevent="onSubmit"
              class="resend-confirmation-form"
              size="large"
            >
              <el-form-item prop="email" class="email-input">
                <el-input
                  type="email"
                  v-model="form.email"
                  placeholder="Nhập email"
                />
              </el-form-item>
              <el-form-item>
                <CommonButton
                  size="large"
                  :ref="toRef('SUBMIT_BUTTON')"
                  type="primary"
                  @click="onSubmit"
                  >Gửi
                </CommonButton>
              </el-form-item>
              <el-alert
                :title="errorMessage"
                type="error"
                v-if="errorMessage"
                class="error-message"
              ></el-alert>
            </el-form>
          </el-col>
          <el-col :span="24">
            <router-link :to="Paths.LOGIN">Đăng nhập</router-link>
            &nbsp;
            <router-link :to="Paths.REGISTER">Đăng ký</router-link>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import type { FormRules } from 'element-plus'
import { Paths } from '@/router/paths'

import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { processErrorMessage } from '@/helper/responseErrorHandle'
import CommonButton from '@/components/common/CommonButton.vue'
import { resendConfirmRegistration } from '@/services/auth'
import { useAuthenticationStore } from '@/stores/authentication'
import { storeToRefs } from 'pinia'
import useRefs from '@/common/useRefs'

const form = ref({
  email: '',
})

const isRequesting = ref(false)
const rules = reactive<FormRules>({
  email: [
    {
      min: 4,
      message: 'Email length should be at least 5 characters',
      trigger: 'blur',
    },
    { required: true, message: 'Hãy nhập email đăng ký', trigger: 'change' },
    {
      type: 'email',
      message: 'Hãy nhập chính xác địa chỉ email',
      trigger: 'blur',
    },
  ],
})
const errorMessage = ref(null)
const { refs, toRef } = useRefs<{
  SUBMIT_BUTTON: InstanceType<typeof CommonButton>
  MAIN_FORM: InstanceType<any>
}>()

const router = useRouter()

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

function onSubmit(e: any) {
  errorMessage.value = null
  refs.MAIN_FORM.validate(async (valid: any) => {
    if (valid) {
      refs.SUBMIT_BUTTON?.setLoading(true)
      try {
        await resendConfirmRegistration(form.value)
        await router.push(Paths.REGISTRATION_RESEND_ACTIVATION_SUCCESS)
      } catch (error) {
        const errorDetail = processErrorMessage(error)
        errorMessage.value = errorDetail
      } finally {
        refs.SUBMIT_BUTTON?.setLoading(false)
      }
    } else {
      return false
    }
  })
}
</script>

<style scoped>
.resend-confirmation-form-container {
  padding: 1em;
}

.email-input {
  width: 16rem;
  max-width: 100%;
}

.resend-confirmation-form {
  margin: 0.5rem 0;
}

.form-title {
  margin-bottom: 1rem;
}

.error-message {
  margin: 20px 0 15px 0;
}

.register-container {
  margin-top: 2rem;
  padding: 2rem;
}
</style>
