import { NextRequest, NextResponse } from 'next/server'

// Mock messages for development
const mockMessages = [
  {
    id: 'msg_001',
    from: 'rebecca',
    to: 'cust_001',
    content: 'Good morning! I\'ve selected the perfect leather for your Westminster oxfords. The grain pattern is exceptional - would you like to see photos?',
    type: 'text',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: true
  },
  {
    id: 'msg_002',
    from: 'cust_001',
    to: 'rebecca',
    content: 'Yes please! I\'d love to see the leather options.',
    type: 'text',
    timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    read: true
  },
  {
    id: 'msg_003',
    from: 'david',
    to: 'cust_001',
    content: 'Started work on your uppers this morning. The precision stitching is coming along beautifully.',
    type: 'text',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false
  }
]

// GET /api/messages - Get messages for a customer
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customerId')
    const unreadOnly = searchParams.get('unread') === 'true'

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID required' },
        { status: 400 }
      )
    }

    // Filter messages for this customer
    let messages = mockMessages.filter(
      msg => msg.to === customerId || msg.from === customerId
    )

    if (unreadOnly) {
      messages = messages.filter(msg => !msg.read && msg.to === customerId)
    }

    // Sort by timestamp (newest first)
    messages.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    return NextResponse.json({
      messages,
      total: messages.length,
      unread: messages.filter(m => !m.read && m.to === customerId).length
    })
  } catch (error) {
    console.error('Messages API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

// POST /api/messages - Send a new message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { from, to, content, type = 'text', audioData } = body

    // Validate required fields
    if (!from || !to || (!content && !audioData)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Handle voice messages
    let processedContent = content
    let duration = undefined

    if (type === 'voice' && audioData) {
      // In production, you would:
      // 1. Upload audio to storage (S3, Cloudinary, etc.)
      // 2. Get audio duration
      // 3. Store URL reference
      processedContent = '[Voice message]'
      duration = Math.floor(Math.random() * 60) + 10 // Mock duration
    }

    const newMessage = {
      id: `msg_${Date.now()}`,
      from,
      to,
      content: processedContent,
      type,
      duration,
      timestamp: new Date().toISOString(),
      read: false
    }

    // In production, you would:
    // 1. Save to database
    // 2. Send notification to recipient
    // 3. Trigger real-time update via WebSocket

    // Simulate response time
    const responseTime = {
      rebecca: '2 hours',
      david: '4 hours',
      simon: '3 hours'
    }

    return NextResponse.json({
      success: true,
      message: newMessage,
      expectedResponse: responseTime[to as keyof typeof responseTime] || '24 hours'
    }, { status: 201 })
  } catch (error) {
    console.error('Send message error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

// PUT /api/messages/[messageId] - Mark message as read
export async function PUT(
  request: NextRequest,
  { params }: { params: { messageId: string } }
) {
  try {
    const { messageId } = params
    const body = await request.json()
    const { read = true } = body

    // In production, validate message exists and user has permission

    return NextResponse.json({
      success: true,
      messageId,
      read
    })
  } catch (error) {
    console.error('Update message error:', error)
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    )
  }
}

// DELETE /api/messages/[messageId] - Delete a message
export async function DELETE(
  request: NextRequest,
  { params }: { params: { messageId: string } }
) {
  try {
    const { messageId } = params

    // In production, validate message exists and user has permission

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully'
    })
  } catch (error) {
    console.error('Delete message error:', error)
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    )
  }
}