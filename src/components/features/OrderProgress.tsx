import { Eye } from 'lucide-react'
import Progress from '@/components/ui/Progress'
import { Order } from '@/types/order'

interface OrderProgressProps {
  order: Order
  onViewLive: () => void
}

export default function OrderProgress({ order, onViewLive }: OrderProgressProps) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <div>
            <p className="font-medium">{order.currentStage.name}</p>
            <p className="text-sm opacity-90">by {order.currentStage.craftsperson}</p>
          </div>
        </div>
        <button
          onClick={onViewLive}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Eye size={16} />
          <span className="text-sm">View Live</span>
        </button>
      </div>
      
      <Progress 
        value={order.progress} 
        color="amber" 
        size="md"
        className="bg-white/20"
      />
      
      {order.currentStage.message && (
        <p className="mt-3 text-sm italic opacity-90">
          "{order.currentStage.message}"
        </p>
      )}
    </div>
  )
}