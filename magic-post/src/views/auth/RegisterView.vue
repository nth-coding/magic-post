<template>
  <div class="login-form-container">
    <el-row type="flex" justify="center">
      <el-col :lg="8" :md="12" :sm="24">
        <el-card header="Đăng ký">
          <template #header><h2 class="login-title">Đăng ký</h2></template>
          <el-form
              :ref="toRef('REGISTER_FORM')"
              :model="form"
              :rules="rules"
              :hide-required-asterisk="true"
              label-position="top"
              @keyup.enter.native="onSubmit"
              size="large"
          >
            <el-form-item label="First name" prop="firstName">
              <el-input v-model="form.firstName" placeholder="First name"></el-input>
            </el-form-item>

            <el-form-item label="Last name" prop="lastName">
              <el-input v-model="form.lastName" placeholder="Last name"></el-input>
            </el-form-item>

            <el-form-item label="Address" prop="address">
              <el-input v-model="form.address" placeholder="Address"></el-input>
            </el-form-item>

            <el-form-item label="Phone number" prop="phoneNumber">
              <el-input v-model="form.phoneNumber" placeholder="Phone number"></el-input>
            </el-form-item>

            <el-form-item label="Username" prop="username">
              <el-input
                  v-model="form.username"
                  placeholder="Username"
                  type="username"
              ></el-input>
            </el-form-item>

            <el-form-item label="Mật khẩu" prop="password">
              <el-input
                  v-model="form.password"
                  type="password"
                  placeholder="Mật khẩu"
              ></el-input>
            </el-form-item>
            <el-form-item label="Nhập lại mật khẩu" prop="confirmPassword">
              <el-input
                  v-model="form.confirmPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
              ></el-input>
            </el-form-item>
            <el-alert
                :title="errorMessage"
                type="error"
                v-if="errorMessage"
                class="error-message"
            ></el-alert>
            <el-row type="flex" justify="end">
              <el-col :span="24">
                <CommonButton
                    size="large"
                    :ref="toRef('SUBMIT_BUTTON')"
                    class="width-full"
                    type="primary"
                    @click="onSubmit"
                >
                  Đăng ký
                </CommonButton>
              </el-col>
            </el-row>
            <br />
            <el-row>
              Đã có tài khoản? &nbsp
              <router-link :to="Paths.LOGIN">Đăng nhập</router-link>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import type { FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useAuthenticationStore } from '@/stores/authentication'
import { Paths } from '@/router/paths'
import { router } from '@/router'

import { processErrorMessage } from '@/helper/responseErrorHandle'
import CommonButton from '@/components/common/CommonButton.vue'
import { register } from '@/services/auth'
import { storeToRefs } from 'pinia'
import useRefs from '@/common/useRefs'

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Nhập lại mật khẩu'))
  } else if (value !== form.value.password) {
    callback(new Error('Mật khẩu không khớp'))
  } else {
    callback()
  }
}
const form = ref({
  firstName: '',
  lastName: '',
  address: '',
  phoneNumber: '',
  username: '',
  password: '',
  confirmPassword: '',
})
const { refs, toRef } = useRefs<{
  SUBMIT_BUTTON: InstanceType<typeof CommonButton>
  REGISTER_FORM: InstanceType<any>
}>()
const rules = reactive<FormRules>({
  name: [{ required: true, message: 'Nhập tên người dùng để đăng ký' }],
  username: [
    {
      min: 4,
      message: 'Độ dài username phải có ít nhất 5 ký tự',
      trigger: 'blur',
    },
    { required: true, message: 'Hãy nhập username đăng ký', trigger: 'blur' },
    {
      type: 'username',
      message: 'Hãy nhập chính xác địa chỉ username',
      trigger: 'change',
    },
  ],
  password: [
    { required: true, message: 'Hãy nhập mật khẩu ', trigger: 'blur' },
    { min: 8, message: 'Mật khẩu tối thiểu 8 kí tự', trigger: 'change' },
  ],
  confirmPassword: [
    { required: true, message: 'Hãy nhập lại mật khẩu ', trigger: 'change' },
    { min: 8, message: 'Mật khẩu tối thiểu 8 kí tự', trigger: 'change' },
    { validator: validateConfirmPassword, trigger: 'change' },
  ],
})
const errorMessage = ref(null)

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

function onSubmit() {
  errorMessage.value = null
  refs.REGISTER_FORM.validate(async (valid: any) => {
    if (valid) {
      refs.SUBMIT_BUTTON?.setLoading(true)
      try {
        await register({
          firstname: form.value.firstName,
          lastName: form.value.lastName,
          address: form.value.address,
          phoneNumber: form.value.phoneNumber,
          username: form.value.username,
          password: form.value.password,
        })
        ElMessage({
          message:
              'Đăng ký thành công, hệ thống sẽ gửi username xác nhận trong giây lát',
          type: 'success',
          duration: 5000,
        })
        await router.push(Paths.REGISTER_SUCCESS)
      } catch (e: any) {
        processErrorMessage(e)
        errorMessage.value = e.response?.data?.data
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
.error-message {
  margin: 20px 0 15px 0;
}

.register-container {
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid #eee;
}
</style>
