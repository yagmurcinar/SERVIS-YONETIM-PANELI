export const routes = [
  {
    id: 'r1',
    name: 'Kadıköy - Kartal Hattı',
    startTime: '07:00',
    endTime: '09:00',
    capacity: 28,
    passengerCount: 25,
    district: 'Kadıköy',
    shift: 'morning',
    assignedDrivers: []
  },
  {
    id: 'r2',
    name: 'Beşiktaş - Sarıyer Hattı',
    startTime: '07:30',
    endTime: '09:30',
    capacity: 20,
    passengerCount: 22, // kapasite aşımı
    district: 'Beşiktaş',
    shift: 'morning',
    assignedDrivers: []
  },
  {
    id: 'r3',
    name: 'Üsküdar - Çekmeköy Hattı',
    startTime: '08:00',
    endTime: '10:00',
    capacity: 30,
    passengerCount: 18,
    district: 'Üsküdar',
    shift: 'morning',
    assignedDrivers: []
  },
  {
    id: 'r4',
    name: 'Şişli - Maslak Hattı',
    startTime: '06:30',
    endTime: '08:30',
    capacity: 25,
    passengerCount: 20,
    district: 'Şişli',
    shift: 'morning',
    assignedDrivers: []
  },
  {
    id: 'r5',
    name: 'Bakırköy - Bahçelievler Hattı',
    startTime: '08:30',
    endTime: '10:30',
    capacity: 22,
    passengerCount: 19,
    district: 'Bakırköy',
    shift: 'morning',
    assignedDrivers: []
  },
  {
    id: 'r6',
    name: 'Ataşehir - Ümraniye Hattı',
    startTime: '07:15',
    endTime: '09:15',
    capacity: 26,
    passengerCount: 24,
    district: 'Ataşehir',
    shift: 'morning',
    assignedDrivers: []
  },
  {
    id: 'r7',
    name: 'Beylikdüzü - Avcılar Hattı',
    startTime: '19:00',
    endTime: '21:00',
    capacity: 25,
    passengerCount: 20,
    district: 'Beylikdüzü',
    shift: 'night',
    assignedDrivers: []
  },
  {
    id: 'r8',
    name: 'Maltepe - Pendik Hattı',
    startTime: '19:30',
    endTime: '21:30',
    capacity: 24,
    passengerCount: 26, // kapasite aşımı
    district: 'Maltepe',
    shift: 'night',
    assignedDrivers: []
  },
  {
    id: 'r9',
    name: 'Çekmeköy - Sancaktepe Hattı',
    startTime: '18:45',
    endTime: '20:45',
    capacity: 23,
    passengerCount: 21,
    district: 'Çekmeköy',
    shift: 'night',
    assignedDrivers: []
  },
  {
    id: 'r10',
    name: 'Sultangazi - Esenler Hattı',
    startTime: '20:00',
    endTime: '22:00',
    capacity: 27,
    passengerCount: 23,
    district: 'Sultangazi',
    shift: 'night',
    assignedDrivers: []
  }
];

export const drivers = [
  {
    id: 'd1',
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    licenseClass: 'D',
    status: 'available',
    currentAssignments: [], 
    availability: [
      { date: '2025-10-05', availableFrom: '06:00', availableTo: '14:00' },
      { date: '2025-10-06', availableFrom: '06:00', availableTo: '14:00' },
      { date: '2025-10-07', availableFrom: '18:00', availableTo: '02:00' }, 
      { date: '2025-10-08', availableFrom: '06:00', availableTo: '14:00' }
    ]
  },
  {
    id: 'd2',
    firstName: 'Mehmet',
    lastName: 'Demir',
    licenseClass: 'D',
    status: 'available',
    currentAssignments: [],
    availability: [
      { date: '2025-10-05', availableFrom: '06:30', availableTo: '15:00' },
      { date: '2025-10-06', availableFrom: '06:30', availableTo: '15:00' },
      { date: '2025-10-08', availableFrom: '19:00', availableTo: '03:00' }
    ]
  },
  {
    id: 'd3',
    firstName: 'Ayşe',
    lastName: 'Kaya',
    licenseClass: 'B',
    status: 'available',
    currentAssignments: [],
    availability: [
      { date: '2025-10-05', availableFrom: '06:00', availableTo: '14:30' },
      { date: '2025-10-06', availableFrom: '06:00', availableTo: '14:30' },
      { date: '2025-10-07', availableFrom: '06:00', availableTo: '14:30' }
    ]
  },
  {
    id: 'd4',
    firstName: 'Fatma',
    lastName: 'Çelik',
    licenseClass: 'D',
    status: 'available',
    currentAssignments: [],
    availability: [
      { date: '2025-10-05', availableFrom: '07:30', availableTo: '16:00' },
      { date: '2025-10-07', availableFrom: '07:30', availableTo: '16:00' },
      { date: '2025-10-08', availableFrom: '18:00', availableTo: '02:00' }
    ]
  },
  {
    id: 'd5',
    firstName: 'Can',
    lastName: 'Öztürk',
    licenseClass: 'D',
    status: 'available',
    currentAssignments: [],
    availability: [
      { date: '2025-10-05', availableFrom: '08:00', availableTo: '17:00' },
      { date: '2025-10-06', availableFrom: '08:00', availableTo: '17:00' }
    ]
  },
  {
    id: 'd6',
    firstName: 'Zeynep',
    lastName: 'Aydın',
    licenseClass: 'D1',
    status: 'available',
    currentAssignments: [],
    availability: [
      { date: '2025-10-05', availableFrom: '09:00', availableTo: '13:00' },
      { date: '2025-10-06', availableFrom: '19:00', availableTo: '23:00' }
    ]
  },
  {
    id: 'd7',
    firstName: 'Mustafa',
    lastName: 'Özdemir',
    licenseClass: 'D',
    status: 'available',
    currentAssignments: [],
    availability: [
      { date: '2025-10-05', availableFrom: '07:00', availableTo: '15:30' },
      { date: '2025-10-06', availableFrom: '07:00', availableTo: '15:30' },
      { date: '2025-10-07', availableFrom: '07:00', availableTo: '15:30' },
      { date: '2025-10-08', availableFrom: '07:00', availableTo: '15:30' }
    ]
  },
  {
    id: 'd8',
    firstName: 'Elif',
    lastName: 'Yıldız',
    licenseClass: 'D',
    status: 'available',
    currentAssignments: [],
    availability: [
      { date: '2025-10-05', availableFrom: '06:15', availableTo: '14:15' },
      { date: '2025-10-06', availableFrom: '06:15', availableTo: '14:15' }
    ]
  },
  {
    id: 'd9',
    firstName: 'Burak',
    lastName: 'Şahin',
    licenseClass: 'D1',
    status: 'available',
    currentAssignments: [],
    availability: [
      { date: '2025-10-05', availableFrom: '08:30', availableTo: '16:30' },
      { date: '2025-10-07', availableFrom: '08:30', availableTo: '16:30' }
    ]
  },
  {
    id: 'd10',
    firstName: 'Ali',
    lastName: 'Koç',
    licenseClass: 'D',
    status: 'available',
    currentAssignments: [],
    availability: [
      { date: '2025-10-05', availableFrom: '18:00', availableTo: '02:00' },
      { date: '2025-10-06', availableFrom: '18:00', availableTo: '02:00' },
      { date: '2025-10-07', availableFrom: '18:00', availableTo: '02:00' },
      { date: '2025-10-08', availableFrom: '18:00', availableTo: '02:00' }
    ]
  },
  {
    id: 'd11',
    firstName: 'Selin',
    lastName: 'Arslan',
    licenseClass: 'D',
    status: 'available',
    currentAssignments: [],
    availability: [
      { date: '2025-10-05', availableFrom: '18:30', availableTo: '01:30' },
      { date: '2025-10-06', availableFrom: '18:30', availableTo: '01:30' }
    ]
  },
  {
    id: 'd12',
    firstName: 'Emre',
    lastName: 'Polat',
    licenseClass: 'D1',
    status: 'available',
    currentAssignments: [],
    availability: [
      { date: '2025-10-05', availableFrom: '19:00', availableTo: '03:00' },
      { date: '2025-10-07', availableFrom: '19:00', availableTo: '03:00' }
    ]
  },
  {
    id: 'd13',
    firstName: 'Deniz',
    lastName: 'Kurt',
    licenseClass: 'D',
    status: 'available',
    currentAssignments: [],
    availability: [
      { date: '2025-10-05', availableFrom: '20:00', availableTo: '04:00' },
      { date: '2025-10-06', availableFrom: '06:00', availableTo: '14:00' }
    ]
  },
  {
    id: 'd14',
    firstName: 'Cem',
    lastName: 'Yavuz',
    licenseClass: 'D',
    status: 'available',
    currentAssignments: [],
    availability: [
      { date: '2025-10-05', availableFrom: '19:30', availableTo: '02:30' },
      { date: '2025-10-06', availableFrom: '19:30', availableTo: '02:30' },
      { date: '2025-10-08', availableFrom: '19:30', availableTo: '02:30' }
    ]
  },
  {
    id: 'd15',
    firstName: 'Merve',
    lastName: 'Erdoğan',
    licenseClass: 'D1',
    status: 'available',
    currentAssignments: [],
    availability: [
      { date: '2025-10-05', availableFrom: '22:00', availableTo: '23:00' },
      { date: '2025-10-07', availableFrom: '08:00', availableTo: '16:00' }
    ]
  }
];

export const districts = [
  'Kadıköy',
  'Beşiktaş',
  'Üsküdar',
  'Şişli',
  'Bakırköy',
  'Ataşehir',
  'Beylikdüzü',
  'Maltepe',
  'Çekmeköy',
  'Sultangazi'
];

export const shifts = [
  { value: 'morning', label: 'Sabah' },
  { value: 'night', label: 'Gece' }
];


export const mockApi = {
  // Atama kaydetme (POST /assignments)
  saveAssignment(driverId, routeId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // %80 başarı oranı (optimistic update test için)
        if (Math.random() > 0.2) {
          resolve({ success: true, message: 'Atama başarılı' });
        } else {
          reject({ success: false, message: 'Atama kaydedilemedi' });
        }
      }, 800); // 800ms gecikme
    });
  },

 
  removeAssignment(driverId, routeId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Atama kaldırıldı' });
      }, 500);
    });
  }
};