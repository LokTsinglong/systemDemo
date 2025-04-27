import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import Dashboard from '@/views/Dashboard.vue';
import Admin from '@/views/Admin.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginView },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: Dashboard,
    meta: { requiresAuth: true }  // 需要登录
  },
  { 
    path: '/admin', 
    name: 'Admin', 
    component: Admin,
    meta: { requiresAuth: true, requiresAdmin: true }  // 需要管理员权限
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守卫：权限控制
router.beforeEach((to, from, next) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');  // 从 Session 获取登录状态
  const role = sessionStorage.getItem('role');

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else if (to.meta.requiresAdmin && role !== 'admin') {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;