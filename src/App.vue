<template>
  <div class="app">
    <header class="app-header">
      <h1 class="app-title">Servis Yönetim Paneli</h1>
    </header>

    <main class="app-main">
      <aside class="sidebar-left">
        <FilterPanel />
      </aside>
      <section class="content-center">
        <div class="routes-header">
          <h2 class="section-title">Hatlar</h2>
          <span class="routes-count">{{ filteredRoutes.length }} hat listeleniyor</span>
        </div>

        <div class="routes-container">
          <RouteCard v-for="route in filteredRoutes" :key="route.id" :route="route" />

          <div v-if="filteredRoutes.length === 0" class="empty-state">
            <span class="empty-icon">🔍</span>
            <p>Filtrelerinize uygun hat bulunamadı</p>
          </div>
        </div>
      </section>
      <aside class="sidebar-right">
        <DriverList />
      </aside>
    </main>
    <Toast />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAssignmentStore } from '@/stores/assignmentStore'
import FilterPanel from '@/components/FilterPanel.vue'
import RouteCard from '@/components/RouteCard.vue'
import DriverList from '@/components/DriverList.vue'
import Toast from '@/components/Toast.vue'

const store = useAssignmentStore()

const filteredRoutes = computed(() => {
  return store.filteredRoutes
})

// Sayfa yüklendiğinde URL'den filtreleri yükle
onMounted(() => {
  store.loadFiltersFromUrl()
})
</script>

<style>
/* Global Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f3f4f6;
  color: #1f2937;
}

.app {
  min-height: 100vh;
}

.app-header {
  background: white;
  padding: 14px 40px;
  box-shadow: 0 3px 3px rgba(182, 107, 37, 0.1);
  border-bottom: 1px solid #e5e7eb;
  background-color: #f0ebdf;
}

.app-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
  text-align: center;
}

.app-subtitle {
  font-size: 14px;
  color: #6b7280;
}

.app-main {
  display: grid;
  grid-template-columns: 280px 1fr 320px;
  gap: 24px;
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;
}

.sidebar-left,
.sidebar-right {
  min-width: 0;
}

.content-center {
  min-width: 0;
}

.routes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
}

.routes-count {
  font-size: 14px;
  color: #6b7280;
  background: white;
  padding: 6px 16px;
  border-radius: 20px;
}

.routes-container {
  display: flex;
  flex-direction: column;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 12px;
  border: 2px dashed #d1d5db;
}

.empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
}

.empty-state p {
  color: #9ca3af;
  font-size: 16px;
}

/* Responsive */
@media (max-width: 1400px) {
  .app-main {
    grid-template-columns: 260px 1fr 300px;
    gap: 20px;
  }
}

@media (max-width: 1200px) {
  .app-main {
    grid-template-columns: 240px 1fr 280px;
    gap: 16px;
  }
}

@media (max-width: 992px) {
  .app-main {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .sidebar-left,
  .sidebar-right {
    position: static;
  }
}
</style>
