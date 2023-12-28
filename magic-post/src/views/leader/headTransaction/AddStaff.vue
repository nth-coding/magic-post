<template>
  <el-dialog v-model="show">
    <template #header>
      <div class="dialog-header">Thêm người dùng</div>
    </template>
    <el-form
        label-position="left"
        label-width="150px"
        :model="form"
        :ref="toRef('MAIN_FORM')"
        :rules="rules"
        style="max-width: 650px"
    >
      <el-form-item label="First name" prop="firstName">
        <el-input v-model="form.firstName" placeholder="First name..." />
      </el-form-item>
      <el-form-item label="Last name" prop="lastName">
        <el-input v-model="form.lastName" placeholder="Last name..." />
      </el-form-item>
      <el-form-item label="Email (Username)" prop="username">
        <el-input
            type="email"
            v-model="form.username"
            placeholder="Nhập email (username) người dùng"
        />
      </el-form-item>
      <el-form-item label="Mật khẩu" prop="password">
        <el-input
            type="password"
            v-model="form.password"
            placeholder="Nhập mật khẩu"
        />
      </el-form-item>
      <el-form-item label="Nhập lại mật khẩu" prop="confirmPassword">
        <el-input
            type="password"
            v-model="form.confirmPassword"
            placeholder="Nhập lại mật khẩu"
        />
      </el-form-item>
      <el-form-item label="Địa chỉ" prop="address">
        <el-input v-model="form.address" placeholder="Address..." />
      </el-form-item>
      <el-form-item label="Số điện thoại" prop="phoneNumber">
        <el-input v-model="form.phoneNumber" placeholder="Phone number..." />
      </el-form-item>
    </el-form>
    <template #footer>
      <CommonButton @click="resetForm" type="default">Hủy bỏ</CommonButton>
      <CommonButton
          type="primary"
          @click="submitForm"
          :ref="toRef('SUBMIT_BTN')"
      >Lưu lại
      </CommonButton>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'

import type { FormRules } from 'element-plus'
import { processErrorMessage } from '@/helper/responseErrorHandle'
import { ElMessage } from 'element-plus/es'
import CommonButton from '@/components/common/CommonButton.vue'
import useRefs from '@/helper/useRef'
import {StaffService, UserService} from "@/services/user";
import {useRouter} from "vue-router";
import {HeadTransactionApi} from "@/constants/API";
import {useAuthenticationStore} from "@/stores/authentication";
import {storeToRefs} from "pinia";

const show = ref(false)
const form = ref({
  username: '',
  firstName: '',
  lastName: '',
  address: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
})

const RefNames = {
  MAIN_FORM: 'MAIN_FORM',
  SUBMIT_BTN: 'SUBMIT_BTN',
}

const {$refs, toRef} = useRefs()

const props = withDefaults(defineProps<{
  model?: boolean,
}>(), {
  model: false,
})

watch(() => props.model, (value, oldValue) => {
  if (value && !oldValue) {
    $refs.get(RefNames.MAIN_FORM)?.resetFields()
  }
})

const authenticationStore = useAuthenticationStore()
const {user} = storeToRefs(authenticationStore)
const emit = defineEmits(['close'])

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Nhập lại mật khẩu'))
  } else if (value !== form.value.password) {
    callback(new Error('Mật khẩu không khớp'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  name: [{required: true, message: 'Nhập tên người dùng'}],
  email: [{
    min: 4,
    message: "Email length should be at least 5 characters",
    trigger: "blur"
  },
    {required: true, message: 'Hãy nhập email đăng ký', trigger: 'blur'},
    {type: 'email', message: 'Hãy nhập chính xác địa chỉ email', trigger: 'change'}
  ],
  password: [
    {required: true, message: 'Hãy nhập mật khẩu ', trigger: 'blur'},
    {min: 8, message: 'Mật khẩu tối thiểu 8 kí tự', trigger: 'change'}
  ],
  confirmPassword: [
    {required: true, message: 'Hãy nhập lại mật khẩu ', trigger: 'change'},
    {min: 8, message: 'Mật khẩu tối thiểu 8 kí tự', trigger: 'change'},
    {validator: validateConfirmPassword, trigger: 'change'}
  ]
})

const router = useRouter()

function submitForm() {
  $refs.get(RefNames.MAIN_FORM)?.validate(async (valid: boolean) => {
    if (valid) {
      $refs.get(RefNames.SUBMIT_BTN)?.setLoading(true)
      try {
        await StaffService.addForHeadTran({
          lastName: form.value.lastName,
          firstName: form.value.firstName,

          username: form.value.username,
          password: form.value.password,

          phoneNumber: form.value.phoneNumber,
          address: form.value.address,
          pointId: user.value?.pointId,
        })
        ElMessage({
          message: 'Thêm người dùng thành công!',
          type: 'success',
          duration: 5000
        })
        emit('close')
      } catch (e: any) {
        processErrorMessage(e)
      } finally {
        $refs.get(RefNames.SUBMIT_BTN)?.setLoading(false)
      }
    } else {
      return false
    }
  })
}

function openModal() {
  show.value = true
}

function closeModal() {
  show.value = false
}

function resetForm() {
  show.value = false
  emit('close')
}

defineExpose({
  openModal,
  closeModal,
})


</script>
<style lang="scss">
.avatar-image {
  margin: 0 auto;
}

.avatar-image-block {
  display: flex;
}
</style>
