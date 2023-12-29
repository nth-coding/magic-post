<template>
  <el-dialog width="80%">
    <template #header>
      <div class="dialog-header">Tạo đơn hàng</div>
    </template>
    <div class="package-create-container">
      <div class="left-container">
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
      </div>
      <div class="right-container">
        <div class="receipt">
          <div class="receipt-container">
            <header class="receipt-header">
              <img src="@/assets/images/logo.svg" alt="Company Logo" class="logo">
              <!--      <img alt="QR Code" class="qr-code">-->
            </header>

            <p>Name: {{ packageTemp.name }}</p>
            <p>HashKey: {{ packageTemp.hashKey }}</p>
            <p>Created at: {{ packageTemp.createdAt }}</p>

            <section class="info-section">
              <div class="sender-info">
                <h2>Sender Information</h2>
                <p>Name: {{ packageTemp.sender.user.firstName + " " + packageTemp.sender.user.lastName}}</p>
                <p>Address: {{ packageTemp.sender.user.address }}</p>
                <p>Phone Number: {{ packageTemp.sender.user.phoneNumber }}</p>
                <p>Package ID: {{ packageTemp.id }}</p>
              </div>

              <div class="receiver-info">
                <h2>Receiver Information</h2>
                <p>Name: {{ packageTemp.receiverFirstName + " " + packageTemp.receiverLastName }}</p>
                <p>Address: {{ packageTemp.receiverDistrict + ", " + packageTemp.receiverProvince }}</p>
                <p>Phone Number: {{ packageTemp.receiverPhoneNumber }}</p>
              </div>
            </section>

            <section class="package-section">
              <h2>Package Type</h2>
              <label><input type="checkbox" name="packageType" value="Tài liệu">Tài liệu</label>

              <label><input type="checkbox" name="packageType" value="Hàng hóa">Hàng hóa</label>
            </section>

            <table class="amount-table">
              <tr>
                <th>Thông tin đơn hàng</th>
                <th>Giá trị</th>
              </tr>
              <tr>
                <td>Description</td>
                <td>{{ packageTemp.description }}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>{{ packageTemp.weight }}</td>
              </tr>
            </table>

            <br><br><br>
            <h3>Cam kết của người gửi</h3>
            <p>Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và cam đoan bưu gửi này không chứa những mặt hàng nguy
              hiểm, cấm gửi. Trường hợp không phát được hãy thực hiện chỉ dẫn tại mục 6, tôi sẽ trả cước chuyển
              hoàn.</p>

            <br>
            <br><br><br>
            <div style="display: flex; justify-content: space-between">
              <div style="width: 40%">
                <p>Người gửi</p>
                <p>(Ký, ghi rõ họ tên)</p>
              </div>
              <div style="width: 40%">
                <p>Người nhận</p>
                <p>(Ký, ghi rõ họ tên)</p>
              </div>
              <div>
                <p>Bưu cục</p>
                <p>(Ký, ghi rõ họ tên)</p>
              </div>
            </div>
          </div>
        </div>
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

const billData = ref({
  id: '',
  senderName: '',
  senderPhoneNumber: '',
  name: '',
  description: '',
  receiptType: '',
  weight: '',
  receiverName: '',
  receiverPhoneNumber: '',
  hashKey: '',
  fee: '',
  createdAt: '',
})
const router = useRouter()
let packageTemp = ref({
  id: '39',
  sender: {
    user: {
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
    }
  },
  receiverFirstName: '',
  receiverLastName: '',
  receiverProvince: '',
  receiverDistrict: '',
  receiverPhoneNumber: '',
  name: '',
  description: '',
  hashKey: '',
  weight: '',
  createdAt: '',
  type: '',
})

async function submitForm() {
  $refs.get(RefNames.MAIN_FORM)?.validate(async (valid: boolean) => {
    if (valid) {
      $refs.get(RefNames.SUBMIT_BTN)?.setLoading(true)
      try {

        if (hadAccount.value) {
          const phoneNumberTemp = form.value.phoneNumber
          packageTemp.value = await PackageService.addPackageWithAccount(phoneNumberTemp, {
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
          packageTemp.value = await PackageService.addPackageWithoutAccount({

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
        if (packageTemp.value !== null) {
          billData.value = await CustomerService.postCustomerReceipt(packageTemp.value.id, {})
        }
        ElMessage({
          message: 'Thêm đơn hàng thành công!',
          type: 'success',
          duration: 5000
        })
        // emit('close')
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
.package-create-container {
  display: flex;
  justify-content: space-between;
}

.left-container {
  flex: 1;
  margin-right: 20px;
}

.right-container {
  flex: 1;
  padding: 20px;
}

.receipt-container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding-bottom: 200px;
}

.receipt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo, .qr-code {
  width: 100px;
}

.info-section {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.sender-info, .receiver-info {
  width: 45%;
}

.package-section {
  margin-top: 20px;
}

.amount-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.amount-table th, .amount-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.avatar-image {
  margin: 0 auto;
}

.avatar-image-block {
  display: flex;
}
</style>
