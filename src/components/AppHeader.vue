<template>
  <header class="header">
    <div class="container header-inner">
      <router-link to="/" class="logo">
        <img :src="logo" alt="KidsConnect" class="logo-img" />
        <span class="logo-text">KidsConnect</span>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import logo from '../assets/logo.svg'
</script>

<style scoped>
.header {
  padding: 20px 20px 0;
}

.header-inner {
  background: var(--primary);
  border-radius: 15px;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  max-width: 1480px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo-img {
  width: 76px;
  height: 76px;
}

.logo-text {
  font-family: var(--font-logo);
  font-size: 32px;
  font-weight: 600;
  color: var(--white);
}

@media (max-width: 768px) {
  .header-inner {
    height: 72px;
    padding: 0 20px;
  }
  .logo-img {
    width: 48px;
    height: 48px;
  }
  .logo-text {
    font-size: 22px;
  }
}
</style>
