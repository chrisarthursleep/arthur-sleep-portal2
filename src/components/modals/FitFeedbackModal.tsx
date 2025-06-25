import { useState } from 'react'
import { CheckCircle, AlertCircle, ChevronRight, Info } from 'lucide-react'
import Button from '@/components/ui/Button'
import { wardrobeData } from '@/data/wardrobe-data'

interface FitFeedbackModalProps {
  onClose: () => void
}

type FeedbackStatus = 'perfect' | 'issues' | null

export default function FitFeedbackModal({ onClose }: FitFeedbackModalProps) {
  const [selectedShoe, setSelectedShoe] = useState('')
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus>(null)
  const [issues, setIssues] = useState<string[]>([])
  const [comments, setComments] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const commonIssues = [
    { id: 'tight-toe', label: 'Tight in toe box' },
    { id: 'loose-heel', label: 'Loose in heel' },
    { id: 'arch-support', label: 'Arch support needed' },
    { id: 'width', label: 'Width adjustment needed' },
    { id: 'pressure-points', label: 'Pressure points' },
    { id: 'other', label: 'Other issue' }
  ]

  const handleSubmit = () => {
    setSubmitted(true)
    // In real app, would save feedback
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  const toggleIssue = (issueId: string) => {
    setIssues(prev => 
      prev.includes(issueId) 
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    )
  }

  if (submitted) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <p className="text-stone-900 font-medium mb-2">Thank You!</p>
        <p className="text-stone-600 text-sm">
          Your feedback helps us perfect your next pair
        </p>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Shoe Selection */}
      {!selectedShoe && (
        <>
          <div className="mb-6">
            <h4 className="text-lg font-medium text-stone-800 mb-2">Select a shoe</h4>
            <p className="text-stone-600 text-sm">Choose which pair you'd like to give feedback on</p>
          </div>
          
          <div className="space-y-3 mb-6">
            {wardrobeData.slice(0, 4).map((shoe) => (
              <button
                key={shoe.id}
                onClick={() => setSelectedShoe(shoe.id)}
                className="w-full p-4 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors text-left flex items-center justify-between group"
              >
                <div>
                  <p className="font-medium text-stone-900">{shoe.name}</p>
                  <p className="text-stone-600 text-sm">{shoe.style} • {shoe.color}</p>
                </div>
                <ChevronRight className="text-stone-400 group-hover:text-stone-600" size={20} />
              </button>
            ))}
          </div>
        </>
      )}

      {/* Feedback Form */}
      {selectedShoe && !feedbackStatus && (
        <>
          <div className="mb-6">
            <button
              onClick={() => setSelectedShoe('')}
              className="text-amber-600 hover:text-amber-700 text-sm font-medium mb-4"
            >
              ← Change shoe
            </button>
            
            <h4 className="text-lg font-medium text-stone-800 mb-2">How's the fit?</h4>
            <p className="text-stone-600 text-sm">
              {wardrobeData.find(s => s.id === selectedShoe)?.name}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setFeedbackStatus('perfect')}
              className="p-8 bg-green-50 hover:bg-green-100 rounded-2xl transition-colors text-center"
            >
              <CheckCircle className="text-green-600 mx-auto mb-3" size={40} />
              <p className="font-medium text-green-900">Perfect!</p>
              <p className="text-green-700 text-sm mt-1">No issues</p>
            </button>
            
            <button
              onClick={() => setFeedbackStatus('issues')}
              className="p-8 bg-amber-50 hover:bg-amber-100 rounded-2xl transition-colors text-center"
            >
              <AlertCircle className="text-amber-600 mx-auto mb-3" size={40} />
              <p className="font-medium text-amber-900">Some Issues</p>
              <p className="text-amber-700 text-sm mt-1">Let us know</p>
            </button>
          </div>
        </>
      )}

      {/* Perfect Feedback */}
      {feedbackStatus === 'perfect' && (
        <>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h4 className="text-lg font-medium text-stone-800 mb-2">Wonderful!</h4>
            <p className="text-stone-600">We're delighted the fit is perfect</p>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Any additional comments? (optional)
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="What do you love about them?"
              className="w-full p-4 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              rows={3}
            />
          </div>
          
          <Button onClick={handleSubmit} variant="primary" className="w-full">
            Submit Feedback
          </Button>
        </>
      )}

      {/* Issues Feedback */}
      {feedbackStatus === 'issues' && (
        <>
          <div className="mb-6">
            <h4 className="text-lg font-medium text-stone-800 mb-4">What issues are you experiencing?</h4>
            <div className="space-y-3">
              {commonIssues.map((issue) => (
                <button
                  key={issue.id}
                  onClick={() => toggleIssue(issue.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    issues.includes(issue.id)
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-stone-900 text-sm">{issue.label}</span>
                    {issues.includes(issue.id) && (
                      <CheckCircle className="text-amber-600" size={20} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Additional details
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Please describe the issues in more detail..."
              className="w-full p-4 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              rows={4}
            />
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <Info className="text-blue-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-blue-800 text-sm font-medium mb-1">How this helps</p>
                <p className="text-blue-700 text-sm">
                  Your feedback directly improves our pattern for your next pair, 
                  ensuring an even better fit.
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleSubmit} 
            variant="primary" 
            className="w-full"
            disabled={issues.length === 0 && !comments.trim()}
          >
            Submit Feedback
          </Button>
        </>
      )}
    </div>
  )
}