import { NextRequest, NextResponse } from 'next/server'

// Mock feedback storage
const feedbackDatabase: any[] = []

// POST /api/feedback/fit - Submit fit feedback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      shoeId, 
      customerId, 
      status, 
      issues = [], 
      comments = '' 
    } = body

    // Validate required fields
    if (!shoeId || !customerId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: shoeId, customerId, and status are required' },
        { status: 400 }
      )
    }

    // Validate status
    if (!['perfect', 'issues'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be "perfect" or "issues"' },
        { status: 400 }
      )
    }

    // Create feedback record
    const feedback = {
      id: `feedback_${Date.now()}`,
      shoeId,
      customerId,
      status,
      issues: status === 'issues' ? issues : [],
      comments,
      timestamp: new Date().toISOString(),
      processed: false
    }

    // In production, you would:
    // 1. Save to database
    // 2. Update shoe fit confidence score
    // 3. Notify the team
    // 4. Update customer recommendations

    feedbackDatabase.push(feedback)

    // Calculate impact on recommendations
    const impact = calculateFeedbackImpact(status, issues)

    return NextResponse.json({
      success: true,
      feedback: {
        id: feedback.id,
        status: feedback.status,
        impact
      },
      message: 'Thank you for your feedback. This helps us perfect your next pair.'
    }, { status: 201 })
  } catch (error) {
    console.error('Feedback submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}

// GET /api/feedback - Get feedback history
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customerId')
    const shoeId = searchParams.get('shoeId')

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID required' },
        { status: 400 }
      )
    }

    // Filter feedback
    let feedback = feedbackDatabase.filter(f => f.customerId === customerId)
    
    if (shoeId) {
      feedback = feedback.filter(f => f.shoeId === shoeId)
    }

    // Sort by newest first
    feedback.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    // Calculate statistics
    const stats = {
      totalFeedback: feedback.length,
      perfectFit: feedback.filter(f => f.status === 'perfect').length,
      withIssues: feedback.filter(f => f.status === 'issues').length,
      commonIssues: getCommonIssues(feedback)
    }

    return NextResponse.json({
      feedback,
      stats,
      total: feedback.length
    })
  } catch (error) {
    console.error('Feedback fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
}

// PUT /api/feedback/[feedbackId] - Update feedback
export async function PUT(
  request: NextRequest,
  { params }: { params: { feedbackId: string } }
) {
  try {
    const body = await request.json()
    const { feedbackId } = params
    const { comments, issues } = body

    // Find feedback
    const feedbackIndex = feedbackDatabase.findIndex(f => f.id === feedbackId)
    
    if (feedbackIndex === -1) {
      return NextResponse.json(
        { error: 'Feedback not found' },
        { status: 404 }
      )
    }

    // Update feedback
    feedbackDatabase[feedbackIndex] = {
      ...feedbackDatabase[feedbackIndex],
      comments: comments || feedbackDatabase[feedbackIndex].comments,
      issues: issues || feedbackDatabase[feedbackIndex].issues,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      feedback: feedbackDatabase[feedbackIndex],
      message: 'Feedback updated successfully'
    })
  } catch (error) {
    console.error('Feedback update error:', error)
    return NextResponse.json(
      { error: 'Failed to update feedback' },
      { status: 500 }
    )
  }
}

// Helper functions
function calculateFeedbackImpact(status: string, issues: string[]) {
  if (status === 'perfect') {
    return {
      fitConfidenceChange: '+2%',
      recommendationImpact: 'Strengthens current fit profile',
      nextPairImprovement: 'Maintains successful pattern'
    }
  }

  // Analyze issues for impact
  const impactMap: Record<string, string> = {
    'tight-toe': 'Toe box will be adjusted +3mm',
    'loose-heel': 'Heel counter will be reinforced',
    'arch-support': 'Arch profile will be enhanced',
    'width': 'Width measurements will be recalibrated',
    'pressure-points': 'Pressure mapping will be refined'
  }

  const improvements = issues
    .map(issue => impactMap[issue] || 'Pattern will be adjusted')
    .slice(0, 3)

  return {
    fitConfidenceChange: '-5%',
    recommendationImpact: 'Adjusting recommendations based on feedback',
    nextPairImprovement: improvements.join(', ')
  }
}

function getCommonIssues(feedback: any[]) {
  const issueCount: Record<string, number> = {}
  
  feedback.forEach(f => {
    if (f.status === 'issues' && f.issues) {
      f.issues.forEach((issue: string) => {
        issueCount[issue] = (issueCount[issue] || 0) + 1
      })
    }
  })

  return Object.entries(issueCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([issue, count]) => ({ issue, count }))
}