import { Shoe } from './wardrobe'

export interface WeatherData {
  temperature: number // in Celsius
  condition: WeatherCondition
  humidity: number // percentage
  chanceOfRain: number // percentage
  recommendation?: WeatherRecommendation
  forecast?: HourlyForecast[]
  sunrise?: string
  sunset?: string
  windSpeed?: number // km/h
  feelsLike?: number
  uvIndex?: number
  visibility?: number // km
}

export type WeatherCondition = 
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rain'
  | 'light-rain'
  | 'heavy-rain'
  | 'snow'
  | 'fog'
  | 'thunderstorm'

export interface WeatherRecommendation {
  shoe: Shoe | RecommendedShoe
  reasoning: string
  confidence: number // percentage
  alternatives?: AlternativeRecommendation[]
  considerations?: string[]
}

export interface RecommendedShoe {
  name: string
  style: string
  color: string
  features: string[]
  matchScore: number
}

export interface AlternativeRecommendation {
  shoe: RecommendedShoe
  matchScore: number
  tradeoffs?: string[]
}

export interface HourlyForecast {
  time: string // HH:MM format
  temperature: number
  condition: WeatherCondition
  chanceOfRain: number
}

export interface WeatherPreferences {
  enableAlerts: boolean
  alertTime: string // HH:MM format
  considerCommute: boolean
  commuteTime?: {
    morning: string
    evening: string
  }
  primaryLocation?: Location
  alternativeLocations?: Location[]
}

export interface Location {
  name: string
  latitude: number
  longitude: number
  timezone: string
  isDefault: boolean
}