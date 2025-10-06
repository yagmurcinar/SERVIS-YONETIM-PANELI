<!-- src/components/RouteCard.vue -->
<template>
  <div 
    class="route-card"
    :class="{ 
      'drop-active': isDragOver,
      'has-warning': hasCapacityWarning 
    }"
    @dragover.prevent="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <!-- Kapasite Uyarısı -->
    <div v-if="hasCapacityWarning" class="warning-badge">
      ⚠️ Kapasite Aşımı
    </div>

    <!-- Hat Başlığı -->
    <div class="route-header">
      <h3 class="route-name">{{ route.name }}</h3>
      <span class="route-shift" :class="shiftClass">
        {{ shiftLabel }}
      </span>
    </div>

    <!-- Hat Bilgileri -->
    <div class="route-info">
      <div class="info-item">
        <span class="info-icon">🕐</span>
        <span>{{ route.startTime }} - {{ route.endTime }}</span>
      </div>

      <div class="info-item">
        <span class="info-icon">👥</span>
        <span>{{ route.passengerCount }} / {{ route.capacity }}</span>
      </div>

      <div class="info-item">
        <span class="info-icon">📍</span>
        <span>{{ route.district }}</span>
      </div>
    </div>

    <!-- Atanan Sürücüler -->
    <div class="assigned-section">
      <h4 class="assigned-title">Atanan Sürücüler</h4>
      
      <div v-if="assignedDrivers.length > 0" class="assigned-drivers">
        <div 
          v-for="driver in assignedDrivers" 
          :key="driver.id"
          class="assigned-driver"
        >
          <span class="driver-fullname">
            {{ driver.firstName }} {{ driver.lastName }}
          </span>
          <button 
            @click="handleRemoveDriver(driver.id)"
            class="remove-btn"
            title="Ataması Kaldır"
          >
            ✕
          </button>
        </div>
      </div>

      <div v-else class="drop-zone">
        <span class="drop-text">Sürücü sürükleyin</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAssignmentStore } from '@/stores/assignmentStore';

const props = defineProps({
  route: {
    type: Object,
    required: true
  }
});

const store = useAssignmentStore();
const isDragOver = ref(false);

// Vardiya etiketi
const shiftLabel = computed(() => {
  return props.route.shift === 'morning' ? 'Sabah' : 'Gece';
});

// Vardiya CSS sınıfı
const shiftClass = computed(() => {
  return props.route.shift === 'morning' ? 'shift-morning' : 'shift-night';
});

// Kapasite uyarısı var mı?
const hasCapacityWarning = computed(() => {
  return store.checkCapacityWarning(props.route.id);
});

// Atanan sürücülerin detayları (seçili tarih için)
const assignedDrivers = computed(() => {
  const selectedDate = store.filters.date;
  
  // Bu hatta atanan sürücülerin detaylarını al
  return props.route.assignedDrivers
    .map(driverId => {
      const driver = store.getDriverById(driverId);
      if (!driver) return null;
      
      // Bu sürücünün bu hatta bu tarihteki ataması var mı?
      const hasAssignmentOnDate = driver.currentAssignments.some(
        a => a.routeId === props.route.id && a.date === selectedDate
      );
      
      return hasAssignmentOnDate ? driver : null;
    })
    .filter(Boolean); // null olanları temizle
});

// Drag over
const handleDragOver = (e) => {
  e.preventDefault();
  isDragOver.value = true;
};

// Drag leave
const handleDragLeave = () => {
  isDragOver.value = false;
};

// Drop
const handleDrop = async (e) => {
  e.preventDefault();
  isDragOver.value = false;

  const driverId = e.dataTransfer.getData('driverId');
  if (!driverId) return;

  // Zaten atanmış mı kontrol et (aynı tarih için)
  const selectedDate = store.filters.date;
  const driver = store.getDriverById(driverId);
  
  if (driver) {
    const alreadyAssigned = driver.currentAssignments.some(
      a => a.routeId === props.route.id && a.date === selectedDate
    );
    
    if (alreadyAssigned) {
      store.showToast('Bu sürücü bu tarihte zaten bu hatta atanmış', 'warning');
      return;
    }
  }

  // Atamayı yap
  await store.assignDriver(driverId, props.route.id);
};

// Sürücü atamasını kaldır
const handleRemoveDriver = async (driverId) => {
  if (confirm('Bu sürücünün atamasını kaldırmak istediğinize emin misiniz?')) {
    await store.removeDriver(driverId, props.route.id);
  }
};
</script>

<style scoped>
.route-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.3s;
  position: relative;
}

.route-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.drop-active {
  border-color: #3b82f6;
  background: #eff6ff;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2);
}

.has-warning {
  border-color: #fbbf24;
}

.warning-badge {
  position: absolute;
  top: -12px;
  right: 20px;
  background: #fbbf24;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(251, 191, 36, 0.3);
}

.route-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.route-name {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.route-shift {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.shift-morning {
  background: #fef3c7;
  color: #92400e;
}

.shift-night {
  background: #dbeafe;
  color: #1e3a8a;
}

.route-info {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4b5563;
}

.info-icon {
  font-size: 16px;
}

.assigned-section {
  margin-top: 16px;
}

.assigned-title {
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 12px;
}

.assigned-drivers {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.assigned-driver {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f4f6;
  padding: 10px 14px;
  border-radius: 6px;
  transition: background 0.2s;
}

.assigned-driver:hover {
  background: #e5e7eb;
}

.driver-fullname {
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
}

.remove-btn {
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s;
}

.remove-btn:hover {
  background: #fee2e2;
}

.drop-zone {
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  background: #f9fafb;
  transition: all 0.2s;
}

.drop-active .drop-zone {
  border-color: #3b82f6;
  background: #dbeafe;
}

.drop-text {
  color: #9ca3af;
  font-size: 14px;
}
</style>