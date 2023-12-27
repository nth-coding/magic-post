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
          label="Tên và email"
          header-align="center"
          align="left"
          sortable
      >
        <template #default="scope">
          <strong>{{ scope.row.firstName + scope.row.lastName }}</strong>
          <br />
          {{ scope.row.username }}
          <br />
        </template>
      </el-table-column>
      <el-table-column
          prop="address"
          label="Địa chỉ"
          width="140"
          header-align="center"
          align="center"
      />
      <el-table-column
          align="center"
          header-align="center"
          label="SDT"
          prop="phoneNumber"
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
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from 'vue'
  import CommonButton from '@/components/common/CommonButton.vue'
  import { processErrorMessage } from '@/helper/responseErrorHandle'
  import type { FormRules } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import CommonTag from '@/components/common/CommonTag.vue'
  import FAIcon from '@/components/common/FAIcon.vue'
  import { PropertyEntityFullFilter } from '@/common/models'
  import useRefs from '@/common/useRefs'
  import { useCommonRepository } from '@/services/commonRepository'
  import AddCustomer from "@/views/admin/customer/AddCustomer.vue";
  import EditCustomer from "@/views/admin/customer/EditCustomer.vue";
  import {UserService} from "@/services/user";
  const idEdit = ref(null as unknown as number)
  
  const rules = reactive<FormRules>({})
  const form = ref({
    id: '',
    email: '',
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
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe@example.com',
      address: '123 Main St',
      phoneNumber: '123-456-7890',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'janedoe@example.com',
      address: '456 Elm St',
      phoneNumber: '234-567-8901',
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Smith',
      username: 'bobsmith@example.com',
      address: '789 Pine St',
      phoneNumber: '345-678-9012',
    },
    {
      id: 4,
      firstName: 'Alice',
      lastName: 'Johnson',
      username: 'alicejohnson@example.com',
      address: '1012 Oak St',
      phoneNumber: '456-789-0123',
    },
    {
      id: 5,
      firstName: 'Charlie',
      lastName: 'Brown',
      username: 'charliebrown@example.com',
      address: '1234 Maple St',
      phoneNumber: '567-890-1234',
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
  