<template>
  <div class="home-page">
    <div class="user-info">
      <div class="user-role">Role: <span class="role-name">{{ userRole }}</span></div>
      <h1 class="user-greeting">Xin chào, {{ username }}</h1>
    </div>
    <div class="services">
      <div class="service-card" v-for="service in services" :key="service.id">
        <h2 class="service-card-h2">{{ service.name }}</h2>
        <p class="service-card-p">{{ service.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const username = ref('nth-coding');
const userRole = ref('ADMIN');
const services = ref([
  { id: 1, name: 'Service 1', description: 'Description for Service 1' },
  { id: 2, name: 'Service 2', description: 'Description for Service 2' },
  // Add more services as needed
]);
</script>

<style scoped lang="scss">
:root {
  --spacing: 2rem;
  --max-card-width: 250px;
}

.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: var(--spacing);
  box-sizing: border-box;
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: var(--spacing);
    .user-role {
      font-size: 1.5rem;
      .role-name {
        font-size: 2rem;
      }
    }
    .user-greeting {
      font-size: 2rem;
    }
  }
  .services {
    display: grid;
    gap: var(--spacing);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    .service-card {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #000;
      border-radius: 15px;
      padding: 1rem;
      margin: 1rem;
      transition: all 0.3s ease;
      &:hover {
        transform: scale(1.05);
      }

      h2 {
        font-size: 1.5rem;
        padding-right: 1.2rem;
      }

      p {
        font-size: 1rem;
      }
    }
  }
}
</style>