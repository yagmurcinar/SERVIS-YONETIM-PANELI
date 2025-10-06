<template>
  <div
    class="driver-item"
    :class="{ 'driver-busy': isBusy }"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <div class="driver-header">
      <div class="driver-info-top">
        <h4 class="driver-name">{{ driver.firstName }} {{ driver.lastName }}</h4>
        <span class="driver-license">Ehliyet: {{ driver.licenseClass }}</span>
      </div>
    </div>

    <div class="driver-info">
      <div class="info-row">
        <span class="info-label">Durum:</span>
        <span class="status-badge" :class="statusClass">
          {{ statusText }}
        </span>
      </div>

      <div class="info-row">
        <span class="info-label">Müsaitlik:</span>
        <span class="info-value" v-if="todayAvailability">
          {{ todayAvailability.availableFrom }} - {{ todayAvailability.availableTo }}
        </span>
        <span class="info-value unavailable" v-else>Bu tarihte müsait değil</span>
      </div>

      <div v-if="lastAssignmentEnd" class="info-row">
        <span class="info-label">Son Atama Bitişi:</span>
        <span class="info-value">{{ lastAssignmentEnd }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAssignmentStore } from '@/stores/assignmentStore'

const props = defineProps({
  driver: {
    type: Object,
    required: true,
  },
})

const store = useAssignmentStore()

// Seçili tarihteki müsaitlik bilgisi
const todayAvailability = computed(() => {
  return store.getDriverAvailability(props.driver.id)
})

// Sürücü meşgul mü? (seçili tarihte)
const isBusy = computed(() => {
  // Önce bu tarihte müsait mi kontrol et
  if (!todayAvailability.value) return false

  const selectedDate = store.filters.date
  return props.driver.currentAssignments.some((a) => a.date === selectedDate)
})

const statusText = computed(() => {
  if (!todayAvailability.value) return 'Bu tarihte müsait değil'
  return isBusy.value ? 'Meşgul' : 'Müsait'
})

const statusClass = computed(() => {
  if (!todayAvailability.value) return 'status-unavailable'
  return isBusy.value ? 'status-busy' : 'status-available'
})

// Son atama bitiş saati (seçili tarih için)
const lastAssignmentEnd = computed(() => {
  const selectedDate = store.filters.date
  const assignmentsOnDate = props.driver.currentAssignments.filter((a) => a.date === selectedDate)

  if (assignmentsOnDate.length === 0) return null

  // En son biten atamayı bul
  const sorted = [...assignmentsOnDate].sort((a, b) => {
    return store.timeToMinutes(b.endTime) - store.timeToMinutes(a.endTime)
  })

  return sorted[0].endTime
})

// Drag başlangıcı
const handleDragStart = (e) => {
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('driverId', props.driver.id)
  e.target.style.opacity = '0.5'
}

// Drag bitişi
const handleDragEnd = (e) => {
  e.target.style.opacity = '1'
}
</script>

<style scoped>
.driver-item {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: grab;
  transition: all 0.2s;
}

.driver-item:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.driver-item:active {
  cursor: grabbing;
}

.driver-busy {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.driver-header {
  margin-bottom: 12px;
}

.driver-info-top {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.driver-name {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.driver-license {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
}

.driver-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.info-label {
  color: #6b7280;
  font-weight: 500;
}

.info-value {
  color: #1f2937;
  font-weight: 600;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
}

.status-available {
  background: #d1fae5;
  color: #065f46;
}

.status-busy {
  background: #fee2e2;
  color: #991b1b;
}

.status-unavailable {
  background: #f3f4f6;
  color: #6b7280;
}
</style>
