import { defineStore } from 'pinia'
import { routes, drivers, mockApi } from '@/utils/mockData'

export const useAssignmentStore = defineStore('assignment', {
  state: () => ({
    routes: JSON.parse(JSON.stringify(routes)),
    drivers: JSON.parse(JSON.stringify(drivers)),
    filters: {
      date: new Date().toISOString().split('T')[0],
      shift: '',
      district: '',
      search: '',
    },
    toast: {
      show: false,
      message: '',
      type: 'success',
    },
  }),

  getters: {
    filteredRoutes: (state) => {
      let result = [...state.routes]

      if (state.filters.shift) {
        result = result.filter((r) => r.shift === state.filters.shift)
      }

      if (state.filters.district) {
        result = result.filter((r) => r.district === state.filters.district)
      }

      if (state.filters.search) {
        const searchLower = state.filters.search.toLocaleLowerCase('tr-TR')

        const matchingRoutes = result.filter(
          (r) =>
            r.name.toLocaleLowerCase('tr-TR').includes(searchLower) ||
            r.district.toLocaleLowerCase('tr-TR').includes(searchLower),
        )

        const matchingDrivers = state.drivers.filter((d) =>
          `${d.firstName} ${d.lastName}`.toLocaleLowerCase('tr-TR').includes(searchLower),
        )

        // Eğer sürücü bulunduysa, o sürücülerin atandığı hatları da ekle
        if (matchingDrivers.length > 0) {
          const driverIds = matchingDrivers.map((d) => d.id)
          const routesWithDrivers = result.filter((r) =>
            r.assignedDrivers.some((id) => driverIds.includes(id)),
          )

          // Her iki sonucu birleştir (tekrar olmaması için Set kullan)
          const allRouteIds = new Set([
            ...matchingRoutes.map((r) => r.id),
            ...routesWithDrivers.map((r) => r.id),
          ])

          result = result.filter((r) => allRouteIds.has(r.id))
        } else {
          result = matchingRoutes
        }
      }

      return result
    },
    filteredDrivers: (state) => {
      let result = [...state.drivers]

      if (state.filters.search) {
        const searchLower = state.filters.search.toLocaleLowerCase('tr-TR')
        const matchingDriversByName = result.filter(
          (d) =>
            `${d.firstName} ${d.lastName}`.toLocaleLowerCase('tr-TR').includes(searchLower) ||
            d.licenseClass.toLocaleLowerCase('tr-TR').includes(searchLower),
        )
        const matchingRoutes = state.routes.filter(
          (r) =>
            r.name.toLocaleLowerCase('tr-TR').includes(searchLower) ||
            r.district.toLocaleLowerCase('tr-TR').includes(searchLower),
        )

        // Eğer hat bulunduysa, o hatlara atanan sürücüleri de ekle
        if (matchingRoutes.length > 0) {
          const assignedDriverIds = new Set()
          matchingRoutes.forEach((route) => {
            route.assignedDrivers.forEach((id) => assignedDriverIds.add(id))
          })

          const driversFromRoutes = result.filter((d) => assignedDriverIds.has(d.id))

          // Her iki sonucu birleştir
          const allDriverIds = new Set([
            ...matchingDriversByName.map((d) => d.id),
            ...driversFromRoutes.map((d) => d.id),
          ])

          result = result.filter((d) => allDriverIds.has(d.id))
        } else {
          result = matchingDriversByName
        }
      }

      return result
    },

    // Belirli bir sürücünün seçili tarihteki müsaitlik bilgisini getir
    getDriverAvailability: (state) => (driverId) => {
      const driver = state.drivers.find((d) => d.id === driverId)
      if (!driver) return null

      return driver.availability.find((av) => av.date === state.filters.date)
    },

    getDriverById: (state) => (driverId) => {
      return state.drivers.find((d) => d.id === driverId)
    },

    getRouteById: (state) => (routeId) => {
      return state.routes.find((r) => r.id === routeId)
    },
  },

  actions: {
    updateFilter(key, value) {
      this.filters[key] = value
      this.syncFiltersToUrl()
    },
    loadFiltersFromUrl() {
      const params = new URLSearchParams(window.location.search)

      if (params.has('date')) this.filters.date = params.get('date')
      if (params.has('shift')) this.filters.shift = params.get('shift')
      if (params.has('district')) this.filters.district = params.get('district')
      if (params.has('search')) this.filters.search = params.get('search')
    },

    syncFiltersToUrl() {
      const params = new URLSearchParams()

      if (this.filters.date) params.set('date', this.filters.date)
      if (this.filters.shift) params.set('shift', this.filters.shift)
      if (this.filters.district) params.set('district', this.filters.district)
      if (this.filters.search) params.set('search', this.filters.search)

      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.replaceState({}, '', newUrl)
    },

    // Zaman çakışması kontrolü (seçili tarih için)
    checkTimeConflict(driverId, routeId) {
      const driver = this.getDriverById(driverId)
      const newRoute = this.getRouteById(routeId)

      if (!driver || !newRoute) return false

      // Sürücünün seçili tarihteki atamalarını kontrol et
      const selectedDate = this.filters.date
      const assignmentsOnDate = driver.currentAssignments.filter(
        (assignment) => assignment.date === selectedDate,
      )

      for (const assignment of assignmentsOnDate) {
        const existingRoute = this.getRouteById(assignment.routeId)

        if (!existingRoute) continue

        // Zaman çakışması var mı?
        const newStart = this.timeToMinutes(newRoute.startTime)
        const newEnd = this.timeToMinutes(newRoute.endTime)
        const existingStart = this.timeToMinutes(existingRoute.startTime)
        const existingEnd = this.timeToMinutes(existingRoute.endTime)

        // Çakışma kontrolü: (newStart < existingEnd) && (newEnd > existingStart)
        if (newStart < existingEnd && newEnd > existingStart) {
          return true
        }
      }

      return false
    },

    // Uygunluk kontrolü (seçili tarihteki müsaitlik kontrolü)
    checkAvailability(driverId, routeId) {
      const driver = this.getDriverById(driverId)
      const route = this.getRouteById(routeId)

      if (!driver || !route) return false

      const availability = this.getDriverAvailability(driverId)

      if (!availability) return false

      let availableFromMinutes = this.timeToMinutes(availability.availableFrom)
      let availableToMinutes = this.timeToMinutes(availability.availableTo)
      const routeStartMinutes = this.timeToMinutes(route.startTime)
      const routeEndMinutes = this.timeToMinutes(route.endTime)

      // Eğer availableTo, availableFrom'dan küçükse ertesi güne geçiyor demektir
      if (availableToMinutes < availableFromMinutes) {
        availableToMinutes += 1440 // 24 saat ekle
      }

      // Eğer route endTime, startTime'dan küçükse ertesi güne geçiyor
      let adjustedRouteEnd = routeEndMinutes
      if (routeEndMinutes < routeStartMinutes) {
        adjustedRouteEnd += 1440
      }

      // Sürücü müsaitlik aralığı, hatın tüm süresini kapsamalı
      return availableFromMinutes <= routeStartMinutes && availableToMinutes >= adjustedRouteEnd
    },

    checkCapacityWarning(routeId) {
      const route = this.getRouteById(routeId)
      if (!route) return false

      return route.passengerCount > route.capacity
    },

    async assignDriver(driverId, routeId) {
      const driver = this.getDriverById(driverId)
      const route = this.getRouteById(routeId)

      if (!driver || !route) {
        this.showToast('Hata: Sürücü veya hat bulunamadı', 'error')
        return false
      }

      // Validasyonlar
      if (this.checkTimeConflict(driverId, routeId)) {
        this.showToast('Zaman çakışması var! Bu sürücü o saatte başka bir hatta atanmış.', 'error')
        return false
      }

      if (!this.checkAvailability(driverId, routeId)) {
        this.showToast('Sürücü bu saatte henüz müsait değil.', 'error')
        return false
      }

      // Önceki state'i kaydet (rollback için)
      const previousDriverState = JSON.parse(JSON.stringify(driver.currentAssignments))
      const previousRouteState = JSON.parse(JSON.stringify(route.assignedDrivers))

      // Optimistic update: UI'ı hemen güncelle
      driver.currentAssignments.push({
        routeId: route.id,
        startTime: route.startTime,
        endTime: route.endTime,
        date: this.filters.date,
      })
      route.assignedDrivers.push(driverId)

      try {
        // API çağrısı
        await mockApi.saveAssignment(driverId, routeId)
        this.showToast('Atama başarılı!', 'success')
        return true
      } catch (error) {
        // Hata durumunda rollback
        driver.currentAssignments = previousDriverState
        route.assignedDrivers = previousRouteState
        this.showToast('Atama kaydedilemedi. Lütfen tekrar deneyin.', 'error')
        return false
      }
    },

    async removeDriver(driverId, routeId) {
      const driver = this.getDriverById(driverId)
      const route = this.getRouteById(routeId)

      if (!driver || !route) return

      // Atamaları güncelle
      driver.currentAssignments = driver.currentAssignments.filter((a) => a.routeId !== routeId)
      route.assignedDrivers = route.assignedDrivers.filter((id) => id !== driverId)

      try {
        await mockApi.removeAssignment(driverId, routeId)
        this.showToast('Atama kaldırıldı', 'success')
      } catch (error) {
        this.showToast('Atama kaldırılamadı', 'error')
      }
    },

    showToast(message, type = 'success') {
      this.toast = {
        show: true,
        message,
        type,
      }

      setTimeout(() => {
        this.toast.show = false
      }, 3000)
    },

    timeToMinutes(time) {
      const [hours, minutes] = time.split(':').map(Number)
      return hours * 60 + minutes
    },
  },
})
