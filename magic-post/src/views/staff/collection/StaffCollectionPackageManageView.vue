<template>
  <h1>Quản lý đơn hàng</h1>
  <br />
  <div class="packages-list-container">
    <h2>Pending packages</h2>
    <br />
    <el-table
        v-loading="loading"
        empty-text="Không có dữ liệu"
        :data="packagesPendingData"
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
      >
        <template #default="scope">
          <strong>{{ scope.row.name }}</strong>

          <br>
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column
          prop="weight"
          label="Trọng lượng"
          width="130"
          header-align="center"
          align="center"
          sortable
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
          {{ scope.row.senderFirstName + ' ' + scope.row.senderLastName }}
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
          {{ scope.row.receiverFirstName + ' ' + scope.row.receiverLastName }}
        </template>
      </el-table-column>

      <el-table-column
          prop="receiverAddress"
          label="Địa chỉ người nhận"
          width="150"
          header-align="center"
          align="center"
      >
        <template #default="scope">
          {{ scope.row.receiverDistrict }} , {{ scope.row.receiverProvince }}
        </template>
      </el-table-column>

      <el-table-column
          align="center"
          header-align="center"
          label="SDT người nhận"
          prop="receiverPhoneNumber"
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
              @click="handleConfirm(scope.row.id, scope.row.sentFrom)"
          >Xác nhận
          </CommonButton>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div class="packages-list-container">
    <h2>Sent packages</h2>
    <br />
    <el-table
        v-loading="loading"
        empty-text="Không có dữ liệu"
        :data="packagesSentData"
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
      >
        <template #default="scope">
          <strong>{{ scope.row.name }}</strong>

          <br>
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column
          prop="weight"
          label="Trọng lượng"
          width="130"
          header-align="center"
          align="center"
          sortable
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
          {{ scope.row.senderFirstName + ' ' + scope.row.senderLastName }}
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
          {{ scope.row.receiverFirstName + ' ' + scope.row.receiverLastName }}
        </template>
      </el-table-column>

      <el-table-column
          prop="receiverAddress"
          label="Địa chỉ người nhận"
          width="150"
          header-align="center"
          align="center"
      >
        <template #default="scope">
          {{ scope.row.receiverDistrict }} , {{ scope.row.receiverProvince }}
        </template>
      </el-table-column>

      <el-table-column
          align="center"
          header-align="center"
          label="SDT người nhận"
          prop="receiverPhoneNumber"
          width="160"
      />
    </el-table>
  </div>

  <div class="packages-list-container">
    <h2>Current packages</h2>
    <br />
    <el-table
        v-loading="loading"
        empty-text="Không có dữ liệu"
        :data="packagesCurrentData"
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
      >
        <template #default="scope">
          <strong>{{ scope.row.name }}</strong>

          <br>
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column
          prop="weight"
          label="Trọng lượng"
          width="130"
          header-align="center"
          align="center"
          sortable
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
          {{ scope.row.senderFirstName + ' ' + scope.row.senderLastName }}
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
          >Tạo đơn
          </CommonButton>
        </template>
      </el-table-column>

    </el-table>
  </div>

  <div class="packages-list-container">
    <h2>Receive packages</h2>
    <br />
    <el-table
        v-loading="loading"
        empty-text="Không có dữ liệu"
        :data="packagesSentData"
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
      >
        <template #default="scope">
          <strong>{{ scope.row.name }}</strong>

          <br>
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column
          prop="weight"
          label="Trọng lượng"
          width="130"
          header-align="center"
          align="center"
          sortable
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
          {{ scope.row.senderFirstName + ' ' + scope.row.senderLastName }}
        </template>
      </el-table-column>
    </el-table>
  </div>

  <AddDeliveryReceipt v-if="idEdit" :id="idEdit" v-model="dialogEdit" @close="closeDialogEdit"></AddDeliveryReceipt>
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
import {PackageService} from "@/services/package";
import AddDeliveryReceipt from "@/views/staff/collection/AddDeliveryReceipt.vue";

const dialogAdd = ref(false)
const dialogEdit = ref(false)
const dialogConfirm = ref(false)

const idEdit = ref(null as unknown as number)
const idConfirm = ref(null as unknown as number)

const loading = ref(false)

const packagesSentData = ref<any[] | null>(null);
const packagesReceivedData = ref<any[] | null>(null);
const packagesCurrentData = ref<any[] | null>(null);
const packagesPendingData = ref<any[] | null>(null);

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

function closeDialogConfirm() {
  dialogConfirm.value = false
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

    let pendingPackages = await PackageService.listPendingForStaffCol()
    packagesPendingData.value = pendingPackages.map((p : any) => {
      return {
        id: p.id,
        name: p.name,
        weight: p.weight,
        description: p.description,
        type: p.type,
        status: p.status,
        senderFirstName: p.sender.user.firstName,
        senderLastName: p.sender.user.lastName,
        senderAddress: p.sender.user.address,
        senderPhoneNumber: p.sender.user.phoneNumber,
        receiverFirstName: p.receiverFirstName,
        receiverLastName: p.receiverLastName,
        receiverAddress: p.receiverAddress,
        receiverPhoneNumber: p.receiverPhoneNumber,
        receiverDistrict: p.receiverDistrict,
        receiverProvince: p.receiverProvince,
        sentFrom: p.sentFrom,
        // nextPoint: p.nextPoint
      }
    })

    let sentPackages = await PackageService.listSentForStaffCol()
    packagesSentData.value = sentPackages.map((p : any) => {
      return {
        id: p.id,
        name: p.name,
        weight: p.weight,
        description: p.description,
        type: p.type,
        status: p.status,
        senderFirstName: p.sender.user.firstName,
        senderLastName: p.sender.user.lastName,
        senderAddress: p.sender.user.address,
        senderPhoneNumber: p.sender.user.phoneNumber,
        receiverFirstName: p.receiverFirstName,
        receiverLastName: p.receiverLastName,
        receiverAddress: p.receiverAddress,
        receiverPhoneNumber: p.receiverPhoneNumber,
        receiverDistrict: p.receiverDistrict,
        receiverProvince: p.receiverProvince,
        // nextPoint: p.nextPoint
      }
    })

    let currentPackages = await PackageService.listCurrForStaffCol()
    packagesCurrentData.value = currentPackages.map((p : any) => {
      return {
        id: p.id,
        name: p.name,
        weight: p.weight,
        description: p.description,
        type: p.type,
        status: p.status,
        senderFirstName: p.sender.user.firstName,
        senderLastName: p.sender.user.lastName,
        senderAddress: p.sender.user.address,
        senderPhoneNumber: p.sender.user.phoneNumber,
        // nextPoint: p.nextPoint
      }
    })

    let receivedPackages = await PackageService.listRecForStaffCol()
    packagesReceivedData.value = receivedPackages.map((p : any) => {
      return {
        id: p.id,
        name: p.name,
        weight: p.weight,
        description: p.description,
        type: p.type,
        status: p.status,
        senderFirstName: p.sender.user.firstName,
        senderLastName: p.sender.user.lastName,
        senderAddress: p.sender.user.address,
        senderPhoneNumber: p.sender.user.phoneNumber,
        receiverFirstName: p.receiverFirstName,
        receiverLastName: p.receiverLastName,
        receiverAddress: p.receiverAddress,
        receiverPhoneNumber: p.receiverPhoneNumber,
        // nextPoint: p.nextPoint
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

async function handleConfirm(id: any, sentFrom: any) {
  console.log(id, sentFrom)
  if (sentFrom === 'Transaction Point')
    await PackageService.confirmPackageTC(id)
  else if (sentFrom === 'Collection Point')
    await PackageService.confirmPackageCC(id)
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
