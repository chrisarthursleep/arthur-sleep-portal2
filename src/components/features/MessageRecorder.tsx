import { useState, useEffect } from 'react'
import { Mic, Square, Pause, Play, Send, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useAudio } from '@/hooks/useAudio'

interface MessageRecorderProps {
  onSend: (audioBlob: Blob, duration: number) => void
  onCancel: () => void
  maxDuration?: number
  className?: string
}

export default function MessageRecorder({ 
  onSend, 
  onCancel, 
  maxDuration = 300,
  className = ''
}: MessageRecorderProps) {
  const {
    isRecording,
    isPaused,
    duration,
    audioBlob,
    error,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording
  } = useAudio({ maxDuration })

  const [isPlaying, setIsPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioBlob) {
      const audio = new Audio(URL.createObjectURL(audioBlob))
      audio.onended = () => setIsPlaying(false)
      setAudioElement(audio)
      
      return () => {
        audio.pause()
        URL.revokeObjectURL(audio.src)
      }
    }
  }, [audioBlob])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    if (!audioElement) return
    
    if (isPlaying) {
      audioElement.pause()
      setIsPlaying(false)
    } else {
      audioElement.play()
      setIsPlaying(true)
    }
  }

  const handleSend = () => {
    if (audioBlob) {
      onSend(audioBlob, duration)
    }
  }

  const handleReset = () => {
    resetRecording()
    setIsPlaying(false)
    if (audioElement) {
      audioElement.pause()
      audioElement.currentTime = 0
    }
  }

  return (
    <div className={`bg-stone-50 rounded-2xl p-6 ${className}`}>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Recording State */}
      {!audioBlob && (
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all ${
            isRecording 
              ? 'bg-red-500 animate-pulse' 
              : 'bg-amber-100'
          }`}>
            <Mic className={`${isRecording ? 'text-white' : 'text-amber-600'}`} size={32} />
          </div>

          <p className="text-2xl font-light text-stone-900 mb-2">
            {formatTime(duration)}
          </p>

          {isRecording && (
            <p className="text-stone-600 mb-6">
              {isPaused ? 'Paused' : 'Recording...'}
            </p>
          )}

          {!isRecording && (
            <p className="text-stone-700 mb-6">
              Tap to record a voice message
            </p>
          )}

          <div className="flex justify-center gap-3">
            {!isRecording && (
              <Button
                onClick={startRecording}
                variant="primary"
                size="md"
              >
                Start Recording
              </Button>
            )}

            {isRecording && !isPaused && (
              <>
                <Button
                  onClick={pauseRecording}
                  variant="secondary"
                  size="sm"
                >
                  <Pause size={18} />
                </Button>
                <Button
                  onClick={stopRecording}
                  variant="primary"
                  size="md"
                >
                  <Square size={18} className="mr-2" />
                  Stop
                </Button>
              </>
            )}

            {isRecording && isPaused && (
              <>
                <Button
                  onClick={resumeRecording}
                  variant="secondary"
                  size="sm"
                >
                  <Play size={18} />
                </Button>
                <Button
                  onClick={stopRecording}
                  variant="primary"
                  size="md"
                >
                  <Square size={18} className="mr-2" />
                  Stop
                </Button>
              </>
            )}
          </div>

          {duration >= maxDuration - 30 && (
            <p className="text-amber-600 text-sm mt-4">
              {maxDuration - duration} seconds remaining
            </p>
          )}
        </div>
      )}

      {/* Playback State */}
      {audioBlob && (
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">✓</span>
            </div>
          </div>

          <p className="text-stone-900 font-medium mb-2">Recording Complete</p>
          <p className="text-stone-600 mb-6">{formatTime(duration)}</p>

          <div className="flex justify-center gap-3 mb-6">
            <Button
              onClick={handlePlayPause}
              variant="secondary"
              size="sm"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            
            <Button
              onClick={handleReset}
              variant="secondary"
              size="sm"
            >
              <X size={18} className="mr-1" />
              Re-record
            </Button>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onCancel}
              variant="secondary"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              variant="primary"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Send Message
            </Button>
          </div>
        </div>
      )}

      {/* Visual Waveform (decorative) */}
      {isRecording && !isPaused && (
        <div className="mt-6 flex items-center justify-center gap-1">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-amber-400 rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}