import http from "@/services/http";
import {AdminApi} from "@/constants/API";

export const HeadTransactionService = {
    listStaff: async () => {
        return (
            await http.get(AdminApi.HEAD_TRAN_USER_MANAGE, {})
        ).data
    },
    listSentPackage: async () => {
        return (
            await http.get(AdminApi.HEAD_TRAN_SENT_ORDER_MANAGE, {})
        ).data
    },
    listCurrentPackage: async () => {
        return (
            await http.get(AdminApi.HEAD_TRAN_CURRENT_ORDER_MANAGE, {})
        ).data
    },
    listReceivedPackage: async () => {
        return (
            await http.get(AdminApi.HEAD_TRAN_RECEIVED_ORDER_MANAGE, {})
        ).data
    },
}

export const HeadCollectionService = {
    listStaff: async () => {
        return (
            await http.get(AdminApi.HEAD_COL_USER_MANAGE, {})
        ).data
    },
    listSentPackage: async () => {
        return (
            await http.get(AdminApi.HEAD_COL_SENT_ORDER_MANAGE, {})
        ).data
    },
    listCurrentPackage: async () => {
        return (
            await http.get(AdminApi.HEAD_COL_CURRENT_ORDER_MANAGE, {})
        ).data
    },
    listReceivedPackage: async () => {
        return (
            await http.get(AdminApi.HEAD_COL_RECEIVED_ORDER_MANAGE, {})
        ).data
    },
}