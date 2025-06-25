import { NextRequest, NextResponse } from 'next/server'

// Mock order data for development
const mockOrders = [
  {
    id: 'order_AS2024_001',
    customerId: 'cust_001',
    status: 'in-production',
    productName: 'The Westminster',
    style: 'Oxford Cap-Toe',
    color: 'Black',
    material: 'Box Calf Leather',
    progress: 72,
    daysRemaining: 5,
    currentStage: {
      id: 'stage_4',
      name: 'Upper Stitching',
      status: 'current',
      craftsperson: 'David Chen',
      message: 'Precision hand-stitching the upper leather. The grain is exceptional.',
      estimatedDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 72
    },
    estimatedCompletion: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    fitConfidence: 98,
    price: 2850,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  }
]

// GET /api/orders - Get all orders for a customer
// GET /api/orders/[orderId] - Get specific order
export async function GET(
  request: NextRequest,
  { params }: { params?: { orderId?: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customerId')
    const orderId = params?.orderId

    // Get specific order
    if (orderId) {
      const order = mockOrders.find(o => o.id === orderId)
      if (!order) {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ order })
    }

    // Get all orders for customer
    if (customerId) {
      const customerOrders = mockOrders.filter(o => o.customerId === customerId)
      return NextResponse.json({ 
        orders: customerOrders,
        total: customerOrders.length 
      })
    }

    return NextResponse.json(
      { error: 'Customer ID required' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Orders API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      customerId, 
      productName, 
      style, 
      color, 
      material,
      occasion,
      timeline 
    } = body

    // Validate required fields
    if (!customerId || !style) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // In production, you would:
    // 1. Validate customer exists
    // 2. Create order in database
    // 3. Initialize production workflow
    // 4. Send confirmation email

    const newOrder = {
      id: `order_AS${new Date().getFullYear()}_${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      customerId,
      productName: productName || 'Custom Order',
      style,
      color,
      material,
      status: 'pending',
      progress: 0,
      occasion,
      timeline,
      createdAt: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
    }

    return NextResponse.json({
      success: true,
      order: newOrder,
      message: 'Order created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

// PUT /api/orders/[orderId] - Update order
export async function PUT(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const body = await request.json()
    const { orderId } = params

    // In production, validate order exists and user has permission

    return NextResponse.json({
      success: true,
      message: 'Order updated successfully',
      orderId
    })
  } catch (error) {
    console.error('Update order error:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}