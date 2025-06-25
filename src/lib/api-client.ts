const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          error: data.message || 'An error occurred',
          status: response.status,
        }
      }

      return {
        data,
        status: response.status,
      }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
        status: 0,
      }
    }
  }

  // Customer endpoints
  async getCustomer(customerId: string) {
    return this.request(`/api/customers/${customerId}`)
  }

  async updateCustomer(customerId: string, data: any) {
    return this.request(`/api/customers/${customerId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Order endpoints
  async getOrders(customerId: string) {
    return this.request(`/api/customers/${customerId}/orders`)
  }

  async getOrder(orderId: string) {
    return this.request(`/api/orders/${orderId}`)
  }

  async createOrder(data: any) {
    return this.request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Message endpoints
  async sendMessage(data: {
    from: string
    to: string
    content: string
    type: 'text' | 'voice' | 'image'
  }) {
    return this.request('/api/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getMessages(customerId: string) {
    return this.request(`/api/customers/${customerId}/messages`)
  }

  // Appointment endpoints
  async bookAppointment(data: {
    customerId: string
    type: string
    date: string
    time: string
  }) {
    return this.request('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getAvailableSlots(type: string, date: string) {
    return this.request(`/api/appointments/availability?type=${type}&date=${date}`)
  }

  // Feedback endpoints
  async submitFitFeedback(data: {
    shoeId: string
    customerId: string
    status: 'perfect' | 'issues'
    issues?: string[]
    comments?: string
  }) {
    return this.request('/api/feedback/fit', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Weather endpoint
  async getWeatherRecommendation(customerId: string) {
    return this.request(`/api/weather/recommendation/${customerId}`)
  }

  // Production slot endpoints
  async reserveProductionSlot(data: {
    customerId: string
    purpose: 'personal' | 'gift'
    occasion: string
    timeline: string
  }) {
    return this.request('/api/production-slots', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Upload endpoints
  async uploadInspiration(formData: FormData) {
    return this.request('/api/upload/inspiration', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData
      },
    })
  }
}

export const apiClient = new ApiClient()

// Mock implementations for development
export const mockApi = {
  async getWeather() {
    return {
      temperature: 16,
      condition: 'light-rain',
      humidity: 75,
      chanceOfRain: 60,
    }
  },

  async getRecommendation() {
    return {
      shoe: {
        name: 'The Belgrave',
        style: 'Chelsea Boot',
        color: 'Chocolate Suede',
        features: ['Water-resistant', 'All-day comfort'],
      },
      matchScore: 96,
      reasoning: "Perfect for today's weather with your Savile Row meetings.",
    }
  },

  async getLiveProgress() {
    return {
      stage: 'Upper Stitching',
      craftsperson: 'David Chen',
      progress: 72,
      updates: [
        {
          time: 'Just now',
          message: 'Precision stitching in progress - 2mm adjustments',
        },
        {
          time: '15 mins ago',
          message: 'Completed morning inspection',
        },
      ],
    }
  },
}