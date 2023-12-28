import http from '@/services/http'
import { AdminApi, AuthAPI } from '@/constants/API'

export const UserService = {
    listForAdmin: async (params: any) => {
        const bodyData = (
            await http.get(AdminApi.USER_MANAGE, {
                params,
            })
        ).data
        return {
            meta: bodyData.meta,
            data: bodyData.data,
        }
    },
    add: async (payload: any) => {
        return await http.post(AdminApi.USER_MANAGE, payload)
    },
    edit: async (id: any, payload: any) => {
        return await http.put(AdminApi.USER_MANAGE + '/' + id, payload)
    },
    delete: async (id: any) => {
        return await http.delete(AdminApi.USER_MANAGE + '/' + id)
    },
    getOne: async (id: any) => {
        return await http.get(AdminApi.USER_MANAGE + '/' + id)
    },
    editProfile: async (payload: any) => {
        return await http.post(AuthAPI.EDIT_PROFILE, payload)
    }
}

export const StaffService = {
    listForHeadCol: async () => {
        return (
            await http.get(AdminApi.HEAD_COL_USER_MANAGE, {})
        ).data
    },
    listForHeadTran: async () => {
        return (
            await http.get(AdminApi.HEAD_TRAN_USER_MANAGE, {})
        ).data
    },
}
