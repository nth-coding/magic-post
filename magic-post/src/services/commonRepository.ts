import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { CommonConfig } from '@/common/constants'
import { useRouter } from 'vue-router'
import type { CommonFilter, FilterOperation, SortOption } from '@/common/models'
import { DEFAULT_SORT_OPTION } from '@/common/models'
import { toQueryParam, toSearchParam } from '@/common/utils'

class CommonRepositoryCustom<T extends CommonFilter> {
  postSuccessFetch?: any | null = null
  dtoConvert?: any | null = null
  autoRefresh?: boolean = false
  disableInitFetch?: boolean = false
  initFilter?: T | null = null
}

export const useCommonRepository = <T extends CommonFilter>(
  fetchApi: any,
  filterOperator: FilterOperation<T>,
  custom: CommonRepositoryCustom<T> = new CommonRepositoryCustom<T>()
) => {
  const router = useRouter()
  const records = ref<any[]>([])
  const fetching = ref(false)
  const totalRecords = ref(0)
  const reloadInterval = ref<any>(null)
  const filter = ref<T>((custom && custom.initFilter) || <T>{}) as Ref<T>
  const sort = ref<SortOption>(DEFAULT_SORT_OPTION)
  const serverParams = ref({
    sortAscending: false,
    sortField: 'updateTime',
    page: 1,
    size: 10,
    searchKey: '',
  })

  const onChangeFilter = () => {
    onParamsChange({ searchKey: toSearchParam(filter.value, filterOperator) })
  }

  const fetchRecords = async () => {
    if (fetching.value) return
    fetching.value = true
    try {
      const response = await fetchApi({
        ...serverParams.value,
        page: serverParams.value.page - 1,
      })
      // console.log(response)
      if (custom && custom.dtoConvert) {
        records.value = response.data.map(custom.dtoConvert)
      } else {
        records.value = response.data
      }

      // console.log(response)
      if (response.meta && response.meta.total) {
        totalRecords.value = Number.parseInt(response.meta.total)
      }

      if (custom && custom.postSuccessFetch) custom.postSuccessFetch()
    } finally {
      fetching.value = false
    }
  }

  const resetFilter = () => {
    // TODO: reset here
    // console.log("FFFF", filter.value)
    filter.value = {} as T
    onChangeFilter()
  }

  const onParamsChange = async (params: any) => {
    serverParams.value = { ...serverParams.value, ...params }
    await router.push({
      path: router.currentRoute.value.path,
      query: toQueryParam(serverParams.value),
    })
  }

  const changePage = (page: number) => {
    onParamsChange({ page })
  }

  const sortDocument = (column: any) => {
    onParamsChange({
      sortField: column.prop || 'id',
      sortAscending: column.order ? column.order === 'ascending' : false,
    })
  }

  const onChangeSort = () => {
    onParamsChange({
      sortField: sort.value.sortField,
      sortAscending: sort.value.sortAscending,
    })
  }

  onMounted(async () => {
    if (!custom || !custom.disableInitFetch) {
      await fetchRecords()
    }
    if (custom && custom.autoRefresh) {
      reloadInterval.value = setInterval(() => {
        fetchRecords()
      }, CommonConfig.INTERVAL_RELOAD_DATA)
    }
  })
  watch(serverParams, fetchRecords, { deep: true })
  watch(() => JSON.stringify(filter.value), onChangeFilter, { deep: true })
  watch(sort, onChangeSort, { deep: true })
  onBeforeUnmount(() => {
    if (reloadInterval.value) {
      clearInterval(reloadInterval.value)
    }
  })

  return {
    records,
    totalRecords,
    serverParams,
    fetching,
    fetchRecords,
    filter,
    onChangeFilter,
    resetFilter,
    onParamsChange,
    sortDocument,
    changePage,
    sort,
    onChangeSort,
  }
}
