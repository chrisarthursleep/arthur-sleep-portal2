import { Customer } from '@/types/customer'
import { Order } from '@/types/order'

export const customerData: Customer = {
  id: 'cust_001',
  name: 'James',
  initials: 'JW',
  email: 'james.wilson@example.com',
  phone: '+44 7700 900123',
  memberSince: new Date('2020-03-15'),
  totalPairs: 12,
  yearsAsMember: 4,
  averageFitConfidence: 84,
  preferences: {
    style: ['Oxford', 'Chelsea', 'Loafer'],
    occasions: ['Business', 'Evening', 'Weekend'],
    weatherAlerts: true
  }
}

export const currentOrder: Order = {
  id: 'order_AS2024_001',
  customerId: 'cust_001',
  status: 'in-production',
  productName: 'The Westminster',
  style: 'Oxford Cap-Toe',
  progress: 72,
  daysRemaining: 5,
  currentStage: {
    id: 'stage_4',
    name: 'Upper Stitching',
    status: 'current',
    craftsperson: 'David Chen',
    message: 'Precision hand-stitching the upper leather. The grain is exceptional.',
    estimatedDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    progress: 72
  },
  stages: [
    {
      id: 'stage_1',
      name: 'Pattern Creation',
      status: 'completed',
      craftsperson: 'Rebecca Thompson',
      completedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'stage_2',
      name: 'Leather Selection',
      status: 'completed',
      craftsperson: 'Rebecca Thompson',
      completedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'stage_3',
      name: 'Cutting',
      status: 'completed',
      craftsperson: 'Simon Martinez',
      completedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'stage_4',
      name: 'Upper Stitching',
      status: 'current',
      craftsperson: 'David Chen',
      estimatedDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      progress: 72
    },
    {
      id: 'stage_5',
      name: 'Lasting',
      status: 'upcoming',
      craftsperson: 'David Chen',
      estimatedDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'stage_6',
      name: 'Sole Attachment',
      status: 'upcoming',
      craftsperson: 'Simon Martinez',
      estimatedDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'stage_7',
      name: 'Finishing',
      status: 'upcoming',
      craftsperson: 'David Chen',
      estimatedDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'stage_8',
      name: 'Quality Check',
      status: 'upcoming',
      craftsperson: 'Rebecca Thompson',
      estimatedDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }
  ],
  estimatedCompletion: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  fitConfidence: 98
}