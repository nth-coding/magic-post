export const Paths = {
    HOME: '/',
    LOGIN: '/login',
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
    ADMIN_MANAGE_USER: '/admin/users',
}

export const ANONYMOUS_ALLOW_PATHS = [
    Paths.LOGIN,
    Paths.REGISTER,
]