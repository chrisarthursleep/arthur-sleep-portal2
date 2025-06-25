import { Calendar, TrendingUp, AlertCircle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Shoe } from '@/types/wardrobe'

interface ShoeCardProps {
  shoe: Shoe
  onFeedback: () => void
}

export default function ShoeCard({ shoe, onFeedback }: ShoeCardProps) {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'success'
      case 'good': return 'info'
      case 'fair': return 'warning'
      case 'needs-attention': return 'error'
      default: return 'default'
    }
  }
  
  const getConditionLabel = (condition: string) => {
    return condition.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-medium text-stone-900 mb-1">{shoe.name}</h4>
          <p className="text-stone-600 text-sm">{shoe.style}</p>
          <p className="text-stone-500 text-sm">{shoe.color} • {shoe.material}</p>
        </div>
        <Badge variant={getConditionColor(shoe.condition)} size="sm">
          {getConditionLabel(shoe.condition)}
        </Badge>
      </div>
      
      <div className="bg-stone-50 rounded-xl aspect-[4/3] mb-4 flex items-center justify-center">
        <div className="text-6xl opacity-20">👞</div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-1 text-stone-600 text-sm mb-1">
            <TrendingUp size={14} />
            <span>Fit Confidence</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-lg font-medium text-stone-900">{shoe.fitConfidence}%</div>
            {shoe.fitConfidence < 90 && (
              <button
                onClick={onFeedback}
                className="text-amber-600 hover:text-amber-700 text-xs font-medium"
              >
                Update
              </button>
            )}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-1 text-stone-600 text-sm mb-1">
            <Calendar size={14} />
            <span>Wear Count</span>
          </div>
          <div className="text-lg font-medium text-stone-900">{shoe.wearCount} times</div>
        </div>
      </div>
      
      {shoe.lastWorn && (
        <div className="text-stone-600 text-sm mb-4">
          Last worn: {new Date(shoe.lastWorn).toLocaleDateString('en-GB', { 
            day: 'numeric',
            month: 'short'
          })}
        </div>
      )}
      
      {shoe.condition === 'needs-attention' && (
        <div className="bg-red-50 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="text-red-600 flex-shrink-0" size={16} />
          <div>
            <p className="text-red-800 text-sm font-medium">Attention Needed</p>
            <p className="text-red-700 text-xs">Consider refurbishment service</p>
          </div>
        </div>
      )}
      
      <div className="flex flex-wrap gap-1 mt-4">
        {shoe.occasions.map((occasion) => (
          <Badge key={occasion} variant="default" size="sm">
            {occasion}
          </Badge>
        ))}
      </div>
    </Card>
  )
}