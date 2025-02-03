import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'cards',
            component: () => import('../components/HomeView.vue')
        },
        {
            path: '/card-add',
            name: 'card-add',
            component: () => import('../components/AddCard.vue')
        },

    ]
})

export default router