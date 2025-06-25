export const APP_NAME = 'Arthur Sleep Portal'

export const COMPANY_INFO = {
  name: 'Arthur Sleep',
  tagline: 'Bespoke Luxury Footwear',
  address: {
    street: '124 Mount Street Mews',
    area: 'Mayfair',
    city: 'London',
    postcode: 'W1K 3NR',
    country: 'United Kingdom'
  },
  contact: {
    phone: '+44 208 123 6619',
    email: 'hello@arthursleep.com',
    whatsapp: '+44 7700 900123'
  },
  hours: {
    weekday: '10:00 - 18:00',
    saturday: '10:00 - 17:00',
    sunday: 'By appointment only'
  }
}

export const PRODUCTION_STAGES = [
  'Pattern Creation',
  'Leather Selection', 
  'Cutting',
  'Upper Stitching',
  'Lasting',
  'Sole Attachment',
  'Finishing',
  'Quality Check'
]

export const SHOE_OCCASIONS = [
  'work',
  'weekend',
  'evening',
  'travel'
] as const

export const SHOE_CONDITIONS = [
  'excellent',
  'good',
  'fair',
  'needs-attention'
] as const

export const WEATHER_CONDITIONS = [
  'dry',
  'rain',
  'cold',
  'warm',
  'mild',
  'all'
] as const

export const PRIORITY_LEVELS = [
  'high',
  'medium',
  'low'
] as const

export const MESSAGE_TYPES = [
  'text',
  'voice',
  'image'
] as const

export const RESPONSE_TIMES = {
  rebecca: '2 hours',
  david: '4 hours',
  simon: '3 hours'
}

export const PRICE_RANGES = {
  standard: 'From £2,350',
  premium: 'From £2,850',
  luxury: 'From £3,200',
  exceptional: 'From £3,500'
}

export const FIT_CONFIDENCE_THRESHOLDS = {
  excellent: 95,
  good: 85,
  fair: 75,
  poor: 0
}

export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500
}

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280
}