import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from '../views/ErrorView/ErrorView.vue'
import SignInView from '../views/SignInView/SignInView.vue'
import SignUpView from '../views/SignUpView/SignUpView.vue'
import CoinView from '../views/CoinView.vue/CoinView.vue'
import AccountView from '../views/AccountView.vue/AccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/coin/:coinId',
      name: 'coin',
      component: CoinView,
      props: true
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: ErrorView
    }
  ]
})

export default router
