// src/app/api/appointments/availability/route.ts
import { NextRequest, NextResponse } from 'next/server'

const generateAvailableSlots = (date: string, serviceType: string) => {
  const baseSlots = [
    '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30'
  ]
  
  const bookedSlots = ['11:00', '14:30', '15:00']
  
  return baseSlots
    .filter(slot => !bookedSlots.includes(slot))
    .map(slot => ({
      time: slot,
      available: true,
      duration: serviceType === 'consultation' ? 45 : 30
    }))
}

export async function GET(request: NextRequest) {
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

    const validTypes = ['scan', 'consultation', 'fitting']
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid service type' },
        { status: 400 }
      )
    }

    const slots = generateAvailableSlots(date, type)

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
