<template>
    <transition name="toast">
      <div 
        v-if="store.toast.show" 
        class="toast"
        :class="toastClass"
      >
        <span>{{ store.toast.message }}</span>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useAssignmentStore } from '@/stores/assignmentStore';
  
  const store = useAssignmentStore();
  
  const toastClass = computed(() => {
    return `toast-${store.toast.type}`;
  });
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    font-size: 14px;
    font-weight: 500;
    max-width: 400px;
  }
  
  .toast-success {
    background-color: #10b981;
    color: white;
  }
  
  .toast-error {
    background-color: #ef4444;
    color: white;
  }
  
  .toast-warning {
    background-color: #f59e0b;
    color: white;
  }
  
  .toast-enter-active {
    animation: slideIn 0.3s ease-out;
  }
  
  .toast-leave-active {
    animation: slideOut 0.3s ease-in;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  </style>