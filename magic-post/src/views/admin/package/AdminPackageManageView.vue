<template>
  <h1>Quản lý hàng hóa</h1>
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
        label="Tên"
        header-align="center"
        align="left"
        sortable
    >
      <template #default="scope">
        <strong>{{ scope.row.name }}</strong>
        <br />
        {{ scope.row.description }}
      </template>
    </el-table-column>
    <el-table-column
        prop="sender"
        label="Sender"
        width="140"
        header-align="center"
        align="center"
    />
    <el-table-column
        prop="receiverName"
        label="Receiver Name"
        width="140"
        header-align="center"
        align="center"
    />
    <el-table-column
        prop="receiverAddress"
        label="Receiver Address"
        width="180"
        header-align="center"
        align="center"
    />
    <el-table-column
        prop="receiverPhoneNumber"
        label="Receiver Phone Number"
        width="140"
        header-align="center"
        align="center"
    />
    <el-table-column
        prop="weight"
        label="Weight (kg)"
        width="140"
        header-align="center"
        align="center"
    />
    <el-table-column
        prop="type"
        label="Type"
        width="140"
        header-align="center"
        align="center"
    />
    <el-table-column
        prop="status"
        label="Status"
        width="140"
        header-align="center"
        align="center"
    />
    <el-table-column
        prop="pointDto.name"
        label="Point"
        width="140"
        header-align="center"
        align="center"
    />
    <el-table-column
        prop="pointType"
        label="Point Type"
        width="140"
        header-align="center"
        align="center"
    />
    <el-table-column
        fixed="right"
        label="Hành động"
        width="150"
        header-align="center"
        align="center"
    >
      <template #default="scope">
        <CommonButton
            link
            type="primary"
            @click="handleEdit(scope.row.id)"
            :ref="toRef(RefNames.EDIT_BTN) + scope.row.id"
        >Chỉnh sửa
        </CommonButton>
        <el-popconfirm
            :title="`Bạn chắc chắn muốn xóa đơn vị '${scope.row.name}'?`"
            confirm-button-text="Xác nhận"
            cancel-button-text="Hủy"
            @confirm="handleDelete(scope.row.id)"
        >
          <template #reference>
            <CommonButton link type="danger" :ref="toRef('DELETE_BTN')"
            >Xóa
            </CommonButton>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import { processErrorMessage } from '@/helper/responseErrorHandle'
import type { FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { PropertyEntityFullFilter } from '@/common/models'

import { useCommonRepository } from '@/services/commonRepository'
import {UserService} from "@/services/user";
import {CollectionPoint, TransactionPoint} from "@/services/point";
import {useRouter} from "vue-router";
import useRefs from "@/helper/useRef";
import {PackageService} from "@/services/package";

const dialogAdd = ref(false)
const dialogEdit = ref(false)

const loading = ref(false)
const usersData = ref<any[] | null>(null);
const idEdit = ref(null as unknown as number)
function closeDialogEdit() {
  dialogEdit.value = false
  loadData()
}

function closeDialogAdd() {
  dialogAdd.value = false
  loadData()
}

let {$refs, toRef} = useRefs();


const rules = reactive<FormRules>({})
const form = ref({
  id: '',
  name: '',
  weight: 0.0,
  address: '',
  description: '',
  type: '',
  status: '',
  receiverFirstName: '',
  receiverLastName: '',
  receiverAddress: '',
  receiverPhoneNumber: '',
  sender: '',
  transactionPoint: '',
  collectionPoint: '',
})

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

    let packages = await PackageService.list()

    usersData.value = packages.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        weight: item.weight,
        address: item.address,
        description: item.description,
        type: item.type,
        status: item.status,
        receiverName: item.receiverFirstName + item.receiverLastName,
        receiverAddress: item.receiverAddress,
        receiverPhoneNumber: item.receiverPhoneNumber,
        sender: item.userDto.firstName + " " + item.userDto.lastName,
        pointDto: item.pointDto,
        transactionPoint: item.transactionPoint,
        collectionPoint: item.collectionPoint,
        pointType: item.transactionPoint === 0 ? 'Transaction' : 'Collection',
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
