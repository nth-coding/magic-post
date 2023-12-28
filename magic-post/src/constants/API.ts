export const AuthAPI = {
    GET_USER_INFO: '/user/me',
    GET_CUSTOMER_INFO: '/customer/me',
    GET_BOSS_INFO: '/boss/me',
    GET_HEADTRAN_INFO: '/headtran/me',
    GET_HEADCOL_INFO: '/headcol/me',
    GET_OFFICERTRAN_INFO: '/officertran/me',
    GET_OFFICERCOL_INFO: '/officercol/me',

    LOGOUT: '/logout',
    LOGIN_WITH_GOOGLE: '/oauth2/authorize/google',
    UPDATE_TOKEN_FOR_AUTH_CODE: '/auth-codes/update-token',
    LOGIN_WITH_PASSWORD: '/auth/signin',
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
    PACKAGE_MANAGE: '/packages',

    TRANSACTION_POINT: '/boss/tran-point',
    COLLECTION_POINT: '/boss/col-point',
    TRANSACTION_POINT_MANAGE: '/boss/tran-points',
    COLLECTION_POINT_MANAGE: '/boss/col-points',
    PACKAGE_BOSS_MANAGE: '/boss/packages',
    STAFF_BOSS_MANAGE: '/boss/staff',

    HEAD_COL_USER_MANAGE: '/manager/col/staff',
    HEAD_COL_SENT_ORDER_MANAGE: '/manager/col/sent-packages',
    HEAD_COL_CURRENT_ORDER_MANAGE: '/manager/col/curr-packages',
    HEAD_COL_RECEIVED_ORDER_MANAGE: '/manager/col/rec-packages',

    HEAD_TRAN_USER_MANAGE: '/manager/tran/staff',
    HEAD_TRAN_SENT_ORDER_MANAGE: '/manager/tran/sent-packages',
    HEAD_TRAN_CURRENT_ORDER_MANAGE: '/manager/tran/curr-packages',
    HEAD_TRAN_RECEIVED_ORDER_MANAGE: '/manager/tran/rec-packages',

    CUSTOMER_GET_PACKAGE_INFO: '/customer/package',
}
