import { CloudRain, Eye } from 'lucide-react'
import Card from '@/components/ui/Card'

interface WeatherRecommendationProps {
  onPerfectChoice: () => void
  onWhyThisWorks: () => void
  selectedChoice: string | null
}

export default function WeatherRecommendation({ 
  onPerfectChoice, 
  onWhyThisWorks, 
  selectedChoice 
}: WeatherRecommendationProps) {
  return (
    <Card className="p-6 mb-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-stone-800 mb-1">Rebecca's Pick for Today</h3>
          <div className="flex items-center gap-2 text-stone-600 text-sm">
            <CloudRain size={16} />
            <span>Light rain expected • 16°C</span>
          </div>
        </div>
        <span className="text-2xl">☔</span>
      </div>
      
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium text-amber-900 mb-2">The Belgrave</h4>
            <p className="text-amber-800 text-sm mb-1">Chelsea Boot • Chocolate Suede</p>
            <p className="text-amber-700 text-sm">Water-resistant • All-day comfort</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-light text-amber-900">96%</div>
            <p className="text-amber-700 text-xs">match</p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-white/60 rounded-xl">
          <p className="text-amber-800 text-sm italic">
            "Perfect for today's weather with your Savile Row meetings. The treated suede 
            handles light rain beautifully whilst maintaining elegance."
          </p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={onPerfectChoice}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            selectedChoice === 'perfect' 
              ? 'bg-green-400 text-green-900' 
              : 'bg-white/20 hover:bg-white/30 border border-stone-200 text-stone-700'
          }`}
        >
          {selectedChoice === 'perfect' ? '✓ Perfect Choice!' : 'Perfect Choice ✓'}
        </button>
        <button 
          onClick={onWhyThisWorks}
          className="bg-white/20 backdrop-blur-sm text-stone-700 px-4 py-3 rounded-xl hover:bg-stone-100 transition-all flex items-center gap-2 border border-stone-200"
        >
          <Eye size={18} />
          Why This Works
        </button>
      </div>
    </Card>
  )
}