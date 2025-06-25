import { useState } from 'react'
import { Calendar, Clock, MapPin, Users, Check } from 'lucide-react'
import Button from '@/components/ui/Button'

interface BookScanModalProps {
  onClose: () => void
}

type ServiceType = 'scan' | 'consultation' | 'fitting'

export default function BookScanModal({ onClose }: BookScanModalProps) {
  const [serviceType, setServiceType] = useState<ServiceType>('scan')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const services = [
    {
      id: 'scan' as ServiceType,
      title: '3D Foot Scanning',
      description: 'Professional scanning for perfect fit',
      duration: '30 mins',
      icon: '📐'
    },
    {
      id: 'consultation' as ServiceType,
      title: 'Style Consultation',
      description: 'Discuss your next pair with Rebecca',
      duration: '45 mins',
      icon: '💼'
    },
    {
      id: 'fitting' as ServiceType,
      title: 'Fitting Appointment',
      description: 'Try on and adjust your new shoes',
      duration: '30 mins',
      icon: '👞'
    }
  ]

  const availableDates = [
    { date: 'Tomorrow', day: 'Thursday', full: false },
    { date: 'Friday', day: '23 June', full: false },
    { date: 'Monday', day: '26 June', full: true },
    { date: 'Tuesday', day: '27 June', full: false }
  ]

  const availableTimes = [
    '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30'
  ]

  const handleConfirm = () => {
    setConfirmed(true)
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  if (confirmed) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="text-green-600" size={32} />
        </div>
        <p className="text-stone-900 font-medium mb-2">Appointment Confirmed!</p>
        <p className="text-stone-600 text-sm">
          We've sent confirmation details to your email
        </p>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Service Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-stone-700 mb-3">Select Service</h4>
        <div className="space-y-3">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setServiceType(service.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                serviceType === service.id
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{service.icon}</span>
                  <div>
                    <p className="font-medium text-stone-900">{service.title}</p>
                    <p className="text-stone-600 text-sm">{service.description}</p>
                  </div>
                </div>
                <span className="text-stone-500 text-sm">{service.duration}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-stone-700 mb-3">Choose Date</h4>
        <div className="grid grid-cols-2 gap-3">
          {availableDates.map((date) => (
            <button
              key={date.date}
              onClick={() => !date.full && setSelectedDate(date.date)}
              disabled={date.full}
              className={`p-3 rounded-xl border-2 transition-all ${
                selectedDate === date.date
                  ? 'border-amber-500 bg-amber-50'
                  : date.full
                  ? 'border-stone-200 bg-stone-50 opacity-50 cursor-not-allowed'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <p className="font-medium text-stone-900 text-sm">{date.date}</p>
              <p className="text-stone-600 text-xs">{date.day}</p>
              {date.full && <p className="text-red-600 text-xs mt-1">Fully booked</p>}
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="mb-6 animate-slide-up">
          <h4 className="text-sm font-medium text-stone-700 mb-3">Available Times</h4>
          <div className="grid grid-cols-5 gap-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 px-3 rounded-lg border transition-all text-sm ${
                  selectedTime === time
                    ? 'border-amber-500 bg-amber-50 text-amber-900'
                    : 'border-stone-200 hover:border-stone-300 text-stone-700'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Location Info */}
      <div className="bg-stone-50 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <MapPin className="text-stone-600 flex-shrink-0" size={20} />
          <div>
            <p className="font-medium text-stone-900 text-sm mb-1">Mount Street Atelier</p>
            <p className="text-stone-600 text-sm">42 Mount Street, Mayfair, London W1K 2RN</p>
            <a href="#" className="text-amber-600 hover:text-amber-700 text-sm font-medium mt-1 inline-block">
              Get directions →
            </a>
          </div>
        </div>
      </div>

      {/* Appointment Summary */}
      {selectedDate && selectedTime && (
        <div className="bg-amber-50 rounded-xl p-4 mb-6 animate-slide-up">
          <h5 className="font-medium text-amber-900 mb-2">Appointment Summary</h5>
          <div className="space-y-1 text-sm text-amber-800">
            <p>{services.find(s => s.id === serviceType)?.title}</p>
            <p>{selectedDate} at {selectedTime}</p>
            <p>Mount Street Atelier</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={onClose} variant="secondary" className="flex-1">
          Cancel
        </Button>
        <Button 
          onClick={handleConfirm} 
          variant="primary" 
          className="flex-1"
          disabled={!selectedDate || !selectedTime}
        >
          Confirm Booking
        </Button>
      </div>

      {/* Note */}
      <p className="text-center text-stone-500 text-xs mt-4">
        Need to reschedule? Call us on +44 208 123 6619
      </p>
    </div>
  )
}