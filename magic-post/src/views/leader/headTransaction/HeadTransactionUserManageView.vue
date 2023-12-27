<template>
  <h1>Quản lý giao dịch viên</h1>
  <br/>

  <CommonButton size="large" @click="dialogAdd = true; console.log(dialogAdd)">Thêm giao dịch viên</CommonButton>

  <AddStaff v-model="dialogAdd" @close="closeDialogAdd"></AddStaff>
  <EditStaff v-if="idEdit" :form-edit="form_edit" v-model="dialogEdit" @close="closeDialogEdit"></EditStaff>

  <el-table
      v-loading="loading"
      empty-text="Không có dữ liệu"
      :data="data"
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
        <strong>{{ scope.row.firstName + scope.row.lastName }}</strong>
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
    />
    <el-table-column
        align="center"
        header-align="center"
        label="SDT"
        prop="phoneNumber"
        width="160"
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
            :title="`Bạn chắc chắn muốn xóa người dùng '${scope.row.name}'?`"
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
import CommonButton from '@/components/common/CommonButton.vue'
import {processErrorMessage} from '@/helper/responseErrorHandle'
import type {FormRules} from 'element-plus'
import {ElMessage} from 'element-plus'
import useRefs from '@/helper/useRef'
import AddCustomer from "@/views/admin/customer/AddCustomer.vue";
import EditCustomer from "@/views/admin/customer/EditCustomer.vue";
import {PackageService} from "@/services/package";
import {useRouter} from "vue-router";
import AddStaff from "@/views/leader/headCollection/AddStaff.vue";
import EditStaff from "@/views/leader/headCollection/EditStaff.vue";

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

// create for me about 5 example to table has data
const data = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe@example.com',
    address: '123 Main St',
    phoneNumber: '123-456-7890',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    username: 'janedoe@example.com',
    address: '456 Elm St',
    phoneNumber: '234-567-8901',
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Smith',
    username: 'bobsmith@example.com',
    address: '789 Pine St',
    phoneNumber: '345-678-9012',
  },
  {
    id: 4,
    firstName: 'Alice',
    lastName: 'Johnson',
    username: 'alicejohnson@example.com',
    address: '1012 Oak St',
    phoneNumber: '456-789-0123',
  },
  {
    id: 5,
    firstName: 'Charlie',
    lastName: 'Brown',
    username: 'charliebrown@example.com',
    address: '1234 Maple St',
    phoneNumber: '567-890-1234',
  },
];

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


  } catch (e) {
    processErrorMessage(e, "Có lỗi đã xảy ra trong quá trình tải dữ liệu. " +
        "Vui lòng thử lại sau!")
  } finally {
    $refs.get(RefNames.RELOAD_BTN)?.setLoading(false)
    loading.value = false
  }
}

const router = useRouter()
var form_edit = {}
function handleEdit(id: number) {
  idEdit.value = id
  dialogEdit.value = true
  form_edit = data[id - 1]
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
  