export interface Shoe {
  id: string
  name: string
  style: string
  color: string
  material: string
  image?: string
  purchaseDate: Date
  wearCount: number
  fitConfidence: number
  condition: ShoeCondition
  occasions: string[]
  weather: string[]
  lastWorn?: Date
  notes?: string
  orderId?: string
  care?: CareRecord[]
  photos?: ShoePhoto[]
  measurements?: ShoeMeasurements
}

export type ShoeCondition = 'excellent' | 'good' | 'fair' | 'needs-attention'

export interface CareRecord {
  date: Date
  type: 'cleaning' | 'polishing' | 'repair' | 'resole' | 'refurbishment'
  description: string
  performedBy: string
  cost?: number
  nextRecommendedDate?: Date
  beforePhotos?: string[]
  afterPhotos?: string[]
}

export interface ShoePhoto {
  url: string
  type: 'profile' | 'top' | 'sole' | 'detail' | 'worn'
  date: Date
  caption?: string
}

export interface ShoeMeasurements {
  lastUsed: string
  internalLength: number
  internalWidth: number
  heelHeight: number
  soleThickness: number
  weight: number // in grams
}

export interface WardrobeGap {
  category: string
  priority: GapPriority
  style: string
  reasoning: string
  price: string
  coverage: number
  recommendations?: ShoeRecommendation[]
  occasions?: string[]
  estimatedUsage?: number // times per month
}

export type GapPriority = 'high' | 'medium' | 'low'

export interface ShoeRecommendation {
  style: string
  material: string
  color: string
  features: string[]
  priceRange: string
  leadTime: string
  matchScore: number
  reasoning: string
}

export interface LifeCoverage {
  category: LifeCategory
  percentage: number
  gaps: WardrobeGap[]
  strongAreas?: string[]
  recommendations?: string[]
}

export type LifeCategory = 'work' | 'weekend' | 'evening' | 'travel'

export interface WardrobeAnalytics {
  totalPairs: number
  averageFitConfidence: number
  coverageByCategory: Record<LifeCategory, number>
  wearDistribution: WearPattern[]
  seasonalCoverage: SeasonalAnalysis
  valueMetrics: ValueAnalysis
}

export interface WearPattern {
  shoeId: string
  shoeName: string
  wearFrequency: number // times per month
  lastWorn: Date
  favoriteOccasions: string[]
  seasonalPreference?: Season[]
}

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export interface SeasonalAnalysis {
  spring: SeasonCoverage
  summer: SeasonCoverage
  autumn: SeasonCoverage
  winter: SeasonCoverage
}

export interface SeasonCoverage {
  coverage: number // percentage
  suitableShoes: string[] // shoe IDs
  gaps: string[] // style suggestions
}

export interface ValueAnalysis {
  totalInvestment: number
  costPerWear: Record<string, number> // shoe ID to cost
  bestValue: string[] // top 3 shoe IDs by cost per wear
  maintenanceCosts: number
  projectedLifespan: Record<string, number> // shoe ID to years
}

export interface WardrobeRecommendation {
  type: 'gap-fill' | 'replacement' | 'upgrade' | 'seasonal'
  priority: number // 1-10
  suggestion: ShoeRecommendation
  impact: {
    coverageIncrease: number
    versatilityScore: number
    occasions: string[]
  }
  timing: 'immediate' | 'next-3-months' | 'next-6-months' | 'next-year'
}