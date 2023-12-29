<template>
  <el-dialog>
  <div class="receipt-container">
    <header class="receipt-header">
      <img src="@/assets/images/logo.svg" alt="Company Logo" class="logo">
<!--      <img alt="QR Code" class="qr-code">-->
    </header>

    <section class="info-section">
      <div class="sender-info">
        <h2>Sender Information</h2>
        <p>Name: 3</p>
        <p>Address: 4</p>
        <p>Phone Number: 6</p>
        <p>Package ID: 7</p>
      </div>

      <div class="receiver-info">
        <h2>Receiver Information</h2>
        <p>Name: 7</p>
        <p>Address: 7</p>
        <p>Phone Number: 8</p>
      </div>
    </section>

    <section class="package-section">
      <h2>Package Type</h2>
      <label><input type="checkbox" name="packageType" value="Type1">Tài liệu</label>

      <label><input type="checkbox" name="packageType" value="Type2">Hàng hóa</label>
    </section>

    <table class="amount-table">
      <tr>
        <th>Thông tin đơn hàng</th>
        <th>Giá trị</th>
      </tr>
      <tr>
        <td>Description</td>
        <td>9</td>
      </tr>
      <tr>
        <td>Weight</td>
        <td>9</td>
      </tr>
    </table>

    <br><br><br>
    <h3>Cam kết của người gửi</h3>
    <p>Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và cam đoan bưu gửi này không chứa những mặt hàng nguy hiểm, cấm gửi. Trường hợp không phát được hãy thực hiện chỉ dẫn tại mục 6, tôi sẽ trả cước chuyển hoàn.</p>

    <br>
    Ngày giờ gửi:9
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
  <div class="download-button">
<!--    <button @click="downloadPdf">Download</button>-->
<!--    <button @click="generatePdf">Generate PDF</button>-->
  </div>
  </el-dialog>
</template>

<script setup lang="ts">

import {defineProps, ref, onMounted, watchEffect} from 'vue'

const props = defineProps({
  modelValue: Boolean,
  packageData: {
    type: Object,
    default: () => {
      return {
        senderName: '',
        senderAddress: '',
        senderPhoneNumber: '',
        receiverName: '',
        receiverAddress: '',
        receiverPhoneNumber: '',
        packageId: '',
        description: '',
        weight: '',
        time: ''
      }
    }
  }
});

</script>

<style scoped>
.receipt-container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding-bottom: 200px;
}

.receipt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo, .qr-code {
  width: 100px;
}

.info-section {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.sender-info, .receiver-info {
  width: 45%;
}

.package-section {
  margin-top: 20px;
}

.amount-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.amount-table th, .amount-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
</style>