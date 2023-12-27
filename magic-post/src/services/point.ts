import http from "@/services/http";
import {AdminApi} from "@/constants/API";

export const TransactionPoint = {
    list: async () => {
        return (
            await http.get(AdminApi.TRANSACTION_POINT_MANAGE, {})
        ).data
    },
}

export const CollectionPoint = {
    list: async () => {
        return (
            await http.get(AdminApi.COLLECTION_POINT_MANAGE, {})
        ).data
    },
}