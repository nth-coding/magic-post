<template>
  <h1>Quản lý giao dịch viên</h1>
  <br/>

  <CommonButton size="large" @click="dialogAdd = true">Thêm nhân viên</CommonButton>

  <AddStaff v-model="dialogAdd" @close="closeDialogAdd"></AddStaff>
  <EditStaff v-if="idEdit" :id="idEdit" v-model="dialogEdit" @close="closeDialogEdit"></EditStaff>
  <div class="packages-list-container">
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
        <strong>{{ scope.row.firstName + " " + scope.row.lastName }}</strong>
        <br/>
        {{ scope.row.username }}
        <br/>
      </template>
    </el-table-column>
    <el-table-column
        prop="address"
        label="Địa chỉ"
        width="140"
        header-align="center"
        align="center"
    >
      <template #default="scope">
        <p v-if="!scope.row.address" class="text-slate-400">Chưa có thông tin</p>
      </template>
    </el-table-column>
    <el-table-column
        align="center"
        header-align="center"
        label="SDT"
        prop="phoneNumber"
        width="160"
    >
      <template #default="scope">
        <p v-if="!scope.row.phoneNumber" class="text-slate-400">Chưa có thông tin</p>
      </template>
    </el-table-column>
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
            :title="`Bạn chắc chắn muốn xóa người dùng #'${scope.row.id}'?`"
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
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import CommonButton from '@/components/common/CommonButton.vue'
import {processErrorMessage} from '@/helper/responseErrorHandle'
import type {FormRules} from 'element-plus'
import {ElMessage} from 'element-plus'
import useRefs from '@/helper/useRef'
import {useRouter} from "vue-router";
import AddStaff from "@/views/leader/headTransaction/AddStaff.vue";
import EditStaff from "@/views/leader/headTransaction/EditStaff.vue";
import {StaffService} from "@/services/user";

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
  email: '',
  name: '',
  plan: '0',
  organization: '0',
  emailConfirmed: null,
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

    let users = await StaffService.listForHeadTran()
    usersData.value = users.map((user: any) => {
      return {
        id: user.userDto.id,
        firstName: user.userDto.firstName,
        lastName: user.userDto.lastName,
        username: user.userDto.username,
        address: user.userDto.address,
        phoneNumber: user.userDto.phoneNumber,
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
    await StaffService.deleteForHeadTran(id)
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
.packages-list-container {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  font-size: 2em;
  margin-bottom: 1rem;
}

h2 {
  color: #666;
  font-size: 1.5em;
  margin-bottom: 1rem;
}

.el-table {
  width: 100%;
}
</style>
