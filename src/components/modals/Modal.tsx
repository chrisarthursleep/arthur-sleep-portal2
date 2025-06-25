import { useEffect } from 'react'
import { X } from 'lucide-react'
import { ModalType } from '@/types/navigation'
import VoiceMessageModal from './VoiceMessageModal'
import ReserveSlotModal from './ReserveSlotModal'
import FitFeedbackModal from './FitFeedbackModal'
import LiveProgressModal from './LiveProgressModal'
import BookScanModal from './BookScanModal'
import ShareInspirationModal from './ShareInspirationModal'
import WhyThisWorksModal from './WhyThisWorksModal'

interface ModalProps {
  type: ModalType
  onClose: () => void
}

export default function Modal({ type, onClose }: ModalProps) {
  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [type])

  if (!type) return null

  const getModalContent = () => {
    switch (type) {
      case 'voiceMessage':
        return <VoiceMessageModal onClose={onClose} />
      case 'reserveSlot':
        return <ReserveSlotModal onClose={onClose} />
      case 'fitFeedback':
        return <FitFeedbackModal onClose={onClose} />
      case 'liveProgress':
        return <LiveProgressModal onClose={onClose} />
      case 'bookScan':
        return <BookScanModal onClose={onClose} />
      case 'shareInspiration':
        return <ShareInspirationModal onClose={onClose} />
      case 'whyThisWorks':
        return <WhyThisWorksModal onClose={onClose} />
      default:
        return null
    }
  }

  const getModalTitle = () => {
    switch (type) {
      case 'voiceMessage': return 'Send a Message'
      case 'reserveSlot': return 'Reserve Production Slot'
      case 'fitFeedback': return 'Fit Feedback'
      case 'liveProgress': return 'Live Workshop Feed'
      case 'bookScan': return 'Book Appointment'
      case 'shareInspiration': return 'Share Inspiration'
      case 'whyThisWorks': return "Why Today's Pick Works"
      default: return ''
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <h3 className="text-xl font-medium text-stone-900">{getModalTitle()}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="text-stone-600" size={20} />
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {getModalContent()}
        </div>
      </div>
    </div>
  )
}