<template>
  <div>
    <h1>Thông tin tài khoản</h1>
    <br/>
    <el-form
        label-position="left"
        label-width="150px"
        :model="form"
        :ref="toRef('MAIN_FORM')"
        :rules="rules"
        style="max-width: 600px"
    >
      <div class="block avatar-image-block">
        <el-avatar
            class="avatar-image"
            :size="100"
            :src="imgUrl"
            referrerpolicy="no-referrer"
        />
      </div>
      <br/>
      <br/>
      <el-form-item label="Role" prop="username">
        <el-input class="b-form-item" v-model="form.role" placeholder="Chưa có thông tin..." disabled/>
      </el-form-item>
      <br>
      <el-form-item label="Email" prop="username">
        <el-input class="b-form-item" v-model="form.username" placeholder="Chưa có thông tin..." disabled/>
      </el-form-item>
      <br>
      <el-form-item label="First name" prop="firstName">
        <el-input class="b-form-item" v-model="form.firstName" placeholder="Chưa có thông tin..."/>
      </el-form-item>
      <br>
      <el-form-item label="Last name" prop="lastName">
        <el-input class="b-form-item" v-model="form.lastName" placeholder="Chưa có thông tin..."/>
      </el-form-item>
      <br>
      <el-form-item label="Phone number" prop="phoneNumber">
        <el-input class="b-form-item" v-model="form.phoneNumber" placeholder="Chưa có thông tin..."/>
      </el-form-item>
      <br>
      <el-form-item label="Address" prop="address">
        <el-input class="b-form-item" v-model="form.address" placeholder="Chưa có thông tin..."/>
      </el-form-item>
      
      <el-form-item label="Password">
        <el-link
            :underline="false"
            class="btn-function"
            @click="openChangePasswordDialog"
        >Thay đổi mật khẩu
        </el-link>
      </el-form-item>

      <el-form-item>
        <CommonButton
            class="mx-auto lg:mx-0 hover:underline text-white bg-sky-500 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            type="primary"
            @click="submitForm"
            :ref="toRef('SUBMIT_BTN')"
        >Lưu lại
        </CommonButton>
        <CommonButton @click="resetForm" type="default" 
         class="mx-auto lg:mx-0 hover:underline text-white bg-sky-500 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >Đặt lại</CommonButton>
      </el-form-item>
    </el-form>
  </div>
  <el-dialog v-model="turnOnFormPassword">
    <template #header>
      <div class="dialog-header">Thay đổi mật khẩu</div>
    </template>
    <el-form
        :ref="toRef('FORM_CHANGE_PASSWORD')"
        :model="formPassword"
        label-position="left"
        label-width="150px"
        :rules="rulesPassword"
    >
      <el-form-item label="Mật khẩu cũ" prop="oldPassword">
        <el-input
            v-model="formPassword.oldPassword"
            placeholder="Nhập mật khẩu"
            type="password"
        />
      </el-form-item>
      <el-form-item label="Mật khẩu" prop="password">
        <el-input
            v-model="formPassword.password"
            placeholder="Nhập mật khẩu"
            type="password"
        />
      </el-form-item>
      <el-form-item label="Nhập lại mật khẩu" prop="confirmPassword">
        <el-input
            v-model="formPassword.confirmPassword"
            placeholder="Nhập lại mật khẩu"
            type="password"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <CommonButton type="default" @click="closeFormChangePassword"   class="mx-auto lg:mx-0 hover:underline text-white bg-sky-500 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"

      >Hủy bỏ
      </CommonButton>
      <CommonButton
          class="mx-auto lg:mx-0 hover:underline text-white bg-sky-500 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"

          :ref="toRef('SUBMIT_BTN_FORM_CHANGE_PASSWORD')"
          type="primary"
          @click="submitFormChangePassword"
      >Lưu lại
      </CommonButton>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {ref, watch} from 'vue'

import {useAuthenticationStore} from '@/stores/authentication'
import {storeToRefs} from 'pinia'
import {ElMessage} from 'element-plus/es'
import {processErrorMessage} from '@/helper/responseErrorHandle'
import CommonButton from '@/components/common/CommonButton.vue'
import useRefs from '@/common/useRefs'
import type {UserInfo} from "@/constants/Interfaces";
import {UserService} from "@/services/user";

const drawer = ref(false)
const direction = ref('rtl')

const {refs, toRef} = useRefs<{
  MAIN_FORM: InstanceType<any>
  SUBMIT_BTN: InstanceType<typeof CommonButton>
  SUBMIT_BTN_FORM_CHANGE_PASSWORD: InstanceType<typeof CommonButton>
  FORM_CHANGE_PASSWORD: InstanceType<any>
}>()

function closeFormChangePassword() {
  turnOnFormPassword.value = false
}

function openChangePasswordDialog() {
  turnOnFormPassword.value = true
  refs.FORM_CHANGE_PASSWORD?.resetFields()
}

const rules = {
  name: [
    {
      min: 5,
      message: 'Vui lòng nhập tên có độ dài từ 5 ký tự trở lên',
      trigger: 'blur',
    },
    {
      max: 200,
      message: 'Vui lòng nhập tên có độ dài dưới 200 ký tự',
      trigger: 'blur',
    },
  ],
}
const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Nhập lại mật khẩu'))
  } else if (value !== formPassword.value.password) {
    callback(new Error('Mật khẩu không khớp'))
  } else {
    callback()
  }
}
const rulesPassword = {
  oldPassword: [
    {required: true, message: 'Hãy nhập mật khẩu ', trigger: 'blur'},
    {min: 8, message: 'Mật khẩu tối thiểu 8 kí tự', trigger: 'change'},
  ],
  password: [
    {required: true, message: 'Hãy nhập mật khẩu ', trigger: 'blur'},
    {min: 8, message: 'Mật khẩu tối thiểu 8 kí tự', trigger: 'change'},
  ],
  confirmPassword: [
    {required: true, message: 'Hãy nhập lại mật khẩu ', trigger: 'change'},
    {min: 8, message: 'Mật khẩu tối thiểu 8 kí tự', trigger: 'change'},
    {validator: validateConfirmPassword, trigger: 'change'},
  ],
}

const form = ref({
  username: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: '',
  role: '',
})
const turnOnFormPassword = ref(false)
const formPassword = ref({
  oldPassword: '',
  password: '',
  confirmPassword: '',
})

const imgUrl = ref(
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)

const authenticationStore = useAuthenticationStore()
const {authenticated, user, roleList} = storeToRefs(authenticationStore)

watch(
    authenticated,
    (newAuth) => {
      if (newAuth && user.value) {
        updateUserInfo(user.value as UserInfo, roleList.value)
      }
    },
    {
      immediate: true,
    }
)

function updateUserInfo(userInfo: UserInfo, roleList: string[]) {
  form.value = {
    username: userInfo.username,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    phoneNumber: userInfo.phoneNumber,
    address: userInfo.address,
    role: roleList[0],
  }
}

function submitForm() {
  refs.MAIN_FORM?.validate(async (valid: boolean) => {
    if (valid) {
      refs.SUBMIT_BTN?.setLoading(true)
      try {
        await UserService.editProfile({
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          phoneNumber: form.value.phoneNumber,
          address: form.value.address,
        })
        ElMessage({
          message: 'Cập nhật thông tin người dùng thành công!',
          type: 'success',
          duration: 5000,
        })
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

function submitFormChangePassword() {
  refs.FORM_CHANGE_PASSWORD?.validate(async (valid: boolean) => {
    if (valid) {
      refs.SUBMIT_BTN_FORM_CHANGE_PASSWORD?.setLoading(true)
      try {
        await UserService.changePassword({
          oldPassword: formPassword.value.oldPassword,
          password: formPassword.value.password,
        })
        ElMessage({
          message: 'Thay đổi mật khẩu người dùng thành công!',
          type: 'success',
          duration: 5000,
        })
        turnOnFormPassword.value = false
      } catch (e: any) {
        processErrorMessage(e)
      } finally {
        refs.SUBMIT_BTN_FORM_CHANGE_PASSWORD?.setLoading(false)
      }
    } else {
      return false
    }
  })
}

function resetForm() {
  if (user.value) updateUserInfo(user.value as UserInfo, roleList.value)
}
</script>
<style scoped>
.avatar-image {
  margin: 0 auto;
}

.avatar-image-block {
  display: flex;
}

.user-info-detail {
  color: var(--el-text-color-regular);
  min-width: 450px;
}

.btn-function {
  padding-top: 3px;
}


h1 {
  color: #333;
  font-size: 2em;
  margin-bottom: 1rem;
}
</style>
