<template>
    <div class="login-container">
      <form @submit.prevent="handleLogin">
        <input v-model="form.username" placeholder="用户名" required />
        <input v-model="form.password" type="password" placeholder="密码" required />
        <select v-model="form.role">
          <option value="user">普通用户</option>
          <option value="admin">管理员</option>
        </select>
        <button type="submit">登录</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { login } from '@/api/auth';
  
  const router = useRouter();
  const form = ref({ username: '', password: '', role: 'user' });
  const errorMessage = ref('');
  
  const handleLogin = async () => {
    try {
      const response = await login(form.value);
      
      // 存储登录状态（根据后端 Session 机制）
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('role', response.role);
  
      if (response.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      errorMessage.value = error.message;
      sessionStorage.clear();
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  .error {
    color: red;
    margin-top: 1rem;
  }
  </style>