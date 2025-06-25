import { TeamMember } from '@/types/team'

export const teamData: TeamMember[] = [
  {
    id: 'rebecca',
    name: 'Rebecca Thompson',
    role: 'Pattern Maker',
    specialty: 'Bespoke Fitting Expert',
    bio: 'With over 15 years of experience in bespoke shoemaking, Rebecca has developed an intuitive understanding of foot anatomy and personal style. She trained at Cordwainers College and has worked with some of London\'s most prestigious shoemakers before joining Arthur Sleep. Her expertise in translating measurements into perfect-fitting patterns is unmatched.',
    stats: {
      pairsMade: 847,
      yearsExperience: 15,
      customerRating: 4.9
    },
    expertise: [
      'Pattern Development',
      'Fit Analysis',
      'Style Consultation',
      'Material Selection',
      'Custom Modifications'
    ],
    personalNote: 'I remember your preference for a slightly wider toe box - I\'ve incorporated that into all your recent patterns. Looking forward to perfecting your next pair!',
    responseTime: '2 hours',
    available: true
  },
  {
    id: 'david',
    name: 'David Chen',
    role: 'Master Craftsman',
    specialty: 'Hand-Stitching Specialist',
    bio: 'David brings 20 years of traditional shoemaking expertise from his family\'s workshop in Florence. His meticulous attention to detail and mastery of hand-stitching techniques ensure every pair meets the highest standards. He specialises in working with exotic leathers and complex constructions.',
    stats: {
      pairsMade: 1243,
      yearsExperience: 20,
      customerRating: 4.9
    },
    expertise: [
      'Hand-Stitching',
      'Leather Working',
      'Construction Techniques',
      'Quality Control',
      'Exotic Materials'
    ],
    personalNote: 'The suede you selected for your current order is exceptional - some of the finest I\'ve worked with this year.',
    responseTime: '4 hours',
    available: true
  },
  {
    id: 'simon',
    name: 'Simon Martinez',
    role: 'Finishing Expert',
    specialty: 'Patina & Polish Master',
    bio: 'Simon\'s artistic background gives him a unique perspective on shoe finishing. Trained in Paris and Milan, he has developed signature techniques for creating depth and character in leather patinas. His work transforms each pair into a unique piece of wearable art.',
    stats: {
      pairsMade: 692,
      yearsExperience: 12,
      customerRating: 5.0
    },
    expertise: [
      'Patina Application',
      'Colour Matching',
      'Polishing Techniques',
      'Edge Finishing',
      'Restoration'
    ],
    personalNote: 'I\'ve been experimenting with a new burnishing technique that would work beautifully with your style preferences.',
    responseTime: '3 hours',
    available: false
  }
]