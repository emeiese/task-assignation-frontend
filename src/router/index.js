import { createRouter, createWebHistory} from 'vue-router'
import Landing from '../views/landing'
import Assigner from '../views/assigner'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Landing
    },
    {
        path: '/assigner',
        name: 'Assigner',
        component: Assigner
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


export default router 