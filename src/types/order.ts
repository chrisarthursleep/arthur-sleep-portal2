export interface Order {
  id: string
  customerId: string
  status: OrderStatus
  productName: string
  style: string
  progress: number
  daysRemaining: number
  currentStage: ProductionStage
  stages: ProductionStage[]
  estimatedCompletion: Date
  fitConfidence: number
  pricing?: OrderPricing
  specifications?: OrderSpecifications
  timeline?: OrderTimeline
  createdAt?: Date
  updatedAt?: Date
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'in-production'
  | 'quality-check'
  | 'completed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export interface ProductionStage {
  id: string
  name: string
  status: StageStatus
  craftsperson: string
  message?: string
  completedDate?: Date
  estimatedDate?: Date
  progress?: number
  duration?: number // in hours
  notes?: string
  images?: string[]
}

export type StageStatus = 'completed' | 'current' | 'upcoming' | 'blocked'

export interface OrderPricing {
  basePrice: number
  customisations: PriceCustomisation[]
  materials: MaterialCost[]
  subtotal: number
  vat: number
  total: number
  currency: string
  deposit?: DepositRecord
}

export interface PriceCustomisation {
  type: string
  description: string
  cost: number
}

export interface MaterialCost {
  material: string
  quantity: number
  unitCost: number
  totalCost: number
}

export interface DepositRecord {
  amount: number
  paid: boolean
  paidDate?: Date
  method?: 'card' | 'bank-transfer' | 'cash'
}

export interface OrderSpecifications {
  style: string
  size: {
    uk: number
    eu: number
    us: number
  }
  color: string
  material: string
  construction: string
  sole: string
  personalisation?: Personalisation
  specialRequests?: string[]
}

export interface Personalisation {
  monogram?: string
  lining?: string
  insoleText?: string
  packaging?: 'standard' | 'gift' | 'premium'
}

export interface OrderTimeline {
  orderDate: Date
  confirmationDate?: Date
  productionStartDate?: Date
  estimatedCompletionDate: Date
  actualCompletionDate?: Date
  shippedDate?: Date
  deliveredDate?: Date
  milestones: TimelineMilestone[]
}

export interface TimelineMilestone {
  date: Date
  event: string
  description?: string
  celebrated?: boolean
}