<template>
  <el-dialog v-model="show">
    <template #header>
      <div class="dialog-header">ĐƠN HÀNG #{{ packageId }}</div>
    </template>

    <div class="package-info-container">
      <div class="package-info">
        <div class="sender-info">
          <div class="package-info-item">
            <div class="package-info-item-label">Tên khách hàng</div>
            <div class="package-info-item-value">{{ packageInfo.senderFirstName + " " + packageInfo.senderLastName }}</div>
          </div>
          <div class="package-info-item">
            <div class="package-info-item-label">Số điện thoại</div>
            <div class="package-info-item-value">{{ packageInfo.senderPhoneNumber }}</div>
          </div>
<!--          <div class="package-info-item">-->
<!--            <div class="package-info-item-label">Địa chỉ</div>-->
<!--            <div class="package-info-item-value">{{ packageInfo.customerAddress }}</div>-->
<!--          </div>-->
        </div>
        <div class="receiver-info">
          <div class="package-info-item">
            <div class="package-info-item-label">Tên người nhận</div>
            <div class="package-info-item-value">{{ packageInfo.receiverFirstName + " " + packageInfo.receiverLastName }}</div>
          </div>
          <div class="package-info-item">
            <div class="package-info-item-label">Số điện thoại</div>
            <div class="package-info-item-value">{{ packageInfo.receiverPhoneNumber }}</div>
          </div>
          <div class="package-info-item">
            <div class="package-info-item-label">Địa chỉ</div>
            <div class="package-info-item-value">{{ packageInfo.receiverDistrict + ", " + packageInfo.receiverProvince }}</div>
          </div>
        </div>

        <div class="package-info-item">
          <div class="package-info-item-label">Mã đơn hàng</div>
          <div class="package-info-item-value">{{ packageInfo.hashKey }}</div>
        </div>
        <div class="package-info-item">
          <div class="package-info-item-label">Tên hàng</div>
          <div class="package-info-item-value">{{ packageInfo.name }}</div>
        </div>
        <div class="package-info-item">
          <div class="package-info-item-label">Mô tả</div>
          <div class="package-info-item-value">{{ packageInfo.description }}</div>
        </div>
        <div class="package-info-item">
          <div class="package-info-item-label">Loại hàng hóa</div>
          <div class="package-info-item-value">{{ packageInfo.type }}</div>
        </div>
        <div class="package-info-item">
          <div class="package-info-item-label">Tình trạng</div>
          <div class="package-info-item-value">{{ packageInfo.status }}</div>
        </div>
      </div>
      <div class="time-line">
        <el-timeline>
          <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref, toRefs, watch} from 'vue';
import useRefs from "@/helper/useRef";
import {PackageService} from "@/services/package";
import { MoreFilled } from '@element-plus/icons-vue'

const activities = [
  {
    content: 'Event start',
    timestamp: '2018-04-15',
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
let packageInfo = ref({
  packageId: '',
  weight: 0.0,
  name: '',
  description: '',
  type: '',

  senderFirstName: '',
  senderLastName: '',
  senderPhoneNumber: '',

  receiverFirstName: '',
  receiverLastName: '',
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
const show = ref(false)
const {$refs, toRef} = useRefs()
const RefNames = {
  MAIN_FORM: 'MAIN_FORM',
  SUBMIT_BTN: 'SUBMIT_BTN',
}

const emit = defineEmits(['close'])
const props = withDefaults(defineProps<{
  packageId: string,
  model?: boolean,
}>(), {
  model: false,
})

watch(() => props.model, (value, oldValue) => {
  if (value && !oldValue) {
    $refs.get(RefNames.MAIN_FORM)?.resetFields()
  }
})

onMounted(async () => {
  await getPackageInfo()
})

async function getPackageInfo() {
  const packageInfolist = await PackageService.getInfo(props.packageId)
  packageInfo = packageInfolist.map((item: any) => {
    return {
      packageId: item.packageId,
      weight: item.weight,
      name: item.name,
      description: item.description,
      type: item.type,

      receiverFirstName: item.receiverFirstName,
      receiverLastName: item.receiverLastName,
      receiverProvince: item.receiverProvince,
      receiverDistrict: item.receiverDistrict,
      receiverPhoneNumber: item.receiverPhoneNumber,

      hashKey: item.hashKey,
      pointHistory: item.pointHistoryDtoList,
      currentPoint: item.currentPoint,
      status: item.status,

      firstTranPoint: item.firstTranPoint,
      firstTranPointStatus: item.firstTranPointStatus,
      timeArriveFirstPoint: item.timeArriveFirstPoint,

      secondTranPoint: item.secondTranPoint,
      secondTranPointStatus: item.secondTranPointStatus,
      timeArriveSecondTranPoint: item.timeArriveSecondTranPoint,

      firstColPoint: item.firstColPoint,
      firstColPointStatus: item.firstColPointStatus,
      timeArriveFirstColPoint: item.timeArriveFirstColPoint,

      secondColPoint: item.secondColPoint,
      secondColPointStatus: item.secondColPointStatus,
      timeArriveSecondColPoint: item.timeArriveSecondColPoint,
    }
  })
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
  padding: 20px;
}

.package-info {
  flex: 1;
  margin-right: 10px;
}

.time-line {
  flex: 1;
  margin-left: 10px;
}

.package-info-item {
  margin-bottom: 10px;
}

.package-info-item-label {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}

.package-info-item-value {
  font-size: 14px;
  color: #666666;
}
</style>