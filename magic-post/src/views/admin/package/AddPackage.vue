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
      <el-form-item label="Tên" prop="name">
        <el-input v-model="form.name" placeholder="Nhập tên người dùng" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input
            type="email"
            v-model="form.email"
            placeholder="Nhập email người dùng"
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
      <el-form-item label="Gói cá nhân" prop="plan">
        <el-radio-group placeholder="Chọn gói..." v-model="form.plan">
          <PlanList :has-all-option="false"></PlanList>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Số ngày hiệu lực" prop="numberOfDate">
        <el-input-number
            :min="1"
            :max="365 * 3"
            :step="1"
            v-model="form.numberOfDate"
        />
      </el-form-item>
      <el-form-item label="Đơn vị" prop="organization">
        <el-select
            v-model="form.organization"
            class="m-2"
            placeholder="Chọn đơn vị..."
            clearable
        >
          <OrganizationList :has-all-option="false"></OrganizationList>
        </el-select>
      </el-form-item>
      <el-form-item label="Ghi chú" prop="note">
        <el-input
            type="textarea"
            v-model="form.note"
            placeholder="Thêm ghi chú..."
        />
      </el-form-item>
      <!--            <el-form-item label="Xác nhận Email" prop="emailConfirmed">-->
      <!--              <el-radio-group v-model="form.emailConfirmed" class="ml-4">-->
      <!--                <el-radio :label="true">Đã xác nhận</el-radio>-->
      <!--                <el-radio :label="false">Chưa xác nhận</el-radio>-->
      <!--              </el-radio-group>-->
      <!--            </el-form-item>-->
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
import { UserService } from '@/services/user'
import CommonButton from '@/components/common/CommonButton.vue'
import useRefs from '@/common/useRefs'
import OrganizationList from '@/components/common/OrganizationList.vue'
import PlanList from '@/components/common/PlanList.vue'

const show = ref(false)
const form = ref({
  email: '',
  name: '',
  plan: null,
  organization: null,
  emailConfirmed: true,
  password: '',
  confirmPassword: '',
  numberOfDate: 30,
  note: '',
})

const { refs, toRef } = useRefs<{
  MAIN_FORM: InstanceType<any>
  SUBMIT_BTN: InstanceType<typeof CommonButton>
}>()

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
  name: [{ required: true, message: 'Nhập tên người dùng' }],
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
    { required: true, message: 'Hãy nhập mật khẩu ', trigger: 'blur' },
    { min: 8, message: 'Mật khẩu tối thiểu 8 kí tự', trigger: 'change' },
  ],
  confirmPassword: [
    { required: true, message: 'Hãy nhập lại mật khẩu ', trigger: 'change' },
    { min: 8, message: 'Mật khẩu tối thiểu 8 kí tự', trigger: 'change' },
    { validator: validateConfirmPassword, trigger: 'change' },
  ],
})

watch(
    () => show.value,
    (value, oldValue) => {
      if (value != oldValue && value) {
        refs.MAIN_FORM?.resetFields()
      }
    }
)

function submitForm() {
  refs.MAIN_FORM?.validate(async (valid: boolean) => {
    if (valid) {
      refs.SUBMIT_BTN?.setLoading(true)
      try {
        await UserService.add({
          name: form.value.name,
          email: form.value.email,
          password: form.value.password,
          confirmPassword: form.value.confirmPassword,
          organizationId: form.value.organization,
          planId: form.value.plan,
          emailConfirmed: form.value.emailConfirmed,
          numberOfDate: form.value.numberOfDate,
          note: form.value.note,
        })
        ElMessage({
          message: 'Thêm người dùng thành công!',
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
