<template>
  <h1>Quản lý người dùng</h1>
  <br />
<!--  <el-row :gutter="12">-->
<!--    <el-col :md="16">-->
<!--      <el-form-->
<!--          label-position="left"-->
<!--          :model="filter"-->
<!--          :ref="toRef('FORM_FILTER')"-->
<!--          :rules="rules"-->
<!--          @change="fetchRecords"-->
<!--          style="max-width: 800px"-->
<!--      >-->
<!--        <el-row :gutter="10">-->
<!--          <el-col :md="3">-->
<!--            <el-form-item label="ID" prop="id">-->
<!--              <el-input-->
<!--                  v-model="filter.id"-->
<!--                  :min="0"-->
<!--                  placeholder="Tìm ID"-->
<!--                  type="number"-->
<!--              />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :md="9">-->
<!--            <el-form-item label="Tên" prop="name">-->
<!--              <el-input-->
<!--                  v-model="filter.name"-->
<!--                  placeholder="Lọc theo tên người dùng"-->
<!--              />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :md="9">-->
<!--            <el-form-item label="Email" prop="email">-->
<!--              <el-input-->
<!--                  type="email"-->
<!--                  v-model="filter.email"-->
<!--                  placeholder="Lọc theo email người dùng"-->
<!--              />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :md="3">-->
<!--            <CommonButton type="default" @click="resetFilter"-->
<!--            >Đặt lại-->
<!--            </CommonButton>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-form-item label="Gói cá nhân" prop="plan">-->
<!--          <el-radio-group placeholder="Chọn gói..." v-model="filter.planId">-->
<!--            <PlanList />-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="Đơn vị" prop="organization">-->
<!--          <el-select-->
<!--              v-model="filter.organizationId"-->
<!--              class="m-2"-->
<!--              placeholder="Lọc theo đơn vị..."-->
<!--              @change="-->
<!--              () => {-->
<!--                fetchRecords-->
<!--              }-->
<!--            "-->
<!--          >-->
<!--            <OrganizationList></OrganizationList>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Xác nhận Email" prop="emailConfirmed">-->
<!--          <el-radio-group v-model="filter.emailConfirmed" class="ml-4">-->
<!--            <el-radio-button :label="''">Tất cả</el-radio-button>-->
<!--            <el-radio-button :label="emailComfirmed(true)"-->
<!--            >Đã xác nhận-->
<!--            </el-radio-button>-->
<!--            <el-radio-button :label="emailComfirmed(false)"-->
<!--            >Chưa xác nhận-->
<!--            </el-radio-button>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </el-col>-->
<!--    <el-col :md="8" class="flex-right margin-bottom-1rem">-->
<!--      <CommonButton-->
<!--          :ref="toRef('RELOAD_BTN')"-->
<!--          size="large"-->
<!--          type="default"-->
<!--          @click="fetchRecords"-->
<!--      >-->
<!--        <template #loadingIconOnly>-->
<!--          <el-icon class="is-loading">-->
<!--            <Loading />-->
<!--          </el-icon>-->
<!--        </template>-->
<!--        <el-icon>-->
<!--          <Refresh />-->
<!--        </el-icon>-->
<!--      </CommonButton>-->
  <el-table
      v-loading="loading"
      empty-text="Không có dữ liệu"
      :data="usersData"
      border
      style="width: 100%"
  >
    <el-table-column
        prop="id"
        label="ID"
        width="65"
        header-align="center"
        align="center"
        sortable
    />
    <el-table-column
        prop="name"
        min-width="180"
        label="Tên và email"
        header-align="center"
        align="left"
        sortable
    >
      <template #default="scope">
        <strong>{{ scope.row.name }}</strong>
        <br />
        {{ scope.row.username }}
      </template>
    </el-table-column>
    <el-table-column
        prop="address"
        label="Address"
        width="180"
        header-align="center"
        align="center"
    />
    <el-table-column
        prop="phoneNumber"
        label="Phone Number"
        width="180"
        header-align="center"
        align="center"
    />
    <el-table-column
        label="Is Manager"
        width="180"
        header-align="center"
        align="center"
    >
      <template #default="scope">
        <FAIcon v-if="scope.row.isManager" icon="fa-solid fa-check"></FAIcon>
      </template>
    </el-table-column>
    <el-table-column
        prop="type"
        label="Type"
        width="180"
        header-align="center"
        align="center"
    />
    <el-table-column
        prop="point"
        label="Point"
        width="250"
        header-align="center"
        align="left"
    />
  </el-table>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {processErrorMessage} from '@/helper/responseErrorHandle'
import type {FormRules} from 'element-plus'
import {ElMessage} from 'element-plus'
import useRefs from '@/helper/useRef'
import {StaffService} from "@/services/user";
import {useRouter} from "vue-router";
import FAIcon from '@/components/common/FAIcon.vue'

const dialogAdd = ref(false)
const dialogEdit = ref(false)
const idEdit = ref(null as unknown as number)

const loading = ref(false)
const usersData = ref<any[] | null>(null);
const rules = reactive<FormRules>({})

function closeDialogEdit() {
  dialogEdit.value = false
  loadData()
}

function closeDialogAdd() {
  dialogAdd.value = false
  loadData()
}

let {$refs, toRef} = useRefs();

const RefNames = {
  DELETE_BTN: 'DELETE_BTN_',
  EDIT_BTN: 'EDIT_BTN_',
  TABLE: 'TABLE',
  FORM_FILTER: 'FORM_FILTER',
  RELOAD_BTN: 'RELOAD_BTN'
}

onMounted(async () => {
  await loadData()
})

async function loadData() {
  try {
    loading.value = true
    $refs.get(RefNames.RELOAD_BTN)?.setLoading(true)

    let users = await StaffService.listForBoss()
    usersData.value = users.map((user: any) => {
      let userDTO = user.userDto
      let fname = userDTO.firstName ? userDTO.firstName : ""
      let lname = userDTO.lastName ? userDTO.lastName : ""
      return {
        id: userDTO.id,
        name: fname + " " + lname,
        username: userDTO.username,
        address: userDTO.address,
        phoneNumber: userDTO.phoneNumber,
        isManager: user.isManager,
        type: user.type.substring(5),
        point: user.pointDto.name
      }
    })

  } catch (e) {
    processErrorMessage(e, "Có lỗi đã xảy ra trong quá trình tải dữ liệu. " +
        "Vui lòng thử lại sau!")
  } finally {
    $refs.get(RefNames.RELOAD_BTN)?.setLoading(false)
    loading.value = false
  }
}

const router = useRouter()

function handleEdit(id: number) {
  idEdit.value = id
  dialogEdit.value = true
}

async function handleDelete(id: number) {
  $refs.get(RefNames.DELETE_BTN + id)?.setLoading(true)
  try {
    // await deleteUser(id)
    await loadData()
    ElMessage.success("Xóa người dùng thành công!")
  } catch (e) {
    processErrorMessage(e,
        "Có lỗi đã xảy ra trong quá trình xóa người dùng. " +
        "Vui lòng thử lại sau!")
  } finally {
    $refs.get(RefNames.DELETE_BTN + id)?.setLoading(false)
  }
}
</script>

<style scoped>
.add-user-btn {
  float: right;
  margin-bottom: 1.5rem;
}

.pagination-block {
  margin-top: 15px;
  float: right;
}

.el-table .warning-row {
  background: oldlace;
}

h1 {
  color: #333;
  font-size: 2em;
  margin-bottom: 1rem;
}
</style>
