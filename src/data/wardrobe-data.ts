import { Shoe, LifeCoverage } from '@/types/wardrobe'

export const wardrobeData: Shoe[] = [
  {
    id: 'shoe_001',
    name: 'The Mayfair',
    style: 'Oxford Cap-Toe',
    color: 'Black',
    material: 'Box Calf Leather',
    purchaseDate: new Date('2021-03-15'),
    wearCount: 145,
    fitConfidence: 96,
    condition: 'excellent',
    occasions: ['work', 'evening'],
    weather: ['dry', 'mild'],
    lastWorn: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    notes: 'Perfect for board meetings and formal events'
  },
  {
    id: 'shoe_002',
    name: 'The Chelsea',
    style: 'Chelsea Boot',
    color: 'Chocolate',
    material: 'Suede',
    purchaseDate: new Date('2021-09-20'),
    wearCount: 89,
    fitConfidence: 94,
    condition: 'excellent',
    occasions: ['work', 'weekend'],
    weather: ['rain', 'cold'],
    lastWorn: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    notes: 'Water-resistant treatment applied'
  },
  {
    id: 'shoe_003',
    name: 'The St James',
    style: 'Monk Strap',
    color: 'Burgundy',
    material: 'Cordovan',
    purchaseDate: new Date('2022-02-10'),
    wearCount: 62,
    fitConfidence: 92,
    condition: 'good',
    occasions: ['work', 'evening'],
    weather: ['dry'],
    lastWorn: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    notes: 'Develops beautiful patina with wear'
  },
  {
    id: 'shoe_004',
    name: 'The Weekend',
    style: 'Loafer',
    color: 'Navy',
    material: 'Suede',
    purchaseDate: new Date('2022-06-15'),
    wearCount: 103,
    fitConfidence: 88,
    condition: 'good',
    occasions: ['weekend', 'travel'],
    weather: ['dry', 'warm'],
    lastWorn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    notes: 'Incredibly comfortable for all-day wear'
  },
  {
    id: 'shoe_005',
    name: 'The City',
    style: 'Oxford Brogue',
    color: 'Tan',
    material: 'Grain Leather',
    purchaseDate: new Date('2022-11-20'),
    wearCount: 76,
    fitConfidence: 95,
    condition: 'excellent',
    occasions: ['work', 'weekend'],
    weather: ['dry', 'mild'],
    lastWorn: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    notes: 'Versatile for smart-casual occasions'
  },
  {
    id: 'shoe_006',
    name: 'The Belgravia',
    style: 'Whole Cut',
    color: 'Black',
    material: 'Patent Leather',
    purchaseDate: new Date('2023-01-30'),
    wearCount: 12,
    fitConfidence: 98,
    condition: 'excellent',
    occasions: ['evening'],
    weather: ['dry'],
    lastWorn: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    notes: 'Reserved for black-tie events'
  },
  {
    id: 'shoe_007',
    name: 'The Traveller',
    style: 'Derby',
    color: 'Brown',
    material: 'Pebble Grain',
    purchaseDate: new Date('2023-04-15'),
    wearCount: 45,
    fitConfidence: 90,
    condition: 'good',
    occasions: ['travel', 'weekend'],
    weather: ['all'],
    lastWorn: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    notes: 'Durable construction for frequent travel'
  },
  {
    id: 'shoe_008',
    name: 'The Summer',
    style: 'Penny Loafer',
    color: 'Cognac',
    material: 'Calfskin',
    purchaseDate: new Date('2023-07-20'),
    wearCount: 28,
    fitConfidence: 85,
    condition: 'fair',
    occasions: ['weekend', 'travel'],
    weather: ['warm', 'dry'],
    lastWorn: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    notes: 'Slight stretching in heel area'
  }
]

export const lifeCoverageData: LifeCoverage[] = [
  {
    category: 'work',
    percentage: 60,
    gaps: [
      {
        category: 'work',
        priority: 'high',
        style: 'Double Monk Strap in Black',
        reasoning: 'You have excellent formal options but lack a sophisticated slip-on style for quick changes between meetings. This would complement your Oxford collection perfectly.',
        price: 'From £2,850',
        coverage: 15
      },
      {
        category: 'work',
        priority: 'medium',
        style: 'Wholecut Oxford in Deep Brown',
        reasoning: 'A sleek, minimalist option for modern business settings. Would pair beautifully with your navy suits.',
        price: 'From £3,200',
        coverage: 10
      }
    ]
  },
  {
    category: 'weekend',
    percentage: 50,
    gaps: [
      {
        category: 'weekend',
        priority: 'high',
        style: 'Casual Derby in White Leather',
        reasoning: 'Your weekend collection lacks a light-colored option for spring/summer casual wear. Perfect with chinos or jeans.',
        price: 'From £2,650',
        coverage: 20
      },
      {
        category: 'weekend',
        priority: 'medium',
        style: 'Driving Loafer in Racing Green',
        reasoning: 'A playful yet sophisticated option for countryside weekends and casual Fridays.',
        price: 'From £2,450',
        coverage: 15
      }
    ]
  },
  {
    category: 'evening',
    percentage: 33,
    gaps: [
      {
        category: 'evening',
        priority: 'high',
        style: 'Opera Pump in Velvet',
        reasoning: 'For those special occasions requiring something beyond patent leather. A true statement piece.',
        price: 'From £3,500',
        coverage: 30
      },
      {
        category: 'evening',
        priority: 'low',
        style: 'Tassel Loafer in Burgundy',
        reasoning: 'A sophisticated option for smart-casual evening events where full formal might be too much.',
        price: 'From £2,750',
        coverage: 20
      }
    ]
  },
  {
    category: 'travel',
    percentage: 33,
    gaps: [
      {
        category: 'travel',
        priority: 'high',
        style: 'Slip-On Sneaker in Leather',
        reasoning: 'For airport security and long-haul comfort without sacrificing style. Our most cushioned sole option.',
        price: 'From £2,350',
        coverage: 35
      }
    ]
  }
]