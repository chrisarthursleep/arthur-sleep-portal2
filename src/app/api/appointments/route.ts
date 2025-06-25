import { NextRequest, NextResponse } from 'next/server'

// Mock appointments database
const appointments: any[] = []

// Mock availability slots
const generateAvailableSlots = (date: string, serviceType: string) => {
  const baseSlots = [
    '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30'
  ]
  
  // Simulate some slots being taken
  const bookedSlots = ['11:00', '14:30', '15:00']
  
  return baseSlots
    .filter(slot => !bookedSlots.includes(slot))
    .map(slot => ({
      time: slot,
      available: true,
      duration: serviceType === 'consultation' ? 45 : 30
    }))
}

// GET /api/appointments - Get appointments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customerId')
    const upcoming = searchParams.get('upcoming') === 'true'
    
    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID required' },
        { status: 400 }
      )
    }

    // Filter appointments
    let customerAppointments = appointments.filter(
      apt => apt.customerId === customerId
    )

    if (upcoming) {
      const now = new Date()
      customerAppointments = customerAppointments.filter(
        apt => new Date(apt.datetime) > now
      )
    }

    // Sort by date (upcoming first)
    customerAppointments.sort((a, b) => 
      new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    )

    return NextResponse.json({
      appointments: customerAppointments,
      total: customerAppointments.length
    })
  } catch (error) {
    console.error('Appointments fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}

// GET /api/appointments/availability - Check available slots
export async function GET_AVAILABILITY(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const date = searchParams.get('date')

    if (!type || !date) {
      return NextResponse.json(
        { error: 'Service type and date required' },
        { status: 400 }
      )
    }

    // Validate service type
    const validTypes = ['scan', 'consultation', 'fitting']
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid service type' },
        { status: 400 }
      )
    }

    // Generate available slots
    const slots = generateAvailableSlots(date, type)

    // Get service details
    const serviceDetails = {
      scan: {
        duration: '30 minutes',
        location: 'Mount Street Atelier',
        description: '3D foot scanning for perfect fit'
      },
      consultation: {
        duration: '45 minutes',
        location: 'Mount Street Atelier',
        description: 'Style consultation with your specialist'
      },
      fitting: {
        duration: '30 minutes',
        location: 'Mount Street Atelier',
        description: 'Try on and adjust your new shoes'
      }
    }

    return NextResponse.json({
      date,
      type,
      service: serviceDetails[type as keyof typeof serviceDetails],
      slots,
      nextAvailable: slots[0]?.time || null
    })
  } catch (error) {
    console.error('Availability check error:', error)
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    )
  }
}

// POST /api/appointments - Book appointment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      customerId, 
      type, 
      date, 
      time,
      notes = '',
      teamMember = 'rebecca' 
    } = body

    // Validate required fields
    if (!customerId || !type || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if slot is still available
    const existingAppointment = appointments.find(
      apt => apt.date === date && apt.time === time
    )
    
    if (existingAppointment) {
      return NextResponse.json(
        { error: 'This slot is no longer available' },
        { status: 409 }
      )
    }

    // Create appointment
    const appointment = {
      id: `apt_${Date.now()}`,
      customerId,
      type,
      date,
      time,
      datetime: new Date(`${date}T${time}:00`).toISOString(),
      teamMember,
      notes,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      reminder: {
        email: true,
        sms: true,
        daysBefore: 1
      }
    }

    appointments.push(appointment)

    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Add to calendar
    // 4. Set up reminders

    // Generate confirmation details
    const confirmationDetails = {
      appointment,
      location: {
        name: 'Arthur Sleep Atelier',
        address: '42 Mount Street, Mayfair, London W1K 2RN',
        phone: '+44 20 7123 4567',
        directions: 'https://maps.google.com/?q=42+Mount+Street+Mayfair+London'
      },
      preparation: getPreparationInstructions(type),
      cancellationPolicy: 'Please provide 24 hours notice for cancellations'
    }

    return NextResponse.json({
      success: true,
      ...confirmationDetails,
      message: 'Appointment confirmed. Confirmation email sent.'
    }, { status: 201 })
  } catch (error) {
    console.error('Appointment booking error:', error)
    return NextResponse.json(
      { error: 'Failed to book appointment' },
      { status: 500 }
    )
  }
}

// PUT /api/appointments/[appointmentId] - Update appointment
export async function PUT(
  request: NextRequest,
  { params }: { params: { appointmentId: string } }
) {
  try {
    const body = await request.json()
    const { appointmentId } = params
    const { date, time, notes, status } = body

    // Find appointment
    const appointmentIndex = appointments.findIndex(
      apt => apt.id === appointmentId
    )
    
    if (appointmentIndex === -1) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      )
    }

    // Update appointment
    if (date || time) {
      // Check new slot availability
      const newDateTime = new Date(
        `${date || appointments[appointmentIndex].date}T${time || appointments[appointmentIndex].time}:00`
      ).toISOString()

      appointments[appointmentIndex] = {
        ...appointments[appointmentIndex],
        date: date || appointments[appointmentIndex].date,
        time: time || appointments[appointmentIndex].time,
        datetime: newDateTime,
        updatedAt: new Date().toISOString()
      }
    }

    if (notes !== undefined) {
      appointments[appointmentIndex].notes = notes
    }

    if (status) {
      appointments[appointmentIndex].status = status
    }

    return NextResponse.json({
      success: true,
      appointment: appointments[appointmentIndex],
      message: 'Appointment updated successfully'
    })
  } catch (error) {
    console.error('Appointment update error:', error)
    return NextResponse.json(
      { error: 'Failed to update appointment' },
      { status: 500 }
    )
  }
}

// DELETE /api/appointments/[appointmentId] - Cancel appointment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { appointmentId: string } }
) {
  try {
    const { appointmentId } = params

    // Find appointment
    const appointmentIndex = appointments.findIndex(
      apt => apt.id === appointmentId
    )
    
    if (appointmentIndex === -1) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      )
    }

    // Mark as cancelled instead of deleting
    appointments[appointmentIndex] = {
      ...appointments[appointmentIndex],
      status: 'cancelled',
      cancelledAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment cancelled successfully'
    })
  } catch (error) {
    console.error('Appointment cancellation error:', error)
    return NextResponse.json(
      { error: 'Failed to cancel appointment' },
      { status: 500 }
    )
  }
}

// Helper function
function getPreparationInstructions(type: string): string[] {
  const instructions = {
    scan: [
      'Wear or bring thin socks for accurate measurements',
      'Remove any ankle jewellery',
      'Allow 30 minutes for the appointment'
    ],
    consultation: [
      'Bring inspiration photos or references',
      'Consider your lifestyle and occasion needs',
      'Rebecca will guide you through style options'
    ],
    fitting: [
      'Wear the type of socks you plan to wear with the shoes',
      'Allow time to walk and test comfort',
      'Adjustments can be made on the spot'
    ]
  }

  return instructions[type as keyof typeof instructions] || []
}

// Export availability endpoint with custom name
export { GET_AVAILABILITY as getAvailability }