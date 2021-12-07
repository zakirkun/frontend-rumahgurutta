import {createRouter, createWebHistory} from 'vue-router'
import store from '../store'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '@/views/home/Index.vue')
    },
    {
        path: '/terimakasih',
        name: 'thanks',
        component: () => import( /* webpackChunkName: "search" */ '@/views/thanks/Index.vue')
    },
    {
        path: '/cari',
        name: 'search',
        component: () => import( /* webpackChunkName: "search" */ '@/views/search/Index.vue')
    },
    {
        path: '/kategori',
        name: 'category.index',
        component: () => import( /* webpackChunkName: "categoryIndex" */ '@/views/category/Index.vue')
    },
    {
        path: '/kategori/:slug',
        name: 'category.show',
        component: () => import( /* webpackChunkName: "categoryShow" */ '@/views/category/Show.vue')
    },
    {
        path: '/kampanye',
        name: 'campaign.index',
        component: () => import( /* webpackChunkName: "campaignIndex" */ '@/views/campaign/Index.vue')
    },  
    {
        path: '/kampanye/:slug',
        name: 'campaign.show',
        component: () => import( /* webpackChunkName: "campaignShow" */ '@/views/campaign/Show.vue')
    },  
    {
        path: '/daftar',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/auth/Register.vue')
    },
    {
        path: '/masuk',
        name: 'login',
        component: () => import( /* webpackChunkName: "login" */ '@/views/auth/Login.vue')
    },
    {
        path: '/info',
        name: 'dashboard',
        component: () => import( /* webpackChunkName: "dashboard" */ '@/views/dashboard/Index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/donasiku',
        name: 'donation.index',
        component: () => import( /* webpackChunkName: "donationIndex" */ '@/views/donation/Index.vue'),
        meta: {
            //chek is loggedIn
            requiresAuth: true
        }
    },
    {
        path: '/akun',
        name: 'profile',
        component: () => import( /* webpackChunkName: "profile" */ '@/views/profile/Index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/akun/ubah-password',
        name: 'profile.password',
        component: () => import( /* webpackChunkName: "profile" */ '@/views/profile/Password.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/donasi/:slug',
        name: 'donation.create',
        component: () => import( /* webpackChunkName: "donationCreate" */ '@/views/donation/Create.vue'),
        meta: {
            //chek is loggedIn
            requiresAuth: true
        }
    },
]

// create router
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(store.getters['auth/isLoggedIn']){
            next()
            return
        }

        next('/masuk')
    } else {
        next()
    }
})

export default router