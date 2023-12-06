import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/a-propos',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/inscription',
            name: 'signup',
            component: () => import('../views/Auth/SignupView.vue')
        },
        {
            path: '/connexion',
            name: 'login',
            component: () => import('../views/Auth/LoginView.vue')
        },
        {
            path: '/mon-compte',
            name: 'account',
            component: () => import('../views/auth/AccountView.vue')
        },
        {
            path: '/articles/:id',
            name: 'articles',
            component: () => import('../views/Articles/ArticleView.vue')
        },
        {
            path: '/nouveau-contenu',
            name: 'new-content',
            component: () => import('../views/NewContents/CreateContentView.vue'),
            children: [
                {
                    path: 'article',
                    name: 'new-article',
                    component: () => import('../views/NewContents/CreateArticleView.vue')
                },
                {
                    path: 'illustration',
                    name: 'new-image',
                    component: () => import('../views/NewContents/CreateIllustrationView.vue')
                }
            ]
        },
        {
            path: '/lecteurices',
            name: 'users-list',
            component: () => import('../views/Users/UsersListView.vue'),
            children: [
                {
                    path: ':id',
                    name: 'user-details',
                    component: () => import('../views/Users/UserDetailsView.vue')
                }
            ]
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('../views/ContactView.vue')
        },
        {
            path: '/donner',
            name: 'donate',
            component: () => import('../views/DonateView.vue')
        }
    ]
});

export default router;
