import http from "@/services/http";
import {AdminApi, CustomerApi, HeadCollectionApi, HeadTransactionApi} from "@/constants/API";

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
    getInfo: async (id: string) => {
        const res = await http.get(CustomerApi.CUSTOMER_GET_PACKAGE_INFO + '/' + id, {})
        console.log(res.data)
        return res.data
    },
}