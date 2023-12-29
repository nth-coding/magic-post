<template>
  <el-dialog>
    <template #header>
      <div class="dialog-header">Tạo đơn hàng đến tập kết</div>
    </template>

    <div class="left-container">
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
    </div>
    <div class="right-container">
      <div class="receipt">
        <div class="receipt-container">
          <header class="receipt-header">
            <img src="@/assets/images/logo.svg" alt="Company Logo" class="logo">
            <!--      <img alt="QR Code" class="qr-code">-->
          </header>

          <p>Name: {{ packageTemp.packageName }}</p>
          <p>HashKey: {{ packageTemp.aPackage.hashKey }}</p>
          <p>Created at: {{ packageTemp.aPackage.createdAt }}</p>

          <p>Shipper: {{ packageTemp.shipperName }}</p>
          <p>Transport: {{ packageTemp.transport }}</p>

          <section class="info-section">
            <div class="sender-info">
              <h2>Sender Information</h2>
              <p>Address: {{ packageTemp.sentPointAddress }}</p>
            </div>

            <div class="receiver-info">
              <h2>Receiver Information</h2>
              <p>Name: {{ packageTemp.receiverName }}</p>
              <p>Address: {{ packageTemp.receiverPointAddress }}</p>
            </div>
          </section>

          <br><br><br>
          <h3>Cam kết của người gửi</h3>
          <p>Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và cam đoan bưu gửi này không chứa những mặt hàng nguy
            hiểm, cấm gửi. Trường hợp không phát được hãy thực hiện chỉ dẫn tại mục 6, tôi sẽ trả cước chuyển
            hoàn.</p>

          <br>
          <br><br><br>
          <div style="display: flex; justify-content: space-between">
            <div style="width: 40%">
              <p>Người gửi</p>
              <p>(Ký, ghi rõ họ tên)</p>
            </div>
            <div style="width: 40%">
              <p>Người nhận</p>
              <p>(Ký, ghi rõ họ tên)</p>
            </div>
            <div>
              <p>Bưu cục</p>
              <p>(Ký, ghi rõ họ tên)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <CommonButton type="default">Hủy bỏ</CommonButton>
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
  { value: '1', label: 'Hà Nội' },
  { value: '2', label: 'HCM' },
]);

let { $refs, toRef } = useRefs();
const RefNames = {
  MAIN_FORM: 'MAIN_FORM',
  SUBMIT_BTN: 'SUBMIT_BTN',
};
let packageTemp = ref({
  aPackage: {
    hashKey: '',
    createdAt: '',
  },
  packageName: '',
  shipperName: '',
  transport: '',
  sentPointAddress: '',
  receiverName: '',
  receiverPointAddress: '',
})

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

async function submitForm() {
  $refs.get(RefNames.MAIN_FORM)?.validate(async (valid: boolean) => {
    if (valid) {
      $refs.get(RefNames.SUBMIT_BTN)?.setLoading(true);
      try {
          const collectionPointId = formTC.value.collectionPoint;
          packageTemp.value = await PackageService.addDeliveryReceiptTC(props.id, collectionPointId, {
            shipperName: formTC.value.shipperName,
            transport: formTC.value.transport,
          });
          ElMessage({
            message: 'Thêm đơn hàng thành công!',
            type: 'success',
            duration: 5000
          });
        // emit('close');
      } catch (e: any) {
        processErrorMessage(e);
      } finally {
        $refs.get(RefNames.SUBMIT_BTN)?.setLoading(false);
        packageTemp.value = {
          aPackage: {
            hashKey: '2a10HUH3Vi1N',
            createdAt: '2023-12-30 04:27:11.232000',
          },
          packageName: 'Mì tôm thanh long',
          shipperName: 'Hải',
          transport: 'Xe máy',
          sentPointAddress: 'Số 2',
          receiverName: 'Hiệp',
          receiverPointAddress: 'Quận 10',
        }
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