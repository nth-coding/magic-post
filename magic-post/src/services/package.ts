import http from "@/services/http";
import {AdminApi} from "@/constants/API";

export const PackageService = {
    list: async () => {
        return (
            await http.get(AdminApi.PACKAGE_BOSS_MANAGE, {})
        ).data
    },
}