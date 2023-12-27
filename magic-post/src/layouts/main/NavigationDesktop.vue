<template>
  <div class="desktop-navigation-container">
    <el-menu
        :default-active="$route.path"
        class="desktop-navigation-menu"
        router
    >
      <router-link :to="Paths.HOME">
        <div class="desktop-logo-container">
          <img src="@/assets/images/logo.svg" class="desktop-logo" />
        </div>
      </router-link>
      <el-menu-item-group v-if="roleList.includes(roles.ROLE_BOSS)">
        <template #title> Quản lý hệ thống</template>
        <el-menu-item
            :route="Paths.ADMIN_MANAGE_USER"
            :index="Paths.ADMIN_MANAGE_USER"
        >
          <FAIcon icon="fa-solid fa-user-group" />
          Quản lý tài khoản
        </el-menu-item>
        <el-menu-item
            :route="Paths.ADMIN_MANAGE_POINT"
            :index="Paths.ADMIN_MANAGE_POINT"
        >
          <FAIcon icon="fa-solid fa-building" />
          Quản lý đơn vị
        </el-menu-item>
        <el-menu-item
            :route="Paths.ADMIN_MANAGE_PACKAGE"
            :index="Paths.ADMIN_MANAGE_PACKAGE"
        >
          <FAIcon icon="fa-solid fa-box-archive" />
          Quản lý đơn hàng
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group v-if="roleList.includes(roles.ROLE_HEADCOL)">
        <template #title> Quản lý điểm tập kết</template>
        <el-menu-item
            :route="Paths.HEADCOL_MANAGE_USER"
            v-if="roleList.includes(roles.ROLE_HEADCOL)"
            :index="Paths.HEADCOL_MANAGE_USER"
        >
          <FAIcon icon="fa-solid fa-user-group" />
          Quản lý tài khoản
        </el-menu-item>
        <el-menu-item
            :route="Paths.HEADCOL_MANAGE_ORDER"
            v-if="roleList.includes(roles.ROLE_HEADCOL)"
            :index="Paths.HEADCOL_MANAGE_ORDER"
        >
          <FAIcon icon="fa-solid fa-box"/>
          Quản lý đơn hàng
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group v-if="roleList.includes(roles.ROLE_HEADTRAN)">
        <template #title> Quản lý điểm giao dịch</template>
        <el-menu-item
              :route="Paths.HEADTRAN_MANAGE_USER"
              v-if="roleList.includes(roles.ROLE_HEADTRAN)"
              :index="Paths.HEADTRAN_MANAGE_USER"
          >
            <FAIcon icon="fa-solid fa-user-group" />
            Quản lý tài khoản
          </el-menu-item>
          <el-menu-item
            :route="Paths.HEADTRAN_MANAGE_ORDER"
            v-if="roleList.includes(roles.ROLE_HEADCOL)"
            :index="Paths.HEADTRAN_MANAGE_ORDER"
        >
          <FAIcon icon="fa-solid fa-box"/>
          Quản lý đơn hàng
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title> Cá nhân</template>

        <el-menu-item :route="Paths.MANAGE_USER" :index="Paths.MANAGE_USER">
          <FAIcon icon="fas fa-user" />
          Tài khoản
        </el-menu-item>
        <el-menu-item index="#" @click="logout">
          <FAIcon icon="fas fa-sign-out-alt" />
          Đăng xuất
        </el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
// No script needed for this simple navigation
import {Paths} from "@/router/paths";
import {ElMessage} from "element-plus";
import {storeToRefs} from "pinia";
import {useAuthenticationStore} from "@/stores/authentication";
import {useRoute} from "vue-router";
import FAIcon from "@/components/common/FAIcon.vue";
import {roles} from "@/constants/Role";
import {router} from "@/router";


const $route = useRoute()

const authenticationStore = useAuthenticationStore()

const { roleList } = storeToRefs(authenticationStore)

function logout() {
  authenticationStore.logout()
  router.push(Paths.HOME)
  ElMessage.success({ message: 'Đăng xuất thành công' })
}
</script>

<style scoped lang="scss">
.desktop-logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
}

.desktop-logo {
  width: 90%;
  max-width: 150px;
}

.language-toggle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}

.desktop-navigation-container {
  height: 100%;
}

.desktop-navigation-menu {
  height: 100%;
}
</style>
<style>
.el-menu-item > .icon {
  min-width: 20px;
}
</style>