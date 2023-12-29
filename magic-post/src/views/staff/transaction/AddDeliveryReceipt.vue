<template>
  <el-dialog>
    <template #header>
      <div class="dialog-header">Tạo đơn hàng đến tập kết</div>
    </template>

    <el-form
             label-position="left"
             label-width="150px"
             :model="formTC"
             :ref="toRef('MAIN_FORM')"
             style="max-width: 650px">
      <el-form-item label="Shipper name" prop="shipperName">
        <el-input v-model="formTC.shipperName" placeholder="ShipperName name..." />
      </el-form-item>

      <el-form-item label="Transport" prop="transport">
        <el-input v-model="formTC.transport" placeholder="Transport..." />
      </el-form-item>

      <el-form-item label="Collection" prop="collection">
        <el-select v-model="formTC.collectionPoint" placeholder="Chọn điểm tập kết...">
          <el-option
              v-for="item in collectionList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <CommonButton @click="resetForm" type="default">Hủy bỏ</CommonButton>
      <CommonButton
          type="primary"
          @click="submitForm()"
          :ref="toRef('SUBMIT_BTN')"
      >Lưu lại
      </CommonButton>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElMessage } from "element-plus";
import useRefs from "@/helper/useRef";
import { StaffService } from "@/services/user";
import { PackageService } from "@/services/package";
import { processErrorMessage } from "@/helper/responseErrorHandle";
import CommonButton from "@/components/common/CommonButton.vue";

const selectedForm = ref('CT');
const formTC = ref({
  shipperName: '',
  transport: '',
  collectionPoint: '',
});
const collectionList = ref([
  { value: '1', label: 'Điểm tập kết 1' },
  { value: '2', label: 'Điểm tập kết 2' },
  { value: '3', label: 'Điểm tập kết 3' },
  { value: '4', label: 'Điểm tập kết 4' },
]);

let { $refs, toRef } = useRefs();
const RefNames = {
  MAIN_FORM: 'MAIN_FORM',
  SUBMIT_BTN: 'SUBMIT_BTN',
};

const props = withDefaults(defineProps<{
  show?: boolean,
  id: number
}>(), {
  show: false,
});

watch(() => props.show, (value, oldValue) => {
  if (value && !oldValue) {
    $refs.get(RefNames.MAIN_FORM)?.resetFields();
  }
});

const emit = defineEmits(['close']);

function submitForm() {
  $refs.get(RefNames.MAIN_FORM)?.validate(async (valid: boolean) => {
    if (valid) {
      $refs.get(RefNames.SUBMIT_BTN)?.setLoading(true);
      try {
          const collectionPointId = formTC.value.collectionPoint;
          await PackageService.addDeliveryReceiptTC(props.id, collectionPointId, {
            shipperName: formTC.value.shipperName,
            transport: formTC.value.transport,
          });
          ElMessage({
            message: 'Thêm đơn hàng thành công!',
            type: 'success',
            duration: 5000
          });
        emit('close');
      } catch (e: any) {
        processErrorMessage(e);
      } finally {
        $refs.get(RefNames.SUBMIT_BTN)?.setLoading(false);
      }
    } else {
      return false;
    }
  });
}
</script>

<style scoped>
.radio-group-container {
  display: flex;
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>