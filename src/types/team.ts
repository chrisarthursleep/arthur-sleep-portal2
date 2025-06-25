export interface TeamMember {
  id: string
  name: string
  role: string
  specialty: string
  avatar?: string
  bio: string
  stats: TeamMemberStats
  expertise: string[]
  personalNote?: string
  responseTime: string
  available: boolean
  contact?: TeamMemberContact
  schedule?: TeamMemberSchedule
  languages?: string[]
  certifications?: Certification[]
}

export interface TeamMemberStats {
  pairsMade: number
  yearsExperience: number
  customerRating: number
  specialtyCount?: Record<string, number>
  averageProductionTime?: number // in days
  perfectFitRate?: number // percentage
}

export interface TeamMemberContact {
  email?: string
  phone?: string
  preferredMethod: 'portal' | 'email' | 'phone' | 'whatsapp'
  availability: {
    monday: TimeSlot[]
    tuesday: TimeSlot[]
    wednesday: TimeSlot[]
    thursday: TimeSlot[]
    friday: TimeSlot[]
    saturday: TimeSlot[]
    sunday: TimeSlot[]
  }
}

export interface TimeSlot {
  start: string // HH:MM format
  end: string
  type: 'available' | 'appointment-only' | 'busy'
}

export interface TeamMemberSchedule {
  regularHours: WorkingHours
  holidays: Holiday[]
  busyPeriods: BusyPeriod[]
  nextAvailable: Date
}

export interface WorkingHours {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
}

export interface DaySchedule {
  isWorkingDay: boolean
  openTime?: string
  closeTime?: string
  breakTime?: {
    start: string
    end: string
  }
}

export interface Holiday {
  startDate: Date
  endDate: Date
  reason?: string
  coveringTeamMember?: string
}

export interface BusyPeriod {
  date: Date
  startTime: string
  endTime: string
  reason: 'appointment' | 'production' | 'meeting' | 'training'
  clientId?: string
}

export interface Certification {
  name: string
  issuer: string
  date: Date
  expiryDate?: Date
  credentialId?: string
}

export interface TeamMessage {
  id: string
  from: string // team member ID
  to: string // customer ID
  content: string
  type: 'text' | 'voice' | 'image'
  timestamp: Date
  read: boolean
  duration?: number // for voice messages in seconds
  attachments?: MessageAttachment[]
  relatedOrder?: string
}

export interface MessageAttachment {
  type: 'image' | 'document' | 'audio'
  url: string
  filename: string
  size: number // in bytes
  mimeType: string
}