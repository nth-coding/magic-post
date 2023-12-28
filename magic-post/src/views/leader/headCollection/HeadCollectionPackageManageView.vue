<template>
  <h1>Quản lý đơn hàng</h1>
  <br />

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
        label="Tên đơn hàng"
        header-align="center"
        align="left"
        sortable
    />
    <el-table-column
        prop="weight"
        label="Trọng lượng"
        width="130"
        header-align="center"
        align="center"
        sortable
    />
    
    <el-table-column
        prop="description"
        min-width="180"
        label="Mô tả"
        header-align="center"
        align="left"
    />

    <el-table-column
        prop="type"
        min-width="180"
        label="Loại"
        header-align="center"
        align="left"
        sortable
    />

    <el-table-column
        prop="status"
        min-width="180"
        label="Trạng thái"
        header-align="center"
        align="left"
        sortable
    />

    <el-table-column
        prop="senderName"
        min-width="180"
        label="Tên người gửi"
        header-align="center"
        align="left"

    >
      <template #default="scope">
          <strong>{{ scope.row.senderFirstName + ' ' + scope.row.senderLastName }}</strong>
      </template>
    </el-table-column>

    <el-table-column
        prop="senderAddress"
        label="Địa chỉ người gửi"
        width="140"
        header-align="center"
        align="center"
    />

    <el-table-column
        align="center"
        header-align="center"
        label="SDT người gửi"
        prop="senderPhoneNumber"
        width="160"
    />

    <el-table-column
        prop="receiverName"
        min-width="180"
        label="Tên người nhận"
        header-align="center"
        align="left"
        sortable
    >
      <template #default="scope">
          <strong>{{ scope.row.receiverFirstName + ' ' + scope.row.receiverLastName }}</strong>
      </template>
    </el-table-column>

    <el-table-column
        prop="receiverAddress"
        label="Địa chỉ người nhận"
        width="150"
        header-align="center"
        align="center"
    />

    <el-table-column
        align="center"
        header-align="center"
        label="SDT người nhận"
        prop="receiverPhoneNumber"
        width="160"
    />

    <el-table-column
        align="center"
        header-align="center"
        label="Điểm đến tiếp theo"
        prop="nextPoint"
        width="160"
    />

    
  </el-table>
</template>

<script setup lang="ts">


// create for me about 5 example to table has data

import {onMounted, reactive, ref} from "vue";
import {ElMessage, type FormRules} from "element-plus";
import useRefs from "@/helper/useRef";
import {CollectionPoint, TransactionPoint} from "@/services/point";
import {processErrorMessage} from "@/helper/responseErrorHandle";
import {useRouter} from "vue-router";
import CommonButton from "@/components/common/CommonButton.vue";

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

const data = [
  {
    id: 1,
    name: 'quạt',
    weight: '2 kg',
    description: 'hơi to',
    type: 'hàng nhẹ',
    status: 'đang vận chuyển',

    senderFirstName: 'John',
    senderLastName: 'Doe',
    senderAddress: '123 Main St',
    senderPhoneNumber: '123-456-7890',

    receiverFirstName: 'Jane',
    receiverLastName: 'Doe',
    receiverAddress: '456 Elm St',
    receiverPhoneNumber: '234-567-8901',

    nextPoint: '123 Main St',
  },
  {
    id: 2,
    name: 'quạt',
    weight: '2 kg',
    description: 'hơi to',
    type: 'hàng nhẹ',
    status: 'đang vận chuyển',

    senderFirstName: 'John',
    senderLastName: 'Doe',
    senderAddress: '123 Main St',
    senderPhoneNumber: '123-456-7890',

    receiverFirstName: 'Jane',
    receiverLastName: 'Doe',
    receiverAddress: '456 Elm St',
    receiverPhoneNumber: '234-567-8901',

    nextPoint: '456 Elm St',
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

    let users = await TransactionPoint.list()
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
