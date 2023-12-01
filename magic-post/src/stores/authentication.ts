import { defineStore } from 'pinia'
import { checkAdmin, getUserInfo, logout } from '@/services/auth'

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
                this.user = resUser.data
                const responseRoles = await checkAdmin()
                const plans = responseRoles?.data?.data
                this.roles = Array.isArray(plans) ? plans : []
                // console.log('this.roles', this.roles)
            } catch (e: any) {
                if (e.response && e.response.status === 401) {
                    this.user = null
                }
            }
        },
        async logout() {
            await logout().then()
            this.user = null
        },
    },
})
