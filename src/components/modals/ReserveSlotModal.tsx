import { useState } from 'react'
import { Calendar, Gift, Users, ChevronRight } from 'lucide-react'
import Button from '@/components/ui/Button'

interface ReserveSlotModalProps {
  onClose: () => void
}

type Step = 'purpose' | 'occasion' | 'timeline' | 'confirm'
type Purpose = 'personal' | 'gift' | null

export default function ReserveSlotModal({ onClose }: ReserveSlotModalProps) {
  const [step, setStep] = useState<Step>('purpose')
  const [purpose, setPurpose] = useState<Purpose>(null)
  const [occasion, setOccasion] = useState('')
  const [timeline, setTimeline] = useState('')

  const occasions = [
    { id: 'wedding', label: 'Wedding', icon: '💒' },
    { id: 'anniversary', label: 'Anniversary', icon: '💝' },
    { id: 'birthday', label: 'Birthday', icon: '🎂' },
    { id: 'business', label: 'Business Event', icon: '💼' },
    { id: 'holiday', label: 'Holiday/Travel', icon: '✈️' },
    { id: 'other', label: 'Other Special Event', icon: '✨' }
  ]

  const timelines = [
    { id: '3months', label: '3 months', description: 'Standard timeline' },
    { id: '6months', label: '6 months', description: 'Relaxed pace' },
    { id: '12months', label: '12 months', description: 'Ultimate flexibility' }
  ]

  const handleNext = () => {
    switch (step) {
      case 'purpose':
        if (purpose) setStep('occasion')
        break
      case 'occasion':
        if (occasion) setStep('timeline')
        break
      case 'timeline':
        if (timeline) setStep('confirm')
        break
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 'purpose':
        return (
          <div className="p-6 space-y-4">
            <div className="text-center mb-6">
              <h4 className="text-lg font-medium text-stone-800 mb-2">Who is this for?</h4>
              <p className="text-stone-600">We'll personalise the experience accordingly</p>
            </div>
            
            <button
              onClick={() => setPurpose('personal')}
              className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                purpose === 'personal'
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <Users className="text-amber-600 mb-3" size={32} />
              <h5 className="font-medium text-stone-900 mb-1">For Myself</h5>
              <p className="text-stone-600 text-sm">Continue building your collection</p>
            </button>
            
            <button
              onClick={() => setPurpose('gift')}
              className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                purpose === 'gift'
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <Gift className="text-purple-600 mb-3" size={32} />
              <h5 className="font-medium text-stone-900 mb-1">As a Gift</h5>
              <p className="text-stone-600 text-sm">The ultimate luxury present</p>
            </button>
          </div>
        )

      case 'occasion':
        return (
          <div className="p-6 space-y-4">
            <div className="text-center mb-6">
              <h4 className="text-lg font-medium text-stone-800 mb-2">What's the occasion?</h4>
              <p className="text-stone-600">This helps us suggest the perfect style</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {occasions.map((occ) => (
                <button
                  key={occ.id}
                  onClick={() => setOccasion(occ.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    occasion === occ.id
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{occ.icon}</div>
                  <p className="font-medium text-stone-900 text-sm">{occ.label}</p>
                </button>
              ))}
            </div>
          </div>
        )

      case 'timeline':
        return (
          <div className="p-6 space-y-4">
            <div className="text-center mb-6">
              <h4 className="text-lg font-medium text-stone-800 mb-2">When do you need them?</h4>
              <p className="text-stone-600">Production slots are fully flexible</p>
            </div>
            
            {timelines.map((tl) => (
              <button
                key={tl.id}
                onClick={() => setTimeline(tl.id)}
                className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                  timeline === tl.id
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-stone-900 mb-1">{tl.label}</h5>
                    <p className="text-stone-600 text-sm">{tl.description}</p>
                  </div>
                  <Calendar className="text-stone-400" size={24} />
                </div>
              </button>
            ))}
            
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-blue-800 text-sm">
                <strong>Flexible scheduling:</strong> You can adjust your timeline at any point. 
                We'll work around your schedule.
              </p>
            </div>
          </div>
        )

      case 'confirm':
        return (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-green-600" size={32} />
              </div>
              <h4 className="text-lg font-medium text-stone-800 mb-2">Production Slot Reserved!</h4>
              <p className="text-stone-600">We'll contact you within 24 hours</p>
            </div>
            
            <div className="bg-stone-50 rounded-2xl p-6 mb-6">
              <h5 className="font-medium text-stone-900 mb-4">Your Reservation</h5>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-600">Purpose:</span>
                  <span className="font-medium text-stone-900">{purpose === 'gift' ? 'Gift' : 'Personal'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Occasion:</span>
                  <span className="font-medium text-stone-900">
                    {occasions.find(o => o.id === occasion)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Timeline:</span>
                  <span className="font-medium text-stone-900">
                    {timelines.find(t => t.id === timeline)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Deposit:</span>
                  <span className="font-medium text-stone-900">£500</span>
                </div>
              </div>
            </div>
            
            {purpose === 'gift' && (
              <div className="bg-purple-50 rounded-2xl p-4 mb-6">
                <p className="text-purple-800 text-sm">
                  <strong>Gift slots are transferable.</strong> The recipient will work directly 
                  with your team to create their perfect pair. Valid for 12 months.
                </p>
              </div>
            )}
            
            <div className="p-4 bg-amber-50 rounded-xl">
              <p className="text-amber-800 text-sm italic text-center">
                "Every pair tells a story. We're excited to be part of yours."
              </p>
              <p className="text-amber-700 text-sm text-center mt-1">- Rebecca Thompson</p>
            </div>
          </div>
        )
    }
  }

  return (
    <>
      {renderStepContent()}
      
      {step !== 'confirm' && (
        <div className="p-6 pt-0 flex gap-3">
          {step !== 'purpose' && (
            <Button
              onClick={() => {
                switch (step) {
                  case 'occasion': setStep('purpose'); break
                  case 'timeline': setStep('occasion'); break
                }
              }}
              variant="secondary"
              className="flex-1"
            >
              Back
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            variant="primary"
            className="flex-1 flex items-center justify-center gap-2"
            disabled={
              (step === 'purpose' && !purpose) ||
              (step === 'occasion' && !occasion) ||
              (step === 'timeline' && !timeline)
            }
          >
            Continue
            <ChevronRight size={18} />
          </Button>
        </div>
      )}
      
      {step === 'confirm' && (
        <div className="p-6 pt-0">
          <Button
            onClick={onClose}
            variant="primary"
            className="w-full"
          >
            Done
          </Button>
        </div>
      )}
    </>
  )
}