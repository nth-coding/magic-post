import http from "@/services/http";
import {AdminApi, CustomerApi, HeadCollectionApi, HeadTransactionApi, StaffApi} from "@/constants/API";

export const PackageService = {
    list: async () => {
        return (
            await http.get(AdminApi.PACKAGE_BOSS_MANAGE, {})
        ).data
    },
    listSentForHeadCol: async () => {
        return (
            await http.get(HeadCollectionApi.HEAD_COL_SENT_ORDER_MANAGE, {})
        ).data
    },
    listCurrForHeadCol: async () => {
        return (
            await http.get(HeadCollectionApi.HEAD_COL_CURRENT_ORDER_MANAGE, {})
        ).data

    },
    listRecForHeadCol: async () => {
        return (
            await http.get(HeadCollectionApi.HEAD_COL_RECEIVED_ORDER_MANAGE, {})
        ).data
    },
    listSentForHeadTran: async () => {
        return (
            await http.get(HeadTransactionApi.HEAD_TRAN_SENT_ORDER_MANAGE, {})
        ).data
    },
    listCurrForHeadTran: async () => {
        return (
            await http.get(HeadTransactionApi.HEAD_TRAN_CURRENT_ORDER_MANAGE, {})
        ).data

    },
    listRecForHeadTran: async () => {
        return (
            await http.get(HeadTransactionApi.HEAD_TRAN_RECEIVED_ORDER_MANAGE, {})
        ).data
    },
    listSentForStaffTran: async () => {
        return (
            await http.get(StaffApi.STAFF_TRAN_SENT_ORDER_MANAGE, {})
        ).data
    },
    listCurrForStaffTran: async () => {
        return (
            await http.get(StaffApi.STAFF_TRAN_CURRENT_ORDER_MANAGE, {})
        ).data

    },
    listRecForStaffTran: async () => {
        return (
            await http.get(StaffApi.STAFF_TRAN_RECEIVED_ORDER_MANAGE, {})
        ).data
    },
    listSentForStaffCol: async () => {
        return (
            await http.get(StaffApi.STAFF_COL_SENT_ORDER_MANAGE, {})
        ).data
    },
    listCurrForStaffCol: async () => {
        return (
            await http.get(StaffApi.STAFF_COL_CURRENT_ORDER_MANAGE, {})
        ).data

    },
    listRecForStaffCol: async () => {
        return (
            await http.get(StaffApi.STAFF_COL_RECEIVED_ORDER_MANAGE, {})
        ).data
    },
    listPendingForStaffCol: async () => {
        return (
            await http.get(StaffApi.STAFF_COL_PENDING_ORDER_MANAGE, {})
        ).data
    },
    listPendingForStaffTran: async () => {
        return (
            await http.get(StaffApi.STAFF_TRAN_PENDING_ORDER_MANAGE, {})
        ).data
    },
    getInfo: async (id: string) => {
        const res = await http.get(CustomerApi.CUSTOMER_GET_PACKAGE_INFO + '/' + id, {})
        console.log(res.data)
        return res.data
    },

    addDeliveryReceiptCC: async (packageId: any, receivePointId: any, payload: any) => {
        const res = await http.post(StaffApi.STAFF_COL_CREATE_CC_RECEIPT + '/' + packageId + '/' + receivePointId, payload)
        return res.data
    },
    addDeliveryReceiptCT: async (packageId: any, receivePointId: any, payload: any) => {
        const res = await http.post(StaffApi.STAFF_COL_CREATE_CT_RECEIPT + '/' + packageId + '/' + receivePointId, payload)
        return res.data
    },
    addDeliveryReceiptTC: async (packageId: any, receivePointId: any, payload: any) => {
        const res = await http.post(StaffApi.STAFF_TRAN_CREATE_TC_RECEIPT + '/' + receivePointId + packageId + '/', payload)
        return res.data
    },
    addPackageWithAccount: async (phoneNumber: any, payload: any) => {
        const res = await http.post(AdminApi.PACKAGE_BOSS_MANAGE + '/' + phoneNumber, payload)
        return res.data
    },
    addPackageWithoutAccount: async (payload: any) => {
        const res = await http.post(AdminApi.PACKAGE_BOSS_MANAGE, payload)
        return res.data
    },
    confirmPackageCC: async (packageId: any) => {
        const res = await http.put(StaffApi.STAFF_COL_CONFIRM_RECEIPT_CC + '/' + packageId)
        return res.data
    },
    confirmPackageTC: async (packageId: any) => {
        const res = await http.put(StaffApi.STAFF_COL_CONFIRM_RECEIPT_TC + '/' + packageId)
        return res.data
    },
}