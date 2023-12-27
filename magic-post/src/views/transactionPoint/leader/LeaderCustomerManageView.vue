<template>
    <h1>Quản lý giao dịch viên</h1>
    <br />
  
        <CommonButton size="large" @click="refs.FORM_ADD.openModal()">
        >Thêm tài khoản
        </CommonButton>
  <!--    </el-col>-->
  <!--  </el-row>-->
    <AddCustomer
        :ref="toRef('FORM_ADD')"
        @close="
        () => {
          // fetchRecords()
          refs.FORM_ADD.closeModal()
        }
      "
    ></AddCustomer>
    <EditCustomer
        :id="idEdit"
        :ref="toRef('FORM_EDIT')"
        @close="
        () => {
          fetchRecords()
          refs.FORM_EDIT.closeModal()
        }
      "
    ></EditCustomer>
    <el-table
        v-loading="fetching"
        empty-text="Không có dữ liệu"
        :data="data"
        border
        style="width: 100%"
        @sort-change="sortDocument"
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
          label="Họ và tên"
          header-align="center"
          align="left"
          sortable
      />

      <el-table-column
          prop="phone"
          min-width="180"
          label="SĐT"
          header-align="center"
          align="left"
          sortable
      />
        
      <el-table-column
          prop="address"
          label="Địa chỉ"
          width="140"
          header-align="center"
          align="center"
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
              @click="
              () => {
                refs.FORM_EDIT.openModal()
                idEdit = scope.row.id
              }
            "
              :ref="toRef('EDIT_BTN')"
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
    <div class="pagination-block">
      <el-pagination
          layout="prev, pager, next"
          :page-size="serverParams.size"
          :total="totalRecords"
          :current-page="serverParams.page"
          @current-change="changePage"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from 'vue'
  import CommonButton from '@/components/common/CommonButton.vue'
  import { processErrorMessage } from '@/helper/responseErrorHandle'
  import type { FormRules } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import { PropertyEntityFullFilter } from '@/common/models'
  import useRefs from '@/common/useRefs'
  import { useCommonRepository } from '@/services/commonRepository'
  import AddCustomer from './AddCustomer.vue'
  import EditCustomer from "./EditCustomer.vue";
  import {UserService} from "@/services/user";
  const idEdit = ref(null as unknown as number)
  
  const rules = reactive<FormRules>({})
  const form = ref({
    id: '',
    name: '',
    plan: '0',
    organization: '0',
    emailConfirmed: null,
  })
  
  const { refs, toRef } = useRefs<{
    DELETE_BTN: InstanceType<typeof CommonButton>
    EDIT_BTN: InstanceType<typeof CommonButton>
    RELOAD_BTN: InstanceType<typeof CommonButton>
    FORM_FILTER: InstanceType<any>
    FORM_ADD: InstanceType<typeof AddCustomer>
    FORM_EDIT: InstanceType<typeof EditCustomer>
  }>()
  
  const {
    records,
    totalRecords,
    filter,
    fetching,
    fetchRecords,
    resetFilter,
    sortDocument,
    serverParams,
    changePage,
  } = useCommonRepository(UserService.listForAdmin, PropertyEntityFullFilter)
  
  // create for me about 5 example to table has data
  const data = [
    {
      id: 1,
      name: 'John doe',
      phone: '0123-456-789',
      address: '123 Main St',
      
    },
    {
      id: 2,
      name: 'Jane Doe',
      address: '456 Elm St',
    },
    {
      id: 3,
      name: 'Bob Smith',
      address: '789 Pine St',
    },
    {
      id: 4,
      name: 'Alice Johnson',
      address: '1012 Oak St',
    },
    {
      id: 5,
      name: 'Charlie Brown',
      address: '1234 Maple St',
    },
  ];
  
  async function handleDelete(id: number) {
    refs.DELETE_BTN?.setLoading(true)
    try {
      await UserService.delete(id)
      await fetchRecords()
      ElMessage.success('Xóa người dùng thành công!')
    } catch (e) {
      processErrorMessage(
          e,
          'Có lỗi đã xảy ra trong quá trình xóa người dùng. ' +
          'Vui lòng thử lại sau!'
      )
    } finally {
      refs.DELETE_BTN?.setLoading(false)
      await fetchRecords()
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
  