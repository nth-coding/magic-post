import { createRouter, createWebHistory } from 'vue-router'
import {Paths} from "@/router/paths";
import MainLayout from "@/layouts/main/MainLayout.vue";
import HomePageView from "@/views/main/HomePageView.vue";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import LandingPageView from '@/views/main/LandingPageView.vue';
import ForgotPasswordView from "@/views/auth/ForgotPasswordView.vue";
import ResetPasswordView from "@/views/auth/ResetPasswordView.vue";
import LoginCompleteView from "@/views/auth/LoginCompleteView.vue";
import RegisterSuccessView from "@/views/auth/RegisterSuccessView.vue";
import ConfirmRegistrationView from "@/views/auth/ConfirmRegistrationView.vue";
import ResendConfirmRegistrationView from "@/views/auth/ResendConfirmRegistrationView.vue";
import ResendConfirmRegistrationSuccessView from "@/views/auth/ResendConfirmRegistrationSuccessView.vue";
import UserManageView from "@/views/main/UserManageView.vue";
import AdminCustomerManageView from "@/views/admin/customer/AdminCustomerManageView.vue";
import LeaderColOrderManageView from '@/views/collectionPoint/leader/LeaderOrderManageView.vue';
import LeaderTransOrderManageView from '@/views/transactionPoint/leader/LeaderOrderManageView.vue';
import LeaderColCustomerManageView from '@/views/collectionPoint/leader/LeaderCustomerManageView.vue';
import LeaderTransCustomerManageView from '@/views/transactionPoint/leader/LeaderCustomerManageView.vue';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: Paths.HOME,
            component: LandingPageView,
        },
        {
            path: Paths.MAIN,
            component: MainLayout,
            children: [
                {
                    path: Paths.MAIN,
                    component: HomePageView,
                },
                {
                    path: Paths.MANAGE_USER,
                    component: UserManageView,
                },
                {
                    path: Paths.ADMIN_MANAGE_USER,
                    component: AdminCustomerManageView,
                },
            ]
        },
        {
            path: Paths.LOGIN,
            component: UnauthenticatedLayout,
            children: [
                {
                    path: Paths.LOGIN,
                    component: LoginView,
                },
                {
                    path: Paths.REGISTER,
                    component: RegisterView,
                },
                {
                    path: Paths.FORGOT_PASSWORD,
                    component: ForgotPasswordView,
                },
                {
                    path: Paths.RESET_PASSWORD,
                    component: ResetPasswordView,
                },
                {
                    path: Paths.LOGIN_COMPLETE,
                    component: LoginCompleteView,
                },
                {
                    path: Paths.REGISTER_SUCCESS,
                    component: RegisterSuccessView,
                },
                {
                    path: Paths.CONFIRM_REGISTRATION,
                    component: ConfirmRegistrationView,
                },
                {
                    path: Paths.REGISTRATION_RESEND_ACTIVATION,
                    component: ResendConfirmRegistrationView,
                },
                {
                    path: Paths.REGISTRATION_RESEND_ACTIVATION_SUCCESS,
                    component: ResendConfirmRegistrationSuccessView,
                },
                {
                    path: Paths.HEADCOL_MANAGE_ORDER,
                    component: LeaderColOrderManageView,
                },
                {
                    path: Paths.HEADTRAN_MANAGE_ORDER,
                    component: LeaderTransOrderManageView,
                },
                {
                    path: Paths.HEADCOL_MANAGE_USER,
                    component: LeaderColCustomerManageView,
                },
                {
                    path: Paths.HEADTRAN_MANAGE_USER,
                    component: LeaderTransCustomerManageView,
                }
            ]
        },
    ],
})