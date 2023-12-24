<template>
  <div>
    <h1>Thông tin tài khoản</h1>
    <br />
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
      <br />
      <br />
      <el-form-item label="Email" prop="email">
        <span class="user-info-detail">
          {{ form.email }}
        </span>
      </el-form-item>
      <el-form-item label="Tên" prop="name">
        <el-input v-model="form.name" />
        <el-link
          :underline="false"
          class="btn-function"
          @click="openChangePasswordDialog"
          >Thay đổi mật khẩu
        </el-link>
      </el-form-item>

      <el-form-item label="Thời gian hết hạn" prop="expiryDate">
        <span class="user-info-detail">
          {{ form.expiryDate }}
        </span>
      </el-form-item>
      <el-form-item label="Đơn vị" prop="organization">
        <el-row :gutter="22" style="width: 100%" v-if="form.organization">
          <el-col :span="18">
            <span class="user-info-detail">
              {{ form.organization }}
            </span>
          </el-col>
          <el-col :span="6">
            <el-popconfirm
              title="Bạn chắc chắn muốn xóa liên kết với đơn vị này?"
              confirm-button-text="Xác nhận"
              cancel-button-text="Hủy"
              @confirm="removeOrg"
            >
              <template #reference>
                <el-link :underline="false" class="upgrade-acc-btn">
                  Bỏ liên kết
                </el-link>
              </template>
            </el-popconfirm>
          </el-col>
        </el-row>
        <el-row :gutter="22" style="width: 100%" v-else>
          <el-col :span="16">
            <span class="user-info-detail"
              >Chưa có đơn vị nào được liên kết</span
            >
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <CommonButton
          type="primary"
          @click="submitForm"
          :ref="toRef('SUBMIT_BTN')"
          >Lưu lại
        </CommonButton>
        <CommonButton @click="resetForm" type="default">Đặt lại</CommonButton>
      </el-form-item>
    </el-form>
  </div>
  <el-drawer v-model="drawer" :direction="direction">
    <template #header>
      <h2>Nâng cấp tài khoản</h2>
    </template>
    <UpgradeAccount />
  </el-drawer>
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
      <CommonButton type="default" @click="closeFormChangePassword"
        >Hủy bỏ
      </CommonButton>
      <CommonButton
        :ref="toRef('SUBMIT_BTN_FORM_CHANGE_PASSWORD')"
        type="primary"
        @click="submitFormChangePassword"
        >Lưu lại
      </CommonButton>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'

import { useAuthenticationStore } from '@/stores/authentication'
import { storeToRefs } from 'pinia'
import { Paths } from '@/router/paths'
import { ElMessage } from 'element-plus/es'
import { processErrorMessage } from '@/helper/responseErrorHandle'
import CommonButton from '@/components/common/CommonButton.vue'
import useRefs from '@/common/useRefs'

const drawer = ref(false)
const direction = ref('rtl')

const { refs, toRef } = useRefs<{
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
    { required: true, message: 'Hãy nhập mật khẩu ', trigger: 'blur' },
    { min: 8, message: 'Mật khẩu tối thiểu 8 kí tự', trigger: 'change' },
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
}

const form = ref({
  email: '',
  name: '',
  plan: '',
  organization: '',
  emailConfirmed: false,
  expiryDate: '',
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
const { authenticated, user } = storeToRefs(authenticationStore)

watch(
  authenticated,
  (newAuth) => {
    if (newAuth && user.value) {
      updateUserInfo(user.value as UserInfo)
    }
  },
  {
    immediate: true,
  }
)

async function removeOrg() {
  try {
    await UserService.editProfile({
      removeOrganization: true,
    })
    ElMessage({
      message: 'Xóa đơn vị thành công thành công!',
      type: 'success',
      duration: 5000,
    })
    form.value.organization = ''
  } catch (e: any) {
    processErrorMessage(e)
  }
}

function updateUserInfo(userInfo: UserInfo) {
  const planForUser = userInfo.plan.name
  const planForOrg = userInfo.organization.plan.name
  const bestPlan = getBestPlan(planForUser, planForOrg)
  form.value = {
    email: userInfo.email,
    name: userInfo.name,
    plan: bestPlan.plan + (bestPlan.isFromOrg ? ' (Gói chung từ đơn vị)' : ''),
    expiryDate: bestPlan.isFromOrg
      ? userInfo.organization.expiryDate
      : userInfo.expiryDate,
    organization: userInfo.organization.name,
    emailConfirmed: userInfo.emailConfirmed,
  }
  imgUrl.value = userInfo.imageUrl
}

function getBestPlan(
  planForUser: string,
  planForOrg: string
): { plan: string; isFromOrg: boolean } {
  type numRecord = Record<string, number>

  const planOrder: numRecord = {
    ADMIN: 1,
    PREMIUM: 2,
    ADMIN_ORGANIZATION: 3,
    STANDARD: 4,
  }
  // ([
  //   ["ADMIN", 1],
  //   ["PREMIUM", 2],
  //   ["ADMIN_ORGANIZATION", 3],
  //   ["STANDARD", 4]
  // ]) as Map<string, number>

  if (!planForOrg) {
    return { plan: planForUser, isFromOrg: false }
  } else {
    if (!planForUser) return { plan: planForOrg, isFromOrg: true }
    else {
      // if (planOrder.has(planForOrg) && planOrder.has(planForUser) &&
      //     planOrder.get(planForOrg) < planOrder.get(planForUser)) {
      if (
        planOrder[planForOrg] < planOrder[planForUser] &&
        planOrder[planForOrg] &&
        planOrder[planForUser]
      ) {
        return { plan: planForOrg, isFromOrg: true }
      } else {
        return { plan: planForUser, isFromOrg: false }
      }
    }
  }
}

function submitForm() {
  refs.MAIN_FORM?.validate(async (valid: boolean) => {
    if (valid) {
      refs.SUBMIT_BTN?.setLoading(true)
      try {
        await UserService.editProfile({
          name: form.value.name,
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
  if (user.value) updateUserInfo(user.value as UserInfo)
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
</style>
