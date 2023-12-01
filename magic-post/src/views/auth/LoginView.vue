<template>
  <div class="login-form-container">
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :lg="8" :md="12" :sm="24">
        <el-card header="Đăng nhập">
          <template #header>
            <h2 class="login-title">Đăng nhập</h2>
          </template>
          <el-form
              class="login-form"
              :model="formLogin"
              :rules="rules"
              :ref="toRef('LOGIN_FORM')"
              :size="formSize"
              @submit.native.prevent="loginWithPassword()"
          >
            <el-form-item prop="email">
              <el-input
                  type="email"
                  v-model="formLogin.email"
                  placeholder="Email"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                  v-model="formLogin.password"
                  placeholder="Password"
                  type="password"
              ></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <router-link
                    class="is-underline forgot-password"
                    type="primary"
                    :to="Paths.FORGOT_PASSWORD"
                >Quên mật khẩu?
                </router-link>
                &ensp;
                <router-link
                    class="is-underline forgot-password"
                    type="primary"
                    :to="Paths.REGISTER"
                >Đăng ký
                </router-link>
                <br />
                <router-link :to="Paths.REGISTRATION_RESEND_ACTIVATION">
                  Gửi lại mail kích hoạt
                </router-link>
              </el-col>
              <el-col :span="12">
                <el-form-item class="login-button-container">
                  <CommonButton
                      :ref="toRef('LOGIN_BTN')"
                      class="login-button"
                      size="large"
                      type="primary"
                      native-type="submit"
                      block
                  >Đăng nhập
                  </CommonButton>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
<!--          <div class="google-btn" @click="loginWithGoogle">-->
<!--            <div class="google-icon-wrapper">-->
<!--              <img class="google-icon" src="@/assets/images/google.svg" />-->
<!--            </div>-->
<!--            <p class="btn-text"><b>Đăng nhập với Google</b></p>-->
<!--          </div>-->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {
  // getGoogleFacebookUrl,
  // getGoogleLoginUrl,
  login,
  updateTokenForAuthCode,
} from '@/services/auth'
import { Paths } from '@/router/paths'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref, watch } from 'vue'
import { ElMessage, type FormRules } from 'element-plus'

import CommonButton from '@/components/common/CommonButton.vue'
import { useAuthenticationStore } from '@/stores/authentication'
import { storeToRefs } from 'pinia'
import {
  putLocalStorage,
  removeLocalStorage,
} from '@/helper/LocalStorageHelper'
import { LocalStorageKeys } from '@/constants/LocalStorageKey'
import useRefs from '@/common/useRefs'

const { refs, toRef } = useRefs<{
  LOGIN_FORM: InstanceType<any>
  LOGIN_BTN: InstanceType<typeof CommonButton>
}>()
const $route = useRoute()
const $router = useRouter()
const formLogin = ref({
  email: '',
  password: '',
})
const formSize = ref('large')
const rules = reactive<FormRules>({
  email: [
    {
      required: true,
      message: 'Email is required',
      trigger: 'blur',
    },
    {
      min: 4,
      message: 'Email length should be at least 5 characters',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: 'Hãy nhập chính xác địa chỉ email',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    {
      min: 5,
      message: 'Mật khẩu được nhập phải có ít nhất 5 ký tự',
      trigger: 'blur',
    },
  ],
})

const authenticationStore = useAuthenticationStore()
const { authenticated } = storeToRefs(authenticationStore)
onMounted(() => {
  if (
      $route.query.filePath &&
      ['PC', 'Mac'].includes($route.query.platform as string)
  ) {
    putLocalStorage(
        LocalStorageKeys.FILE_PATH_FOR_RETURN,
        $route.query.filePath
    )
  } else {
    removeLocalStorage(LocalStorageKeys.FILE_PATH_FOR_RETURN)
  }
})
watch(
    authenticated,
    async (newAuth) => {
      if (newAuth) {
        if ($route.query.authCode) {
          await updateTokenForAuthCode($route.query.authCode as string)
          await $router.push(Paths.LOGIN_ADDIN_SUCCESS)
        } else if ($route.query.redirectUrl) {
          location.href = $route.query.redirectUrl as string
        } else {
          await $router.push(Paths.HOME)
        }
      }
    },
    {
      immediate: true,
    }
)

const router = useRouter()
const route = useRoute()

async function loginWithPassword() {
  refs.LOGIN_FORM.validate(async (valid: any) => {
    if (valid) {
      refs.LOGIN_BTN?.setLoading(true)
      try {
        const loginRes = await login(
            formLogin.value,
            route.query.authCode as string
        )
        if (loginRes.headers.loginbyauthcode === 'true') {
          await router.push(Paths.LOGIN_ADDIN_SUCCESS)
        } else if ($route.query.redirectUrl) {
          location.href = $route.query.redirectUrl as string
        } else {
          await router.push(Paths.HOME)
        }
      } catch (e: any) {
        ElMessage.error(
            e.response?.data?.data
                ? e.response?.data?.data
                : 'Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại!'
        )
      } finally {
        refs.LOGIN_BTN?.setLoading(false)
      }
    }
  })
}

// function loginWithGoogle() {
//   location.href = getGoogleLoginUrl() + '&authCode=' + route.query.authCode
// }
//
// function loginWithFacebook() {
//   location.href = getGoogleFacebookUrl() + '&authCode=' + route.query.authCode
// }
</script>

<style lang="scss" scoped>
$white: #fff;
$google-blue: #409eff;
$button-active-blue: #1669f2;

.google-btn {
  cursor: pointer;
  width: 100%;
  height: 42px;
  background-color: $google-blue;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);

  .google-icon-wrapper {
    position: absolute;
    margin-top: 1px;
    margin-left: 1px;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color: $white;
  }

  .google-icon {
    position: absolute;
    margin-top: 11px;
    margin-left: 11px;
    width: 18px;
    height: 18px;
  }

  .btn-text {
    position: relative;
    left: 48px;
    height: 40px;
    display: flex;
    align-items: center;
    color: white;
  }
}

.login-button-container {
  float: right;
}
</style>

<style lang="scss">
.login-title {
  margin-top: 0;
  margin-bottom: 0;
}

.login-form-container {
  margin-top: 5rem;
}

.router-link-custom {
  text-decoration: none;
}
</style>
