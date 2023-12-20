<template>
  <el-row type="flex" justify="center" class="login-form-container">
    <el-col :lg="8" :md="12" :sm="24">
      <el-card>
        <template #header
          ><h2 class="login-title">Gửi mail kích hoạt thành công</h2></template
        >
        <div class="detail-message">
          <p>
            Gửi mail kích hoạt thành công. Hệ thống đã gửi một e-mail xác nhận
            đến địa chỉ e-mail của bạn.
          </p>
          <p>
            Hãy kiểm tra hộp thư (bao gồm cả thư mục spam, quảng cáo,...) để
            kích hoạt tài khoản. Nếu bạn chưa nhận được email, hãy click vào
            <router-link :to="Paths.REGISTRATION_RESEND_ACTIVATION"
              >đây
            </router-link>
            để nhận lại email kích hoạt.
          </p>
          <p>
            Nếu bạn cần hỗ trợ, vui lòng gửi mail đến địa chỉ
            <a href="mailto:hotro@viver.vn">hotro@viver.vn</a> để được tư vấn hỗ
            trợ.
          </p>
        </div>
        <br />
        <div class="action-container">
          <router-link :to="Paths.REGISTRATION_RESEND_ACTIVATION">
            Gửi lại mail kích hoạt
          </router-link>
          <router-link :to="Paths.LOGIN">
            <CommonButton type="primary" size="large"> Đăng nhập</CommonButton>
          </router-link>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { Paths } from '@/router/paths'
import { useAuthenticationStore } from '@/stores/authentication'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { router } from '@/router'
import CommonButton from '@/components/common/CommonButton.vue'

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
</script>

<style scoped>
.register-container {
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid #eee;
}

.detail-message {
  color: #444;
  text-align: justify;
}

.action-container {
  justify-content: space-between;
  align-items: center;
  display: flex;
  vertical-align: center;
}
</style>
