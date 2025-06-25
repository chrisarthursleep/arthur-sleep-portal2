import { useState, useEffect } from 'react'
import { Scissors, Clock, MessageCircle } from 'lucide-react'
import { currentOrder } from '@/data/customer-data'

interface LiveProgressModalProps {
  onClose: () => void
}

export default function LiveProgressModal({ onClose }: LiveProgressModalProps) {
  const [liveUpdates, setLiveUpdates] = useState([
    { time: '2 mins ago', message: 'Starting upper leather preparation', craftsperson: 'David' },
    { time: '15 mins ago', message: 'Completed morning inspection', craftsperson: 'David' },
    { time: '1 hour ago', message: 'Materials prepared for today\'s work', craftsperson: 'Simon' }
  ])

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      const newUpdate = {
        time: 'Just now',
        message: 'Precision stitching in progress - 2mm adjustments',
        craftsperson: 'David'
      }
      setLiveUpdates(prev => [newUpdate, ...prev.slice(0, 2)])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* Live Workshop View */}
      <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          LIVE
        </div>
        
        <div className="text-center z-10">
          <div className="w-20 h-20 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <Scissors className="text-amber-600" size={32} />
          </div>
          <p className="text-amber-800 font-medium text-lg">David's Workshop</p>
          <p className="text-amber-600">Hand-stitching in progress</p>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
      </div>

      {/* Current Stage Info */}
      <div className="bg-amber-50 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-amber-900">Current Stage</h4>
          <span className="text-amber-700 text-sm">{currentOrder.progress}% Complete</span>
        </div>
        <p className="text-amber-800 font-medium">{currentOrder.currentStage.name}</p>
        <p className="text-amber-700 text-sm mt-1">By {currentOrder.currentStage.craftsperson}</p>
      </div>

      {/* Live Updates Feed */}
      <div>
        <h4 className="font-medium text-stone-800 mb-3 flex items-center gap-2">
          <Clock size={16} />
          Live Updates
        </h4>
        <div className="space-y-3">
          {liveUpdates.map((update, index) => (
            <div key={index} className="flex gap-3 p-3 bg-stone-50 rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-stone-700 text-sm">{update.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-stone-500 text-xs">{update.craftsperson}</span>
                  <span className="text-stone-400 text-xs">•</span>
                  <span className="text-stone-500 text-xs">{update.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Craftsperson Note */}
      <div className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <MessageCircle className="text-stone-600 flex-shrink-0" size={20} />
          <div>
            <p className="text-stone-800 italic" style={{ fontFamily: 'Georgia, serif' }}>
              "The Italian suede is responding beautifully to the hand work. Each stitch is placed 
              with precision - this is going to be a stunning pair. Should be ready for lasting 
              tomorrow morning."
            </p>
            <p className="text-stone-600 text-sm mt-2">- David, 3 minutes ago</p>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="border-t border-stone-200 pt-4">
        <h5 className="text-sm font-medium text-stone-700 mb-2">Technical Notes</h5>
        <div className="space-y-2 text-sm text-stone-600">
          <p>• Upper leather: Italian suede, chocolate brown</p>
          <p>• Stitch spacing: 3mm precision</p>
          <p>• Thread: Waxed linen, double-reinforced</p>
          <p>• Next stage: Lasting (tomorrow 9am)</p>
        </div>
      </div>
    </div>
  )
}