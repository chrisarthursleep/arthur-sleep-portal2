import { useState, useEffect } from 'react'
import { Mic, Send, Square, Type } from 'lucide-react'
import Button from '@/components/ui/Button'
import { teamData } from '@/data/team-data'

interface VoiceMessageModalProps {
  onClose: () => void
}

type MessageStatus = 'idle' | 'recording' | 'sending' | 'sent'

export default function VoiceMessageModal({ onClose }: VoiceMessageModalProps) {
  const [selectedTeamMember, setSelectedTeamMember] = useState(teamData[0])
  const [messageType, setMessageType] = useState<'voice' | 'text'>('voice')
  const [messageText, setMessageText] = useState('')
  const [status, setStatus] = useState<MessageStatus>('idle')
  const [recordingTime, setRecordingTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (status === 'recording') {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [status])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartRecording = () => {
    setStatus('recording')
    setRecordingTime(0)
  }

  const handleStopRecording = () => {
    setStatus('idle')
    // In real app, would save the recording
  }

  const handleSend = () => {
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setTimeout(() => {
        onClose()
      }, 1500)
    }, 1500)
  }

  if (status === 'sent') {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">✓</span>
          </div>
        </div>
        <p className="text-stone-900 font-medium mb-2">Message Sent!</p>
        <p className="text-stone-600 text-sm">
          {selectedTeamMember.name.split(' ')[0]} will respond within {selectedTeamMember.responseTime}
        </p>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Team Member Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-stone-700 mb-3">Send to</label>
        <div className="grid grid-cols-3 gap-3">
          {teamData.map((member) => (
            <button
              key={member.id}
              onClick={() => setSelectedTeamMember(member)}
              className={`p-3 rounded-xl border-2 transition-all ${
                selectedTeamMember.id === member.id
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <p className="font-medium text-stone-900 text-sm">{member.name.split(' ')[0]}</p>
              <p className="text-stone-600 text-xs">{member.role}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Message Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-stone-700 mb-3">Message type</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setMessageType('voice')}
            className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
              messageType === 'voice'
                ? 'border-amber-500 bg-amber-50'
                : 'border-stone-200 hover:border-stone-300'
            }`}
          >
            <Mic size={18} />
            <span className="font-medium text-sm">Voice</span>
          </button>
          <button
            onClick={() => setMessageType('text')}
            className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
              messageType === 'text'
                ? 'border-amber-500 bg-amber-50'
                : 'border-stone-200 hover:border-stone-300'
            }`}
          >
            <Type size={18} />
            <span className="font-medium text-sm">Text</span>
          </button>
        </div>
      </div>

      {/* Message Input */}
      {messageType === 'voice' ? (
        <div className="mb-6">
          <div className="bg-stone-50 rounded-2xl p-8 text-center">
            {status === 'recording' ? (
              <>
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Mic className="text-white" size={32} />
                </div>
                <p className="text-2xl font-light text-stone-900 mb-2">{formatTime(recordingTime)}</p>
                <p className="text-stone-600 mb-6">Recording...</p>
                <Button
                  onClick={handleStopRecording}
                  variant="secondary"
                  className="mx-auto"
                >
                  <Square size={18} className="mr-2" />
                  Stop Recording
                </Button>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic className="text-amber-600" size={32} />
                </div>
                <p className="text-stone-700 mb-6">Tap to record a voice message</p>
                <Button
                  onClick={handleStartRecording}
                  variant="primary"
                  className="mx-auto"
                >
                  Start Recording
                </Button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={`Write a message to ${selectedTeamMember.name.split(' ')[0]}...`}
            className="w-full p-4 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            rows={4}
          />
        </div>
      )}

      {/* Quick Suggestions */}
      <div className="mb-6">
        <p className="text-sm font-medium text-stone-700 mb-3">Quick messages</p>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setMessageText("How's my order progressing?")}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-full text-sm text-stone-700 transition-colors"
          >
            Order update?
          </button>
          <button 
            onClick={() => setMessageText("Can we adjust the fit slightly?")}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-full text-sm text-stone-700 transition-colors"
          >
            Fit adjustment
          </button>
          <button 
            onClick={() => setMessageText("Thank you for the update!")}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-full text-sm text-stone-700 transition-colors"
          >
            Thank you
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={onClose}
          variant="secondary"
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSend}
          variant="primary"
          className="flex-1 flex items-center justify-center gap-2"
          disabled={status === 'recording' || (messageType === 'text' && !messageText.trim())}
        >
          {status === 'sending' ? (
            'Sending...'
          ) : (
            <>
              <Send size={18} />
              Send Message
            </>
          )}
        </Button>
      </div>

      {/* Response Time Note */}
      <p className="text-center text-stone-500 text-sm mt-4">
        {selectedTeamMember.name.split(' ')[0]} typically responds within {selectedTeamMember.responseTime}
      </p>
    </div>
  )
}