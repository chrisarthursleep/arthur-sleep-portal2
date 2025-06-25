interface OrderHistory {
  id: string
  productName: string
  style: string
  deliveredDate: Date
  fitConfidence: number
}

export const orderHistory: OrderHistory[] = [
  {
    id: 'order_AS2023_008',
    productName: 'The Summer',
    style: 'Penny Loafer',
    deliveredDate: new Date('2023-08-15'),
    fitConfidence: 85
  },
  {
    id: 'order_AS2023_007',
    productName: 'The Traveller',
    style: 'Derby',
    deliveredDate: new Date('2023-05-10'),
    fitConfidence: 90
  },
  {
    id: 'order_AS2023_006',
    productName: 'The Belgravia',
    style: 'Whole Cut',
    deliveredDate: new Date('2023-02-20'),
    fitConfidence: 98
  },
  {
    id: 'order_AS2022_005',
    productName: 'The City',
    style: 'Oxford Brogue',
    deliveredDate: new Date('2022-12-10'),
    fitConfidence: 95
  }
]