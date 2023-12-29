<template>
  <el-dialog>
    <template #header>
      <div class="dialog-header">Tạo đơn hàng</div>
    </template>
    <div class="radio-group-container">

      <el-form-item label="Have account?">
        <el-switch v-model="hadAccount"/>
      </el-form-item>

      <div v-if="hadAccount">
        <el-form
            label-position="left"
            label-width="150px"
            :model="form"
            :ref="toRef('MAIN_FORM')"
            :rules="rules"
            style="max-width: 650px"
        >
          <el-form-item label="Số điện thoại" prop="phoneNumber">
            <el-input v-model="form.phoneNumber" placeholder="Phone number..."/>
          </el-form-item>
          <el-form-item label="Weight" prop="weight">
            <el-input v-model="form.weight" placeholder="Weight..."/>
          </el-form-item>

          <el-form-item label="Name" prop="name">
            <el-input v-model="form.name" placeholder="Name..."/>
          </el-form-item>

          <el-form-item label="Description" prop="description">
            <el-input v-model="form.description" placeholder="Description..."/>
          </el-form-item>

          <el-form-item label="Type" prop="type">
            <el-input v-model="form.type" placeholder="Type..."/>
          </el-form-item>

          <el-form-item label="Receiver First Name" prop="receiverFirstName">
            <el-input v-model="form.receiverFirstName" placeholder="Receiver First Name..."/>
          </el-form-item>

          <el-form-item label="Receiver Last Name" prop="receiverLastName">
            <el-input v-model="form.receiverLastName" placeholder="Receiver Last Name..."/>
          </el-form-item>

          <el-form-item label="Receiver Province" prop="receiverProvince">
            <el-input v-model="form.receiverProvince" placeholder="Receiver Province..."/>
          </el-form-item>

          <el-form-item label="Receiver District" prop="receiverDistrict">
            <el-input v-model="form.receiverDistrict" placeholder="Receiver District..."/>
          </el-form-item>

          <el-form-item label="Receiver Phone Number" prop="receiverPhoneNumber">
            <el-input v-model="form.receiverPhoneNumber" placeholder="Receiver Phone Number..."/>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <el-form
            label-position="left"
            label-width="150px"
            :model="form2"
            :ref="toRef('MAIN_FORM')"
            :rules="rules"
            style="max-width: 650px"
        >
          <el-form-item label="First name" prop="firstName">
            <el-input v-model="form2.firstName" placeholder="First name..."/>
          </el-form-item>
          <el-form-item label="Last name" prop="lastName">
            <el-input v-model="form2.lastName" placeholder="Last name..."/>
          </el-form-item>
          <el-form-item label="Email (Username)" prop="username">
            <el-input
                type="email"
                v-model="form2.username"
                placeholder="Nhập email (username) người dùng"
            />
          </el-form-item>
          <el-form-item label="Mật khẩu" prop="password">
            <el-input
                type="password"
                v-model="form2.password"
                placeholder="Nhập mật khẩu"
            />
          </el-form-item>
          <el-form-item label="Nhập lại mật khẩu" prop="confirmPassword">
            <el-input
                type="password"
                v-model="form2.confirmPassword"
                placeholder="Nhập lại mật khẩu"
            />
          </el-form-item>
          <el-form-item label="Địa chỉ" prop="address">
            <el-input v-model="form2.address" placeholder="Address..."/>
          </el-form-item>
          <el-form-item label="Số điện thoại" prop="phoneNumber">
            <el-input v-model="form2.phoneNumber" placeholder="Phone number..."/>
          </el-form-item>
          <el-form-item label="Weight" prop="weight">
            <el-input v-model="form2.weight" placeholder="Weight..."/>
          </el-form-item>

          <el-form-item label="Name" prop="name">
            <el-input v-model="form2.name" placeholder="Name..."/>
          </el-form-item>

          <el-form-item label="Description" prop="description">
            <el-input v-model="form2.description" placeholder="Description..."/>
          </el-form-item>

          <el-form-item label="Type" prop="type">
            <el-input v-model="form2.type" placeholder="Type..."/>
          </el-form-item>

          <el-form-item label="Receiver First Name" prop="receiverFirstName">
            <el-input v-model="form2.receiverFirstName" placeholder="Receiver First Name..."/>
          </el-form-item>

          <el-form-item label="Receiver Last Name" prop="receiverLastName">
            <el-input v-model="form2.receiverLastName" placeholder="Receiver Last Name..."/>
          </el-form-item>

          <el-form-item label="Receiver Province" prop="receiverProvince">
            <el-input v-model="form2.receiverProvince" placeholder="Receiver Province..."/>
          </el-form-item>

          <el-form-item label="Receiver District" prop="receiverDistrict">
            <el-input v-model="form2.receiverDistrict" placeholder="Receiver District..."/>
          </el-form-item>

          <el-form-item label="Receiver Phone Number" prop="receiverPhoneNumber">
            <el-input v-model="form2.receiverPhoneNumber" placeholder="Receiver Phone Number..."/>
          </el-form-item>
        </el-form>
      </div>
    </div>

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
import {reactive, ref, watch} from 'vue'

import type {FormRules} from 'element-plus'
import {processErrorMessage} from '@/helper/responseErrorHandle'
import {ElMessage} from 'element-plus/es'
import CommonButton from '@/components/common/CommonButton.vue'
import useRefs from '@/helper/useRef'
import {useRouter} from "vue-router";
import {useAuthenticationStore} from "@/stores/authentication";
import {storeToRefs} from "pinia";
import {PackageService} from "@/services/package";
import {CustomerService} from "@/services/user";

const hadAccount = ref(false)
const show = ref(false)
const form = ref({
  phoneNumber: '',
  weight: '',
  name: '',
  description: '',
  type: '',
  receiverFirstName: '',
  receiverLastName: '',
  receiverProvince: '',
  receiverDistrict: '',
  receiverPhoneNumber: '',
})

const form2 = ref({
  username: '',
  firstName: '',
  lastName: '',
  address: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  weight: '',
  name: '',
  description: '',
  type: '',
  receiverFirstName: '',
  receiverLastName: '',
  receiverProvince: '',
  receiverDistrict: '',
  receiverPhoneNumber: '',
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
  } else if (value !== form2.value.password) {
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
        let packageTemp = null;
        if (hadAccount.value) {
          const phoneNumberTemp = form.value.phoneNumber
          packageTemp = await PackageService.addPackageWithAccount(phoneNumberTemp, {
            weight: form.value.weight,
            name: form.value.name,
            description: form.value.description,
            type: form.value.type,
            receiverFirstName: form.value.receiverFirstName,
            receiverLastName: form.value.receiverLastName,
            receiverProvince: form.value.receiverProvince,
            receiverDistrict: form.value.receiverDistrict,
            receiverPhoneNumber: form.value.receiverPhoneNumber,
          })
        } else {
          packageTemp = await PackageService.addPackageWithoutAccount({

            weight: form2.value.weight,
            name: form2.value.name,
            description: form2.value.description,
            type: form2.value.type,
            receiverFirstName: form2.value.receiverFirstName,
            receiverLastName: form2.value.receiverLastName,
            receiverProvince: form2.value.receiverProvince,
            receiverDistrict: form2.value.receiverDistrict,
            receiverPhoneNumber: form2.value.receiverPhoneNumber,

            username: form2.value.username,
            firstName: form2.value.firstName,
            lastName: form2.value.lastName,
            address: form2.value.address,
            phoneNumber: form2.value.phoneNumber,
            password: form2.value.password,

          })
        }
        await CustomerService.getCustomerReceipt(packageTemp.id, {})

        ElMessage({
          message: 'Thêm đơn hàng thành công!',
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
