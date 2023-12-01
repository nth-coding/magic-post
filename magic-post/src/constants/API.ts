export const AuthAPI = {
    GET_USER_INFO: '/users/me',
    LOGOUT: '/logout',
    LOGIN_WITH_GOOGLE: '/oauth2/authorize/google',
    UPDATE_TOKEN_FOR_AUTH_CODE: '/auth-codes/update-token',
    LOGIN_WITH_PASSWORD: '/auth/login',
    FORGOT_PASSWORD: '/auth/forgot_password',
    RESET_PASSWORD: '/auth/reset_password',
    CHECK_TOKEN_RESET_PASSWORD: '/auth/reset_password/check',
    REGISTER: '/auth/register',
    CONFIRM_REGISTRATION: '/auth/confirm_registration',
    RESEND_REGISTRATION_EMAIL: '/auth/resend_registration_email',
    LOGIN_WITH_FACEBOOK: '/oauth2/authorize/facebook',
    CHECK_ADMIN: '/users/check-plan',
    ENROLL_ORGANIZATION: '/users/enroll-organization',
    EDIT_PROFILE: '/users/edit-profile',
    CHANGE_PASSWORD: '/users/change_password',
}

export const AdminApi = {
    USER_MANAGE: '/users',
}
