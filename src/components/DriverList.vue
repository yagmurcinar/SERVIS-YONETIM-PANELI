<template>
    <div class="driver-list">
      <h2 class="list-title">Sürücüler ({{ filteredDrivers.length }})</h2>
  
      <div class="drivers-container">
        <DriverItem 
          v-for="driver in filteredDrivers" 
          :key="driver.id"
          :driver="driver"
        />
  
        <div v-if="filteredDrivers.length === 0" class="empty-state">
          <p>Sürücü bulunamadı</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useAssignmentStore } from '@/stores/assignmentStore';
  import DriverItem from './DriverItem.vue';
  
  const store = useAssignmentStore();
  
  const filteredDrivers = computed(() => {
    return store.filteredDrivers;
  });
  </script>
  
  <style scoped>
  .driver-list {
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    height: calc(100vh - 40px);
    position: sticky;
    top: 20px;
    display: flex;
    flex-direction: column;
  }
  
  .list-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #1f2937;
  }
  
  .drivers-container {
    overflow-y: auto;
    flex: 1;
    padding-right: 8px;
  }
  
  /* Scrollbar stil */
  .drivers-container::-webkit-scrollbar {
    width: 6px;
  }
  
  .drivers-container::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 3px;
  }
  
  .drivers-container::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }
  
  .drivers-container::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
  
  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #9ca3af;
  }
  
  .empty-state p {
    font-size: 14px;
  }
  </style>