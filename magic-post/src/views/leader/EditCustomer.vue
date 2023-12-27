<template>
  <el-dialog v-model="show">
    <template #header>
      <div class="dialog-header">Chỉnh sửa người dùng</div>
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
            placeholder="Nhập email người dùng"
            disabled
        />
      </el-form-item>
      <el-form-item label="Mật khẩu" prop="password">
        <el-input
            type="password"
            v-model="form.password"
            placeholder="Để trống nếu không thay đổi mật khẩu"
        />
      </el-form-item>
      <el-form-item label="Nhập lại mật khẩu" prop="confirmPassword">
        <el-input
            type="password"
            v-model="form.confirmPassword"
            placeholder="Để trống nếu không thay đổi mật khẩu"
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
import { onMounted, reactive, ref, watch } from 'vue'

import type { FormRules } from 'element-plus'
import { processErrorMessage } from '@/helper/responseErrorHandle'
import { ElMessage } from 'element-plus/es'
import CommonButton from '@/components/common/CommonButton.vue'
import useRefs from '@/common/useRefs'
import {UserService} from "@/services/user";

const form = ref({
  username: '',
  firstName: '',
  lastName: '',
  address: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
})

const show = ref(false)

const { refs, toRef } = useRefs<{
  MAIN_FORM: InstanceType<any>
  SUBMIT_BTN: InstanceType<typeof CommonButton>
}>()

const props = withDefaults(
    defineProps<{
      id: number
    }>(),
    {
      id: 0,
    }
)

const emit = defineEmits(['close'])

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback()
  } else if (value !== form.value.password) {
    callback(new Error('Mật khẩu không khớp'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  name: [{ required: true, message: 'Nhập tên đăng ký' }],
  email: [
    {
      min: 4,
      message: 'Email length should be at least 5 characters',
      trigger: 'blur',
    },
    { required: true, message: 'Hãy nhập email đăng ký', trigger: 'blur' },
    {
      type: 'email',
      message: 'Hãy nhập chính xác địa chỉ email',
      trigger: 'change',
    },
  ],
  password: [
    { required: false, message: 'Hãy nhập mật khẩu ', trigger: 'blur' },
    { min: 8, message: 'Mật khẩu tối thiểu 8 kí tự', trigger: 'change' },
  ],
  confirmPassword: [
    { required: false, message: 'Hãy nhập lại mật khẩu ', trigger: 'change' },
    { min: 8, message: 'Mật khẩu tối thiểu 8 kí tự', trigger: 'change' },
    { validator: validateConfirmPassword, trigger: 'change' },
  ],
})

watch(
    () => props.id,
    async () => {
      await refreshData()
    }
)
onMounted(async () => {
  await refreshData()
})

async function refreshData() {
  try {
    if (!props.id) return
    const response = await UserService.getOne(props.id)
    const user = response?.data?.data
    form.value = {
      username: user?.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
      address: user?.address,
      phoneNumber: user?.phoneNumber,
      password: user?.password,
      confirmPassword: user?.password,
    }
  } catch (e) {
    processErrorMessage(e)
  }
}

function submitForm() {
  refs.MAIN_FORM?.validate(async (valid: boolean) => {
    if (valid) {
      refs.SUBMIT_BTN?.setLoading(true)
      try {
        const now = new Date()
        await UserService.edit(props.id, {
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          address: form.value.address,
          phoneNumber: form.value.phoneNumber,
          password: form.value.password,
        })
        ElMessage({
          message: 'Chỉnh sửa người dùng thành công!',
          type: 'success',
          duration: 5000,
        })
        emit('close')
      } catch (e: any) {
        processErrorMessage(e)
      } finally {
        refs.SUBMIT_BTN?.setLoading(false)
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
