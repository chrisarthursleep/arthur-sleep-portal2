import { CheckCircle, Circle, Clock, Scissors, Package, Sparkles } from 'lucide-react'
import Card from '@/components/ui/Card'
import { ModalType } from '@/types/navigation'
import { currentOrder } from '@/data/customer-data'
import { orderHistory } from '@/data/order-history'

interface MyJourneyProps {
  onModalOpen: (modal: ModalType) => void
}

export default function MyJourney({ onModalOpen }: MyJourneyProps) {
  const getStageIcon = (stageName: string) => {
    if (stageName.includes('Cutting')) return Scissors
    if (stageName.includes('Stitching')) return Package
    if (stageName.includes('Finishing')) return Sparkles
    return Circle
  }

  const getStageStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' }
      case 'current':
        return { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' }
      default:
        return { icon: Circle, color: 'text-stone-400', bg: 'bg-stone-50' }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 animate-slide-up">
      <div className="mb-8">
        <h2 className="text-3xl font-light text-stone-800 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          My Journey
        </h2>
        <p className="text-stone-600 text-lg">
          Track every step of your bespoke shoe creation
        </p>
      </div>

      {/* Current Order */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-stone-800">Current Order: {currentOrder.productName}</h3>
          <button
            onClick={() => onModalOpen('liveProgress')}
            className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            View Live
          </button>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            {currentOrder.stages.map((stage, index) => {
              const StatusIcon = getStageIcon(stage.name)
              const { icon: StatusIndicator, color, bg } = getStageStatus(stage.status)
              
              return (
                <div key={stage.id} className="flex items-start gap-4">
                  <div className="relative">
                    <div className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center`}>
                      <StatusIndicator className={color} size={24} />
                    </div>
                    {index < currentOrder.stages.length - 1 && (
                      <div className={`absolute top-12 left-6 w-0.5 h-16 -translate-x-1/2 ${
                        stage.status === 'completed' ? 'bg-green-300' : 'bg-stone-200'
                      }`} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-stone-900">{stage.name}</h4>
                      <span className="text-sm text-stone-500">
                        {stage.completedDate 
                          ? `Completed ${new Date(stage.completedDate).toLocaleDateString('en-GB')}`
                          : stage.estimatedDate 
                          ? `Est. ${new Date(stage.estimatedDate).toLocaleDateString('en-GB')}`
                          : 'Upcoming'
                        }
                      </span>
                    </div>
                    
                    <p className="text-stone-600 text-sm mb-2">By {stage.craftsperson}</p>
                    
                    {stage.message && (
                      <div className="bg-stone-50 rounded-lg p-3 mt-2">
                        <p className="text-stone-700 text-sm italic">"{stage.message}"</p>
                      </div>
                    )}
                    
                    {stage.status === 'current' && stage.progress && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-stone-600">Progress</span>
                          <span className="text-xs text-stone-600">{stage.progress}%</span>
                        </div>
                        <div className="w-full bg-stone-200 rounded-full h-2">
                          <div 
                            className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${stage.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Order History */}
      <div>
        <h3 className="text-xl font-medium text-stone-800 mb-6">Previous Orders</h3>
        <div className="space-y-4">
          {orderHistory.map((order) => (
            <Card key={order.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-stone-900">{order.productName}</h4>
                  <p className="text-stone-600 text-sm">{order.style}</p>
                  <p className="text-stone-500 text-sm mt-1">
                    Delivered {new Date(order.deliveredDate).toLocaleDateString('en-GB', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-light text-amber-600 mb-1">
                    {order.fitConfidence}%
                  </div>
                  <p className="text-stone-500 text-sm">Fit Confidence</p>
                  <button 
                    onClick={() => onModalOpen('fitFeedback')}
                    className="text-amber-600 hover:text-amber-700 text-sm font-medium mt-2"
                  >
                    Update Feedback →
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}