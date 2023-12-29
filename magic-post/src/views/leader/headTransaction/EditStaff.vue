<template>
  <el-dialog v-model="show" @close="closeDialog">
    <template #header>
      <div class="dialog-header">Chỉnh sửa thông tin người dùng #{{ props.id }}</div>
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
        <el-input v-model="form.firstName" placeholder="First name..."/>
      </el-form-item>
      <el-form-item label="Last name" prop="lastName">
        <el-input v-model="form.lastName" placeholder="Last name..."/>
      </el-form-item>
      <el-form-item label="Email (Username)" prop="username">
        <el-input
            type="email"
            v-model="form.username"
            placeholder="Nhập email (username) người dùng"
        />
      </el-form-item>
      <el-form-item label="Mật khẩu" prop="password">
        <el-input type="password" v-model="form.password" placeholder="Để trống nếu không thay đổi mật khẩu"/>
      </el-form-item>
      <el-form-item label="Nhập lại mật khẩu" prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword" placeholder="Để trống nếu không thay đổi mật khẩu"/>
      </el-form-item>

      <el-form-item label="Địa chỉ" prop="address">
        <el-input v-model="form.address" placeholder="Address..."/>
      </el-form-item>
      <el-form-item label="Số điện thoại" prop="phoneNumber">
        <el-input v-model="form.phoneNumber" placeholder="Phone number..."/>
      </el-form-item>
      <el-form-item label="Point" prop="point">
        <el-input v-model="form.point" placeholder="Point..." disabled/>
      </el-form-item>
    </el-form>
    <template #footer>
      <CommonButton @click="resetForm" type="default"
        class="mx-auto lg:mx-0 hover:underline text-white bg-sky-500 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >Hủy bỏ</CommonButton>
      <CommonButton
          class="mx-auto lg:mx-0 hover:underline text-white bg-sky-500 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          type="primary"
          @click="submitForm"
          :ref="toRef('SUBMIT_BTN')"
      >Lưu lại
      </CommonButton>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {onMounted, reactive, ref, watch} from 'vue'

import type {FormRules} from 'element-plus'
import {processErrorMessage} from '@/helper/responseErrorHandle'
import {ElMessage} from 'element-plus/es'
import CommonButton from '@/components/common/CommonButton.vue'
import useRefs from '@/helper/useRef'
import {useRouter} from "vue-router";
import {StaffService} from "@/services/user";

const show = ref(false)
const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  address: '',
  phoneNumber: '',
  point: '',
})

const RefNames = {
  MAIN_FORM: 'MAIN_FORM',
  SUBMIT_BTN: 'SUBMIT_BTN',
}

const {$refs, toRef} = useRefs()

const props = withDefaults(defineProps<{
  show?: boolean,
  id: number
}>(), {
  show: false,
})


onMounted(async () => {
  await refreshData()
})

watch(() => props.show, (value, oldValue) => {
  if (value && !oldValue) {
    $refs.get(RefNames.MAIN_FORM)?.resetFields()
    refreshData()
  }
})

watch(() => props.id, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    await refreshData();
  }
});

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
  name: [{required: true, message: 'Nhập tên đăng ký'}],
  email: [{
    min: 4,
    message: "Email length should be at least 5 characters",
    trigger: "blur"
  },
    {required: true, message: 'Hãy nhập email đăng ký', trigger: 'blur'},
    {type: 'email', message: 'Hãy nhập chính xác địa chỉ email', trigger: 'change'}
  ],
  password: [
    {required: false, message: 'Hãy nhập mật khẩu ', trigger: 'blur'},
    {min: 8, message: 'Mật khẩu tối thiểu 8 kí tự', trigger: 'change'}
  ],
  confirmPassword: [
    {required: false, message: 'Hãy nhập lại mật khẩu ', trigger: 'change'},
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
        await StaffService.editForHeadTran(props.id, {
            username: form.value.username,
            password: form.value.password,
            firstName: form.value.firstName,
            lastName: form.value.lastName,
            address: form.value.address,
            phoneNumber: form.value.phoneNumber,
            }
        )
        ElMessage({
          message: 'Chỉnh sửa người dùng thành công!',
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



async function refreshData() {
  try {
    const user = await StaffService.getOneForHeadTran(props.id)
    form.value = {
      username: user.userDto.username,
      lastName: user.userDto.lastName,
      firstName: user.userDto.firstName,
      address: user.userDto.address,
      phoneNumber: user.userDto.phoneNumber,
      password: '',
      confirmPassword: '',
      point: user.pointDto.name,
    }
  } catch (e) {
    processErrorMessage(e)
  }
}

function closeDialog() {
  emit('close')
}



</script>
<style lang="scss">
.avatar-image {
  margin: 0 auto;
}

.avatar-image-block {
  display: flex;
}
</style>
