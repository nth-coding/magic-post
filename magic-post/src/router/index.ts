import { createRouter, createWebHistory } from 'vue-router'
import {Paths} from "@/router/paths";
import MainLayout from "@/layouts/main/MainLayout.vue";
import HomePageView from "@/views/main/HomePageView.vue";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: Paths.HOME,
            component: MainLayout,
            children: [
                {
                    path: Paths.HOME,
                    // redirect: Paths.MANAGE_USER,
                    component: HomePageView,
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
            ]
        },
    ],
})