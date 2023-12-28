<template>
  <el-dialog v-model="show">
    <template #header>
      <div class="dialog-header">Đơn hàng #{{ props.packageId }}</div>
    </template>
    <div class="package-info-container">
      <div class="left-column">
        <h3 class="h3-container">Sender Information</h3>
        <el-form
            :model="packageInfo"
            label-width="120px"
            class="form-container"
            :ref="toRef('MAIN_FORM')">
          <el-form-item label="Name">
            <el-input v-model="packageInfo.senderName" disabled></el-input>
          </el-form-item>
          <el-form-item label="Phone Number">
            <el-input v-model="packageInfo.senderPhoneNumber" disabled></el-input>
          </el-form-item>
          <el-form-item label="Address">
            <el-input v-model="packageInfo.senderAddress" disabled></el-input>
          </el-form-item>
        </el-form>

        <h3 class="h3-container margin-top-container">Receiver Information</h3>
        <el-form
            :model="packageInfo"
            label-width="120px"
            class="form-container"
            :ref="toRef('MAIN_FORM')">
          <el-form-item label="Name">
            <el-input v-model="packageInfo.receiverName" disabled></el-input>
          </el-form-item>
          <el-form-item label="Province">
            <el-input v-model="packageInfo.receiverProvince" disabled></el-input>
          </el-form-item>
          <el-form-item label="District">
            <el-input v-model="packageInfo.receiverDistrict" disabled></el-input>
          </el-form-item>
          <el-form-item label="Phone Number">
            <el-input v-model="packageInfo.receiverPhoneNumber" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-column">
        <el-form
            :model="packageInfo"
            label-width="120px"
            class="form-container"
            :ref="toRef('MAIN_FORM')">
          <el-form-item label="Package ID" prop="packageId" class="form-item">
            <el-input v-model="packageInfo.packageId" class="form-input" disabled></el-input>
          </el-form-item>
          <el-form-item label="Weight" prop="weight">
            <el-input v-model="packageInfo.weight" disabled></el-input>
          </el-form-item>
          <el-form-item label="Name">
            <el-input v-model="packageInfo.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="packageInfo.description" disabled></el-input>
          </el-form-item>
          <el-form-item label="Type">
            <el-input v-model="packageInfo.type" disabled></el-input>
          </el-form-item>
        </el-form>

        <div class="time-line">
          <el-timeline>
            <el-timeline-item
                :timestamp="packageInfo.timeArriveFirstPoint"
                :color="getStatusColor(packageInfo.firstTranPointStatus)"
            >
              <el-input v-model="packageInfo.firstTranPoint" disabled></el-input>
            </el-timeline-item>
            <el-timeline-item
                :timestamp="packageInfo.timeArriveFirstColPoint"
                :color="getStatusColor(packageInfo.firstColPointStatus)"
            >
              <el-input v-model="packageInfo.firstColPoint" disabled></el-input>
            </el-timeline-item>
            <el-timeline-item
                :timestamp="packageInfo.timeArriveSecondColPoint"
                :color="getStatusColor(packageInfo.secondColPointStatus)"
            >
              <el-input v-model="packageInfo.secondColPoint" disabled></el-input>
            </el-timeline-item>
            <el-timeline-item
                :timestamp="packageInfo.timeArriveSecondTranPoint"
                :color="getStatusColor(packageInfo.secondTranPointStatus)"
            >
              <el-input v-model="packageInfo.secondTranPoint" disabled></el-input>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </el-dialog>

</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import useRefs from "@/helper/useRef";
import {PackageService} from "@/services/package";

let packageInfo = ref({
  packageId: '',
  weight: 0.0,
  name: '',
  description: '',
  type: '',

  senderName: '',
  senderPhoneNumber: '',
  senderAddress: '',

  receiverName: '',
  receiverProvince: '',
  receiverDistrict: '',
  receiverPhoneNumber: '',

  hashKey: '',
  pointHistory: null,
  currentPoint: '',
  status: '',

  firstTranPoint: '',
  firstTranPointStatus: '',
  timeArriveFirstPoint: '',

  secondTranPoint: '',
  secondTranPointStatus: '',
  timeArriveSecondTranPoint: '',

  firstColPoint: '',
  firstColPointStatus: '',
  timeArriveFirstColPoint: '',

  secondColPoint: '',
  secondColPointStatus: '',
  timeArriveSecondColPoint: '',
})
const activities = [
  {
    content: '',
    timestamp: '',
  },
  {
    content: 'Approved',
    timestamp: '2018-04-13',
  },
  {
    content: 'Success',
    timestamp: '2018-04-11',
  },
]
const show = ref(false)
const {$refs, toRef} = useRefs()
const RefNames = {
  MAIN_FORM: 'MAIN_FORM',
  SUBMIT_BTN: 'SUBMIT_BTN',
}

const emit = defineEmits(['close'])
const props = withDefaults(defineProps<{
  packageId: any,
  model?: boolean,
}>(), {
  model: false,
})

watch(() => props.model, (value, oldValue) => {
  if (value && !oldValue) {
    $refs.get(RefNames.MAIN_FORM)?.resetFields()
  }
})

watch(() => props.packageId, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    await getPackageInfo();
  }
});

function getStatusColor(status: string) {
  if (status === 'TRANSFERED') {
    return 'green'
  } else {
    return 'gray'
  }
}

async function getPackageInfo() {
  try {
    const packageInfoData = await PackageService.getInfo(props.packageId)
    packageInfo.value = {
      packageId: packageInfoData.packageId,
      weight: packageInfoData.weight,
      name: packageInfoData.name,
      description: packageInfoData.description,
      type: packageInfoData.type,

      senderName: packageInfoData.userDto.firstName + ' ' + packageInfoData.userDto.firstName,
      senderPhoneNumber: packageInfoData.userDto.phoneNumber,
      senderAddress: packageInfoData.userDto.address,

      receiverName: packageInfoData.receiverFirstName + ' ' + packageInfoData.receiverLastName,
      receiverProvince: packageInfoData.receiverProvince,
      receiverDistrict: packageInfoData.receiverDistrict,
      receiverPhoneNumber: packageInfoData.receiverPhoneNumber,

      hashKey: packageInfoData.hashKey,
      pointHistory: packageInfoData.pointHistory,
      currentPoint: packageInfoData.currentPoint,
      status: packageInfoData.status,

      firstTranPoint: packageInfoData.firstTranPoint.name,
      firstTranPointStatus: packageInfoData.firstTranPointStatus,
      timeArriveFirstPoint: packageInfoData.timeArriveFirstPoint,

      secondTranPoint: packageInfoData.secondTranPoint.name,
      secondTranPointStatus: packageInfoData.secondTranPointStatus,
      timeArriveSecondTranPoint: packageInfoData.timeArriveSecondTranPoint,

      firstColPoint: packageInfoData.firstColPoint.name,
      firstColPointStatus: packageInfoData.firstColPointStatus,
      timeArriveFirstColPoint: packageInfoData.timeArriveFirstColPoint,

      secondColPoint: packageInfoData.secondColPoint.name,
      secondColPointStatus: packageInfoData.secondColPointStatus,
      timeArriveSecondColPoint: packageInfoData.timeArriveSecondColPoint,
    }
  } catch (error) {
    console.error('Error fetching package info:', error)
  }
}

function openModal() {
  show.value = true
}

function closeModal() {
  show.value = false
}

function resetForm() {
  show.value = false
  emit('close')
}

defineExpose({
  openModal,
  closeModal,
})
</script>

<style scoped>
h3 {
  font-size: 15px;
  font-weight: bold;
  color: #333333;
}

.dialog-header {
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  text-align: center;
  padding: 20px;
}

.package-info-container {
  display: flex;
  justify-content: space-between;
  column-gap: 50px;
  padding: 20px;
}

.package-info {
  flex: 1;
  margin-right: 10px;
}

.time-line {
  flex: 1;
  margin-left: 50px;
  margin-top: 70px;
}

.h3-container {
  margin-bottom: 20px;
}

.margin-top-container {
  margin-top: 80px;
}
</style>