import { ArrowRight } from 'lucide-react'
import { WardrobeGap } from '@/types/wardrobe'

interface WardrobeGapCardProps {
  gap: WardrobeGap
  onExplore: () => void
}

export default function WardrobeGapCard({ gap, onExplore }: WardrobeGapCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-amber-100 text-amber-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-stone-100 text-stone-800'
    }
  }

  return (
    <div className="bg-stone-50 rounded-xl p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h5 className="font-medium text-stone-900 mb-1">{gap.style}</h5>
          <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(gap.priority)}`}>
            {gap.priority} priority
          </div>
        </div>
        <div className="text-right">
          <p className="text-stone-500 text-sm mb-2">{gap.price}</p>
          <button 
            onClick={onExplore}
            className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1"
          >
            Explore
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg p-3">
        <p className="text-stone-600 text-sm italic">{gap.reasoning}</p>
      </div>
    </div>
  )
}