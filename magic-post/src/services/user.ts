import http from '@/services/http'
import {AdminApi, AuthAPI, HeadCollectionApi, HeadTransactionApi} from '@/constants/API'


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
    },
    changePassword: async (payload: any) => {
        return await http.post(AuthAPI.CHANGE_PASSWORD, payload)
    }
}

export const StaffService = {
    addForHeadCol: async (payload: any) => {
        return await http.post(HeadCollectionApi.HEAD_COL_ADD_STAFF, payload)
    },
    addForHeadTran: async (payload: any) => {
        return await http.post(HeadTransactionApi.HEAD_TRAN_ADD_STAFF, payload)
    },
    listForBoss: async () => {
        return (
            await http.get(AdminApi.STAFF_BOSS_MANAGE, {})
        ).data
    },
    listForHeadCol: async () => {
        return (
            await http.get(HeadCollectionApi.HEAD_COL_USER_MANAGE, {})
        ).data
    },
    listForHeadTran: async () => {
        return (
            await http.get(HeadTransactionApi.HEAD_TRAN_USER_MANAGE, {})
        ).data
    },
    getOneForHeadTran: async (id: any) => {
        return (
            await http.get(HeadTransactionApi.HEAD_TRAN_USER_MANAGE + '/' + id)
        ).data
    },
    editForHeadTran: async (id: any, payload: any) => {
        return (
            await http.put(HeadTransactionApi.HEAD_TRAN_USER_MANAGE + '/' + id, payload)
        ).data
    },
    deleteForHeadTran: async (id: any) => {
        return (
            await http.delete(HeadTransactionApi.HEAD_TRAN_USER_MANAGE + '/' + id)
        ).data
    },

    deleteForHeadCol: async (id: any) => {
        return (
            await http.delete(HeadCollectionApi.HEAD_COL_USER_MANAGE + '/' + id)
        ).data
    },
    getOneForHeadCol: async (id: any) => {
        return (
            await http.get(HeadCollectionApi.HEAD_COL_USER_MANAGE + '/' +id)
        ).data
    },
    editForHeadCol: async (id: any, payload: any) => {
        return (
            await http.put(HeadCollectionApi.HEAD_COL_USER_MANAGE + '/' + id, payload)
        ).data
    },
}
