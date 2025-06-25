import { useState } from 'react'
import { Send, Calendar, Eye, Package, CloudRain } from 'lucide-react'
import OrderProgress from '@/components/features/OrderProgress'
import WeatherRecommendation from '@/components/features/WeatherRecommendation'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { ModalType } from '@/types/navigation'
import { customerData, currentOrder } from '@/data/customer-data'

interface TodayScreenProps {
  onModalOpen: (modal: ModalType) => void
}

export default function TodayScreen({ onModalOpen }: TodayScreenProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)

  const handlePerfectChoice = () => {
    setSelectedChoice('perfect')
    setTimeout(() => setSelectedChoice(null), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 animate-slide-up">
      {/* Current Order Progress */}
      <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-8 mb-8 text-white shadow-premium">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-light mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Good afternoon, {customerData.name}
            </h2>
            <p className="text-amber-100">Your shoes are ready in {currentOrder.daysRemaining} days</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-light mb-1">{currentOrder.progress}%</div>
            <div className="text-amber-100">Complete</div>
          </div>
        </div>

        <OrderProgress order={currentOrder} onViewLive={() => onModalOpen('liveProgress')} />

        {/* Milestone Celebration */}
        {currentOrder.fitConfidence >= 98 && (
          <div className="mt-6 p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
            <p className="text-sm font-medium mb-1">🎉 Milestone Achievement</p>
            <p className="text-lg">98% fit confidence reached! Your most precise pair yet.</p>
          </div>
        )}
      </div>

      {/* Rebecca's Daily Pick */}
      <WeatherRecommendation 
        onPerfectChoice={handlePerfectChoice}
        onWhyThisWorks={() => onModalOpen('whyThisWorks')}
        selectedChoice={selectedChoice}
      />

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-stone-800 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            onClick={() => onModalOpen('voiceMessage')}
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Send className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="font-medium text-stone-900">Quick Message</p>
                <p className="text-stone-600 text-sm">Voice note to Rebecca</p>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => onModalOpen('bookScan')}
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <Calendar className="text-green-600" size={24} />
              </div>
              <div>
                <p className="font-medium text-stone-900">Book 3D Scan</p>
                <p className="text-stone-600 text-sm">Next available: Tomorrow 2pm</p>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => onModalOpen('reserveSlot')}
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                <Package className="text-amber-600" size={24} />
              </div>
              <div>
                <p className="font-medium text-stone-900">Reserve Production</p>
                <p className="text-stone-600 text-sm">For special occasions</p>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => onModalOpen('fitFeedback')}
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                <Eye className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="font-medium text-stone-900">Fit Feedback</p>
                <p className="text-stone-600 text-sm">Help us perfect your fit</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-medium text-stone-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-stone-700">
              <span className="font-medium">David Chen</span> completed upper stitching
            </p>
            <span className="text-stone-500 text-sm ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-stone-700">
              <span className="font-medium">Rebecca</span> sent you a message
            </p>
            <span className="text-stone-500 text-sm ml-auto">Yesterday</span>
          </div>
        </div>
      </div>
    </div>
  )
}