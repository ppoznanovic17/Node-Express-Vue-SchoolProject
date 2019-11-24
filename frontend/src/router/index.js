import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from '../views/Welcome';
import LogIn from '@/views/LogIn';
import Register from '@/views/Register';
import Home from '@/views/Home';
import Profile from '@/views/Profile';
import Edit from '@/views/Edit'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '',
    component: Welcome
  },
  {
    path: '/auth/log',
    name: '',
    component: LogIn
  },
  {
    path: '/auth/reg',
    name: '',
    component: Register
  },
  {
    path: '/home',
    name: '',
    component: Home
  },
  {
    path: '/profile',
    name: '',
    component: Profile
  },
  {
    path: 'profile/post',
    name: '',
    component: Edit
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
