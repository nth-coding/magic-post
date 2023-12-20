import http from '@/services/http'
import { AuthAPI } from '@/constants/API'
import { ANONYMOUS_ALLOW_PATHS, Paths } from '@/router/paths'

export const getUserInfo = async () => {
    const response = await http.get(AuthAPI.GET_USER_INFO)
    return response.data
}
export const register = async (payload: any) => {
    return await http.post(AuthAPI.REGISTER, payload)
}
export const login = async (payload: any) => {
    return await http.post(AuthAPI.LOGIN_WITH_PASSWORD, payload)
}
export const forgotPassword = async (payload: { email: string }) => {
    return await http.post(AuthAPI.FORGOT_PASSWORD, payload)
}
export const resetPassword = async (payload: {
    password: string
    passwordRetype: string
    token: string
}) => {
    if (payload.password != payload.passwordRetype)
        throw new Error('Mật khẩu nhập lại không khớp!')
    return await http.post(AuthAPI.RESET_PASSWORD, payload)
}
export const resendConfirmRegistration = async (payload: { email: string }) => {
    return await http.get(AuthAPI.RESEND_REGISTRATION_EMAIL, {
        params: payload,
    })
}
export const confirmRegistration = async (
    token: string,
    success: any,
    error: any
) => {
    try {
        await http.get(AuthAPI.CONFIRM_REGISTRATION, {
            params: { token: token },
        })
        success()
    } catch (e) {
        error()
    }
}
export const checkTokenResetPassword = async (token: any) => {
    return await http.get(AuthAPI.CHECK_TOKEN_RESET_PASSWORD, {
        params: {
            check_token: token,
        },
    })
}
export const logout = async () => {
    await http.post(AuthAPI.LOGOUT, {})
    if (!ANONYMOUS_ALLOW_PATHS.includes(location.pathname)) {
        location.href = Paths.LOGIN + '?redirectUrl=' + location.href
    }
}

export const checkAdmin = async () => {
    return await http.get(AuthAPI.CHECK_ADMIN)
}
