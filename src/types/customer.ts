export interface Customer {
  id: string
  name: string
  initials: string
  email: string
  phone: string
  memberSince: Date
  totalPairs: number
  yearsAsMember: number
  averageFitConfidence: number
  preferences: CustomerPreferences
  measurements?: CustomerMeasurements
  address?: CustomerAddress
  membershipTier?: 'standard' | 'premium' | 'vip'
}

export interface CustomerPreferences {
  style: string[]
  occasions: string[]
  weatherAlerts: boolean
  communicationPreference?: 'email' | 'phone' | 'whatsapp'
  language?: 'en-GB' | 'en-US'
  currency?: 'GBP' | 'EUR' | 'USD'
}

export interface CustomerMeasurements {
  leftFoot: FootMeasurement
  rightFoot: FootMeasurement
  lastUpdated: Date
  scanHistory: ScanRecord[]
}

export interface FootMeasurement {
  length: number // in mm
  width: number
  instep: number
  heelWidth: number
  toeBoxHeight: number
  archType: 'low' | 'normal' | 'high'
  notes?: string
}

export interface ScanRecord {
  id: string
  date: Date
  type: '3D-scan' | 'manual' | 'photo'
  technician: string
  notes?: string
  confidence: number
}

export interface CustomerAddress {
  line1: string
  line2?: string
  city: string
  county?: string
  postcode: string
  country: string
  isDefault: boolean
  label?: 'home' | 'work' | 'other'
}