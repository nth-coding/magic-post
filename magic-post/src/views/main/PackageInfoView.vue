<template>
  <el-dialog v-model="show">
    <template #header>
      <div class="dialog-header">ĐƠN HÀNG #{{ packageId }}</div>
    </template>

    <div class="package-info-container">
      <div class="package-info">
        <div class="package-info-item">
          <div class="package-info-item-label">Tên khách hàng</div>
          <div class="package-info-item-value">{{ packageInfoData.customerName }}</div>
        </div>
        <div class="package-info-item">
          <div class="package-info-item-label">Số điện thoại</div>
          <div class="package-info-item-value">{{ packageInfoData.customerPhone }}</div>
        </div>
        <div class="package-info-item">
          <div class="package-info-item-label">Địa chỉ</div>
          <div class="package-info-item-value">{{ packageInfoData.customerAddress }}</div>
        </div>
        <div class="package-info-item">
          <div class="package-info-item-label">Trạng thái</div>
          <div class="package-info-item-value">{{ packageInfoData.status }}</div>
        </div>
        <div class="package-info-item">
          <div class="package-info-item-label">Ngày tạo</div>
          <div class="package-info-item-value">{{ packageInfoData.createdAt }}</div>
        </div>
        <div class="package-info-item">
          <div class="package-info-item-label">Ngày cập nhật</div>
          <div class="package-info-item-value">{{ packageInfoData.updatedAt }}</div>
        </div>
        <div class="package-info-item">
          <div class="package-info-item-label">Người tạo</div>
          <div class="package-info-item-value">{{ packageInfoData.createdBy }}</div>
        </div>
        <div class="package-info-item">
          <div class="package-info-item-label">Người cập nhật</div>
          <div class="package-info-item-value">{{ packageInfoData.updatedBy }}</div>
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

const packageInfoData = {
  customerName: 'Nguyễn Văn A',
  customerPhone: '0123456789',
  customerAddress: 'Hà Nội',
  status: 'Đang giao hàng',
  createdAt: '2021-04-15',
  updatedAt: '2021-04-15',
  createdBy: 'Nguyễn Văn B',
  updatedBy: 'Nguyễn Văn C',

}

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
let packageInfo = ref({})
const show = ref(false)
const {$refs, toRef} = useRefs()
const RefNames = {
  MAIN_FORM: 'MAIN_FORM',
  SUBMIT_BTN: 'SUBMIT_BTN',
}

const emit = defineEmits(['close'])
const props = withDefaults(defineProps<{
  packageId: Object,
  model?: boolean,
}>(), {
  model: false,
})

watch(() => props.model, (value, oldValue) => {
  if (value && !oldValue) {
    $refs.get(RefNames.MAIN_FORM)?.resetFields()
  }
})

onMounted(() => {

})

async function getPackageInfo() {
  packageInfo = await PackageService.getPackageInfo(props.packageId)
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