import {defineStore} from 'pinia'
import {
    getBossInfo, getCustomerInfo,
    getHeadColInfo,
    getHeadTranInfo,
    getOfficerColInfo,
    getOfficerTranInfo,
    getUserInfo,
    logout
} from '@/services/auth'
import {roles} from "@/constants/Role";

export const useAuthenticationStore = defineStore({
    id: 'authentication',
    state: () => ({
        user: null,
        roles: [] as string[],
    }),
    getters: {
        authenticated: (state) => state.user != null,
        roleList: (state) => state.roles,
    },
    actions: {
        async loadFromServer() {
            try {
                const resUser = await getUserInfo()
                this.user = resUser

                for (const item of resUser.roles) {
                    this.roles.push(item.name)
                }

            } catch (e: any) {
                if (e.response && e.response.status === 401) {
                    this.user = null
                }
            }
        },
        async logout() {
            // await logout().then()
            this.user = null
        },
    },
})
