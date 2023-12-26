export const Paths = {
    HOME: '/',
    MAIN: '/main',
    LOGIN: '/signin',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    LOGIN_COMPLETE: '/login-complete',
    REGISTER_SUCCESS: '/register-success',
    REGISTRATION_RESEND_ACTIVATION: '/registration-resend-activation',
    REGISTRATION_RESEND_ACTIVATION_SUCCESS: '/registration-resend-activation-success',
    LOGIN_ADDIN_SUCCESS: '/login-addin-success',
    CONFIRM_REGISTRATION: '/confirm-registration',

    MANAGE_USER: '/manage-user',
    ADMIN_MANAGE_USER: '/admin/customers',
    ADMIN_MANAGE_POINT: '/admin/points',

    HEADTRAN_MANAGE_USER: '/...',
    HEADCOL_MANAGE_USER: '/...',
}

export const ANONYMOUS_ALLOW_PATHS = [
    Paths.HOME,
    Paths.LOGIN,
    Paths.REGISTER,
]