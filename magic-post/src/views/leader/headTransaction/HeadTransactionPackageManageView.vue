<template>
  <h1>Quản lý đơn hàng</h1>
  <br />

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
          min-width="90"
          label="Loại"
          header-align="center"
          align="left"
          sortable
      >
      <template #default="scope">
      <svg v-if="scope.row.type == 'Hàng dễ vỡ'" fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
	      viewBox="0 0 512 512" xml:space="preserve" >
		    <path d="M379.222,136.163L364.313,10.2C363.624,4.383,358.694,0,352.835,0h-50.464l-60.152,76.147l58.481,16.85
			c3.525,1.015,6.358,3.643,7.634,7.08c1.277,3.438,0.846,7.278-1.16,10.349l-33.182,50.766c-2.217,3.392-5.913,5.236-9.685,5.236
			c-2.168,0-4.361-0.609-6.312-1.884c-5.343-3.492-6.845-10.655-3.351-15.998l24.621-37.668l-59.982-17.284
			c-3.7-1.066-6.626-3.904-7.804-7.57c-1.179-3.666-0.453-7.678,1.935-10.699L272.914,0H159.164c-5.858,0-10.789,4.383-11.478,10.2
			l-14.909,125.964c-4.852,40.992,4.324,82.968,25.839,118.197c19.008,31.123,47.103,56.079,80.068,71.406
			c-0.003,0.144-0.022,0.285-0.022,0.43v133.11l-33.633,20.567c-6.625,4.051-9.749,12.014-7.643,19.489
			c2.104,7.474,8.923,12.639,16.687,12.639h83.851c7.766,0,14.584-5.164,16.687-12.639c2.105-7.474-1.018-15.437-7.643-19.489
			l-33.633-20.567v-133.11c0-0.146-0.018-0.285-0.022-0.43c32.965-15.328,61.06-40.283,80.068-71.406
			C374.898,219.132,384.075,177.154,379.222,136.163z"/>
      </svg>
      <svg v-if="scope.row.type == 'Hàng tiêu dùng'" fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	      viewBox="0 0 307.984 307.984" xml:space="preserve">
      <path d="M302.409,5.883c-1.652-0.815-3.46-1.132-5.228-0.989c0.021-0.014,0.04-0.029,0.061-0.043H103.917
	    c-2.13,0-4.204,0.68-5.92,1.941L4.254,75.66c0.008-0.003,0.016-0.004,0.023-0.006C1.693,77.462,0,80.455,0,83.847v209.287
	    c0,5.523,4.477,10,10,10h197.99c2.522,0,4.82-0.941,6.579-2.481c0.096-0.083,0.195-0.161,0.288-0.249l89.994-85
	    c2-1.889,3.133-4.519,3.133-7.27V14.851C307.984,11.044,305.823,7.567,302.409,5.883z M107.195,24.851h64.577l-59.68,48.997h-71.59
	    L107.195,24.851z M147.917,142.134h-72c-8.271,0-15-6.729-15-15s6.729-15,15-15h72c8.271,0,15,6.729,15,15
	    S156.188,142.134,147.917,142.134z M204.598,73.847h-62.536l59.681-48.997h66.763L204.598,73.847z"/>
      </svg>
      <svg v-if="scope.row.type == 'Giấy tờ'" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2L8.93417 2C8.04768 1.99995 7.28387 1.99991 6.67221 2.08215C6.01669 2.17028 5.38834 2.36902 4.87868 2.87868C4.36902 3.38835 4.17027 4.0167 4.08214 4.67221C3.9999 5.28387 3.99995 6.04769 4 6.93417L4 7V10.5V16.1707C2.83481 16.5825 2 17.6938 2 19C2 20.6569 3.34315 22 5 22H15.9966L16 22C17.6569 22 19 20.6569 19 19V9.00001V7.00001H19.5C20.8807 7.00001 22 5.88072 22 4.50001C22 3.11929 20.8807 2.00001 19.5 2.00001C19.3961 2.00001 19.2937 2.00634 19.1932 2.01865C19.1307 2.00641 19.0661 2 19 2H9ZM13.1707 20C13.0602 19.6872 13 19.3506 13 19V18H5C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20H13.1707ZM19 5.00001H19.5C19.7761 5.00001 20 4.77615 20 4.50001C20 4.22386 19.7761 4.00001 19.5 4.00001C19.2239 4.00001 19 4.22386 19 4.50001V5.00001ZM8 7C8 6.44772 8.44772 6 9 6H14C14.5523 6 15 6.44772 15 7C15 7.55228 14.5523 8 14 8H9C8.44772 8 8 7.55228 8 7ZM9 10C8.44772 10 8 10.4477 8 11C8 11.5523 8.44772 12 9 12H14C14.5523 12 15 11.5523 15 11C15 10.4477 14.5523 10 14 10H9Z" fill="#000000"/>
      </svg>
    </template>
      </el-table-column>

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
          {{ scope.row.receiverDistrict }} , {{ scope.row.Province }}
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
          min-width="90"
          label="Loại"
          header-align="center"
          align="left"
          sortable
      >
        <template #default="scope">
      <svg v-if="scope.row.type == 'Hàng dễ vỡ'" fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
	      viewBox="0 0 512 512" xml:space="preserve" >
		    <path d="M379.222,136.163L364.313,10.2C363.624,4.383,358.694,0,352.835,0h-50.464l-60.152,76.147l58.481,16.85
			c3.525,1.015,6.358,3.643,7.634,7.08c1.277,3.438,0.846,7.278-1.16,10.349l-33.182,50.766c-2.217,3.392-5.913,5.236-9.685,5.236
			c-2.168,0-4.361-0.609-6.312-1.884c-5.343-3.492-6.845-10.655-3.351-15.998l24.621-37.668l-59.982-17.284
			c-3.7-1.066-6.626-3.904-7.804-7.57c-1.179-3.666-0.453-7.678,1.935-10.699L272.914,0H159.164c-5.858,0-10.789,4.383-11.478,10.2
			l-14.909,125.964c-4.852,40.992,4.324,82.968,25.839,118.197c19.008,31.123,47.103,56.079,80.068,71.406
			c-0.003,0.144-0.022,0.285-0.022,0.43v133.11l-33.633,20.567c-6.625,4.051-9.749,12.014-7.643,19.489
			c2.104,7.474,8.923,12.639,16.687,12.639h83.851c7.766,0,14.584-5.164,16.687-12.639c2.105-7.474-1.018-15.437-7.643-19.489
			l-33.633-20.567v-133.11c0-0.146-0.018-0.285-0.022-0.43c32.965-15.328,61.06-40.283,80.068-71.406
			C374.898,219.132,384.075,177.154,379.222,136.163z"/>
      </svg>
      <svg v-if="scope.row.type == 'Hàng tiêu dùng'" fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	      viewBox="0 0 307.984 307.984" xml:space="preserve">
      <path d="M302.409,5.883c-1.652-0.815-3.46-1.132-5.228-0.989c0.021-0.014,0.04-0.029,0.061-0.043H103.917
	    c-2.13,0-4.204,0.68-5.92,1.941L4.254,75.66c0.008-0.003,0.016-0.004,0.023-0.006C1.693,77.462,0,80.455,0,83.847v209.287
	    c0,5.523,4.477,10,10,10h197.99c2.522,0,4.82-0.941,6.579-2.481c0.096-0.083,0.195-0.161,0.288-0.249l89.994-85
	    c2-1.889,3.133-4.519,3.133-7.27V14.851C307.984,11.044,305.823,7.567,302.409,5.883z M107.195,24.851h64.577l-59.68,48.997h-71.59
	    L107.195,24.851z M147.917,142.134h-72c-8.271,0-15-6.729-15-15s6.729-15,15-15h72c8.271,0,15,6.729,15,15
	    S156.188,142.134,147.917,142.134z M204.598,73.847h-62.536l59.681-48.997h66.763L204.598,73.847z"/>
      </svg>
      <svg v-if="scope.row.type == 'Giấy tờ'" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2L8.93417 2C8.04768 1.99995 7.28387 1.99991 6.67221 2.08215C6.01669 2.17028 5.38834 2.36902 4.87868 2.87868C4.36902 3.38835 4.17027 4.0167 4.08214 4.67221C3.9999 5.28387 3.99995 6.04769 4 6.93417L4 7V10.5V16.1707C2.83481 16.5825 2 17.6938 2 19C2 20.6569 3.34315 22 5 22H15.9966L16 22C17.6569 22 19 20.6569 19 19V9.00001V7.00001H19.5C20.8807 7.00001 22 5.88072 22 4.50001C22 3.11929 20.8807 2.00001 19.5 2.00001C19.3961 2.00001 19.2937 2.00634 19.1932 2.01865C19.1307 2.00641 19.0661 2 19 2H9ZM13.1707 20C13.0602 19.6872 13 19.3506 13 19V18H5C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20H13.1707ZM19 5.00001H19.5C19.7761 5.00001 20 4.77615 20 4.50001C20 4.22386 19.7761 4.00001 19.5 4.00001C19.2239 4.00001 19 4.22386 19 4.50001V5.00001ZM8 7C8 6.44772 8.44772 6 9 6H14C14.5523 6 15 6.44772 15 7C15 7.55228 14.5523 8 14 8H9C8.44772 8 8 7.55228 8 7ZM9 10C8.44772 10 8 10.4477 8 11C8 11.5523 8.44772 12 9 12H14C14.5523 12 15 11.5523 15 11C15 10.4477 14.5523 10 14 10H9Z" fill="#000000"/>
      </svg>
        </template>
      </el-table-column>

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
          min-width="90"
          label="Loại"
          header-align="center"
          align="left"
          sortable
      >
      <template #default="scope">
      <svg v-if="scope.row.type == 'Hàng dễ vỡ'" fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
	      viewBox="0 0 512 512" xml:space="preserve" >
		    <path d="M379.222,136.163L364.313,10.2C363.624,4.383,358.694,0,352.835,0h-50.464l-60.152,76.147l58.481,16.85
			c3.525,1.015,6.358,3.643,7.634,7.08c1.277,3.438,0.846,7.278-1.16,10.349l-33.182,50.766c-2.217,3.392-5.913,5.236-9.685,5.236
			c-2.168,0-4.361-0.609-6.312-1.884c-5.343-3.492-6.845-10.655-3.351-15.998l24.621-37.668l-59.982-17.284
			c-3.7-1.066-6.626-3.904-7.804-7.57c-1.179-3.666-0.453-7.678,1.935-10.699L272.914,0H159.164c-5.858,0-10.789,4.383-11.478,10.2
			l-14.909,125.964c-4.852,40.992,4.324,82.968,25.839,118.197c19.008,31.123,47.103,56.079,80.068,71.406
			c-0.003,0.144-0.022,0.285-0.022,0.43v133.11l-33.633,20.567c-6.625,4.051-9.749,12.014-7.643,19.489
			c2.104,7.474,8.923,12.639,16.687,12.639h83.851c7.766,0,14.584-5.164,16.687-12.639c2.105-7.474-1.018-15.437-7.643-19.489
			l-33.633-20.567v-133.11c0-0.146-0.018-0.285-0.022-0.43c32.965-15.328,61.06-40.283,80.068-71.406
			C374.898,219.132,384.075,177.154,379.222,136.163z"/>
      </svg>
      <svg v-if="scope.row.type == 'Hàng tiêu dùng'" fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	      viewBox="0 0 307.984 307.984" xml:space="preserve">
      <path d="M302.409,5.883c-1.652-0.815-3.46-1.132-5.228-0.989c0.021-0.014,0.04-0.029,0.061-0.043H103.917
	    c-2.13,0-4.204,0.68-5.92,1.941L4.254,75.66c0.008-0.003,0.016-0.004,0.023-0.006C1.693,77.462,0,80.455,0,83.847v209.287
	    c0,5.523,4.477,10,10,10h197.99c2.522,0,4.82-0.941,6.579-2.481c0.096-0.083,0.195-0.161,0.288-0.249l89.994-85
	    c2-1.889,3.133-4.519,3.133-7.27V14.851C307.984,11.044,305.823,7.567,302.409,5.883z M107.195,24.851h64.577l-59.68,48.997h-71.59
	    L107.195,24.851z M147.917,142.134h-72c-8.271,0-15-6.729-15-15s6.729-15,15-15h72c8.271,0,15,6.729,15,15
	    S156.188,142.134,147.917,142.134z M204.598,73.847h-62.536l59.681-48.997h66.763L204.598,73.847z"/>
      </svg>
      <svg v-if="scope.row.type == 'Giấy tờ'" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2L8.93417 2C8.04768 1.99995 7.28387 1.99991 6.67221 2.08215C6.01669 2.17028 5.38834 2.36902 4.87868 2.87868C4.36902 3.38835 4.17027 4.0167 4.08214 4.67221C3.9999 5.28387 3.99995 6.04769 4 6.93417L4 7V10.5V16.1707C2.83481 16.5825 2 17.6938 2 19C2 20.6569 3.34315 22 5 22H15.9966L16 22C17.6569 22 19 20.6569 19 19V9.00001V7.00001H19.5C20.8807 7.00001 22 5.88072 22 4.50001C22 3.11929 20.8807 2.00001 19.5 2.00001C19.3961 2.00001 19.2937 2.00634 19.1932 2.01865C19.1307 2.00641 19.0661 2 19 2H9ZM13.1707 20C13.0602 19.6872 13 19.3506 13 19V18H5C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20H13.1707ZM19 5.00001H19.5C19.7761 5.00001 20 4.77615 20 4.50001C20 4.22386 19.7761 4.00001 19.5 4.00001C19.2239 4.00001 19 4.22386 19 4.50001V5.00001ZM8 7C8 6.44772 8.44772 6 9 6H14C14.5523 6 15 6.44772 15 7C15 7.55228 14.5523 8 14 8H9C8.44772 8 8 7.55228 8 7ZM9 10C8.44772 10 8 10.4477 8 11C8 11.5523 8.44772 12 9 12H14C14.5523 12 15 11.5523 15 11C15 10.4477 14.5523 10 14 10H9Z" fill="#000000"/>
      </svg>
      </template>
      </el-table-column>

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

</template>

<script setup lang="ts">


// create for me about 5 example to table has data
import AddStaff from "@/views/leader/headCollection/AddStaff.vue";
import EditStaff from "@/views/leader/headCollection/EditStaff.vue";
import {onMounted, reactive, ref} from "vue";
import {ElMessage, type FormRules} from "element-plus";
import useRefs from "@/helper/useRef";
import {CollectionPoint, TransactionPoint} from "@/services/point";
import {processErrorMessage} from "@/helper/responseErrorHandle";
import {useRouter} from "vue-router";
import CommonButton from "@/components/common/CommonButton.vue";
import {PackageService} from "@/services/package";

const dialogAdd = ref(false)
const dialogEdit = ref(false)
const idEdit = ref(null as unknown as number)

const loading = ref(false)

const packagesSentData = ref<any[] | null>(null);
const packagesReceivedData = ref<any[] | null>(null);
const packagesCurrentData = ref<any[] | null>(null);

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

    let sentPackages = await PackageService.listSentForHeadTran()
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
        // nextPoint: p.nextPoint
      }
    })

    let currentPackages = await PackageService.listCurrForHeadTran()
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

    let receivedPackages = await PackageService.listRecForHeadTran()
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
svg{
  display: block;
  margin: auto;
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
