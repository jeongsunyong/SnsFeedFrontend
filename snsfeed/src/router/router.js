import Router from 'vue-router'
import HomePage from '@/views/HomePage'
import LoginPage from '@/views/LoginPage'
import SignUpPage from '@/views/SignUpPage'

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/login",
    name : "LoginPage",
    component: LoginPage,
  },
  {
    path: "/signUp",
    name : "SignUpPage",
    component: SignUpPage,
  },
];


const router = new Router({
  mode: 'history',
  routes,
})

export default router;