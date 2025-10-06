<template>
  <div class="filter-panel">
    <h2 class="panel-title">Filtreler</h2>

    <!-- Tarih Filtresi -->
    <div class="filter-group">
      <label for="date">Tarih</label>
      <input 
        id="date"
        type="date" 
        :value="store.filters.date"
        @input="handleDateChange"
        class="filter-input"
      />
    </div>

    <!-- Vardiya Filtre -->
    <div class="filter-group">
      <label for="shift">Vardiya</label>
      <select 
        id="shift"
        :value="store.filters.shift"
        @change="handleShiftChange"
        class="filter-input"
      >
        <option value="">Tümü</option>
        <option value="morning">Sabah</option>
        <option value="night">Gece</option>
      </select>
    </div>

    <!-- İlçe Filtre -->
    <div class="filter-group">
      <label for="district">İlçe</label>
      <select 
        id="district"
        :value="store.filters.district"
        @change="handleDistrictChange"
        class="filter-input"
      >
        <option value="">Tümü</option>
        <option value="Kadıköy">Kadıköy</option>
        <option value="Beşiktaş">Beşiktaş</option>
        <option value="Üsküdar">Üsküdar</option>
        <option value="Şişli">Şişli</option>
        <option value="Bakırköy">Bakırköy</option>
      </select>
    </div>

    <!-- Arama Kutusu -->
    <div class="filter-group">
      <label for="search">Arama</label>
      <input 
        id="search"
        type="text" 
        :value="store.filters.search"
        @input="handleSearchChange"
        placeholder="Hat veya sürücü ara..."
        class="filter-input"
      />
    </div>

    <!-- Filtre Özeti -->
    <div class="filter-summary">
      <p>Toplam hat sayısı : {{ store.filteredRoutes.length }}</p>
      <p>Toplam sürücü sayısı : {{ store.filteredDrivers.length }}</p>
    </div>
  </div>
</template>

<script setup>
import { useAssignmentStore } from '@/stores/assignmentStore';

const store = useAssignmentStore();

const handleDateChange = (e) => {
  store.updateFilter('date', e.target.value);
};

const handleShiftChange = (e) => {
  store.updateFilter('shift', e.target.value);
};

const handleDistrictChange = (e) => {
  store.updateFilter('district', e.target.value);
};

const handleSearchChange = (e) => {
  store.updateFilter('search', e.target.value);
};
</script>

<style scoped>
.filter-panel {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 20px;
}

.panel-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #1f2937;
}

.filter-group {
  margin-bottom: 20px;
}

.filter-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.filter-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.filter-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.filter-summary {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.filter-summary p {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 4px;
}
</style>