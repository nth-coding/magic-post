<template>
  <h1>Quản lý đơn vị</h1>
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
  <!--  <CommonButton size="large" @click="refs.FORM_ADD.openModal()">-->
  <!--    Thêm đơn vị-->
  <!--  </CommonButton>-->
  <!--    </el-col>-->
  <!--  </el-row>-->
<!--    <AddCustomer-->
<!--        :ref="toRef('FORM_ADD')"-->
<!--        @close="-->
<!--        () => {-->
<!--          fetchRecords()-->
<!--          refs.FORM_ADD.closeModal()-->
<!--        }-->
<!--      "-->
<!--    ></AddCustomer>-->
<!--    <EditCustomer-->
<!--        :id="idEdit"-->
<!--        :ref="toRef('FORM_EDIT')"-->
<!--        @close="-->
<!--        () => {-->
<!--          fetchRecords()-->
<!--          refs.FORM_EDIT.closeModal()-->
<!--        }-->
<!--      "-->
<!--    ></EditCustomer>-->

  <!--  <AddUser :model="dialogAdd" @close="closeDialogAdd"></AddUser>-->
  <!--  <EditUser v-if="idEdit" :id="idEdit" :model="dialogEdit" @close="closeDialogEdit"></EditUser>-->

  <el-table
      v-loading="loading"
      empty-text="Không có dữ liệu"
      :data="usersData"
      border
      style="width: 100%;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: #fff;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);"
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
        label="Tên"
        header-align="center"
        align="left"
        sortable
    >
      <template #default="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column
        prop="address"
        label="Địa chỉ"
        width="140"
        header-align="center"
        align="left"
    />
    <el-table-column
        prop="type"
        label="Type"
        width="140"
        header-align="center"
        align="center"
    />
<!--    <el-table-column-->
<!--        fixed="right"-->
<!--        label="Hành động"-->
<!--        width="150"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--    >-->
<!--      <template #default="scope">-->
<!--        <CommonButton-->
<!--            link-->
<!--            type="primary"-->
<!--            @click="handleEdit(scope.row.id)"-->
<!--            :ref="toRef(RefNames.EDIT_BTN) + scope.row.id"-->
<!--        >Chỉnh sửa-->
<!--        </CommonButton>-->
<!--        <el-popconfirm-->
<!--            :title="`Bạn chắc chắn muốn xóa đơn vị '${scope.row.name}'?`"-->
<!--            confirm-button-text="Xác nhận"-->
<!--            cancel-button-text="Hủy"-->
<!--            @confirm="handleDelete(scope.row.id)"-->
<!--        >-->
<!--          <template #reference>-->
<!--            <CommonButton link type="danger" :ref="toRef('DELETE_BTN')"-->
<!--            >Xóa-->
<!--            </CommonButton>-->
<!--          </template>-->
<!--        </el-popconfirm>-->
<!--      </template>-->
<!--    </el-table-column>-->
  </el-table>
  <!--  <div class="pagination-block">-->
  <!--    <el-pagination-->
  <!--        layout="prev, pager, next"-->
  <!--        :page-size="serverParams.size"-->
  <!--        :total="totalRecords"-->
  <!--        :current-page="serverParams.page"-->
  <!--        @current-change="changePage"-->
  <!--    />-->
  <!--  </div>-->
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {processErrorMessage} from '@/helper/responseErrorHandle'
import type {FormRules} from 'element-plus'
import {ElMessage} from 'element-plus'
import {CollectionPoint, TransactionPoint} from "@/services/point";
import useRefs from "@/helper/useRef";
import {useRouter} from "vue-router";

const dialogAdd = ref(false)
const dialogEdit = ref(false)
const idEdit = ref(null as unknown as number)

const loading = ref(false)
const usersData = ref<any[] | null>(null);
const rules = reactive<FormRules>({})
const form = ref({
  id: '',
  name: '',
  address: '',
})

function closeDialogEdit() {
  dialogEdit.value = false
  loadData()
}

function closeDialogAdd() {
  dialogAdd.value = false
  loadData()
}

let {$refs, toRef} = useRefs();

// const { refs, toRef } = useRefs<{
//   DELETE_BTN: InstanceType<typeof CommonButton>
//   EDIT_BTN: InstanceType<typeof CommonButton>
//   RELOAD_BTN: InstanceType<typeof CommonButton>
//   FORM_FILTER: InstanceType<any>
//   FORM_ADD: InstanceType<typeof AddCustomer>
//   FORM_EDIT: InstanceType<typeof EditCustomer>
// }>()

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

    // Fetch data from both services
    const transactionPoints = await TransactionPoint.list()
    const collectionPoints = await CollectionPoint.list()

    let maxId = Math.max(...transactionPoints.map((item: { id: any; }) => item.id));
    collectionPoints.forEach((item: { id: number; }) => item.id += maxId);

    // Add 'type' property to each item
    transactionPoints.forEach((item: { type: string; }) => item.type = 'Giao dịch')
    collectionPoints.forEach((item: { type: string; }) => item.type = 'Tập kết')

    // Combine the two arrays
    usersData.value = [...transactionPoints, ...collectionPoints]
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
