import { useState } from 'react'
import { TrendingUp, AlertCircle, Calendar, Briefcase, Coffee, Moon, Plane } from 'lucide-react'
import ShoeCard from '@/components/features/ShoeCard'
import WardrobeGapCard from '../features/WardrobeGapCard'
import Card from '@/components/ui/Card'
import { ModalType } from '@/types/navigation'
import { customerData } from '@/data/customer-data'
import { wardrobeData, lifeCoverageData } from '@/data/wardrobe-data'

interface MyWardrobeProps {
  onModalOpen: (modal: ModalType) => void
}

export default function MyWardrobe({ onModalOpen }: MyWardrobeProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'work': return Briefcase
      case 'weekend': return Coffee
      case 'evening': return Moon
      case 'travel': return Plane
      default: return Calendar
    }
  }

  const filteredShoes = selectedCategory === 'all' 
    ? wardrobeData 
    : wardrobeData.filter(shoe => shoe.occasions.includes(selectedCategory))

  return (
    <div className="max-w-4xl mx-auto p-6 animate-slide-up">
      <div className="mb-8">
        <h2 className="text-3xl font-light text-stone-800 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          My Wardrobe
        </h2>
        <p className="text-stone-600 text-lg">
          Your complete shoe collection and life coverage analysis
        </p>
      </div>

      {/* Collection Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-100">
          <div className="text-center">
            <div className="text-5xl font-light text-amber-900 mb-2">{customerData.averageFitConfidence}%</div>
            <h3 className="text-lg font-medium text-amber-900 mb-2">Average Fit Confidence</h3>
            <p className="text-amber-700">How well your existing shoes fit</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
          <div className="text-center">
            <div className="text-5xl font-light text-green-900 mb-2">{customerData.totalPairs}</div>
            <h3 className="text-lg font-medium text-green-900 mb-2">Total Pairs</h3>
            <p className="text-green-700">In your Arthur Sleep collection</p>
          </div>
        </div>
      </div>

      {/* Life Coverage Analysis */}
      <div className="mb-12">
        <h3 className="text-xl font-medium text-stone-800 mb-6">Life Coverage Analysis</h3>
        <div className="space-y-4">
          {lifeCoverageData.map((category) => {
            const Icon = getCategoryIcon(category.category)
            const isExpanded = expandedCategory === category.category
            
            return (
              <Card key={category.category} className="p-6">
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : category.category)}
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center">
                        <Icon className="text-stone-600" size={20} />
                      </div>
                      <h4 className="text-lg font-medium text-stone-900 capitalize">{category.category}</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-light text-stone-900">{category.percentage}%</div>
                      <p className="text-stone-500 text-sm">Coverage</p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-stone-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        category.percentage >= 80 ? 'bg-green-500' :
                        category.percentage >= 60 ? 'bg-amber-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </button>
                
                {isExpanded && category.gaps.length > 0 && (
                  <div className="mt-6 space-y-4 animate-slide-up">
                    <div className="flex items-center gap-2 text-stone-600 mb-4">
                      <AlertCircle size={16} />
                      <span className="text-sm">Recommended additions to complete your {category.category} wardrobe</span>
                    </div>
                    {category.gaps.map((gap, index) => (
                      <WardrobeGapCard
                        key={index}
                        gap={gap}
                        onExplore={() => onModalOpen('reserveSlot')}
                      />
                    ))}
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </div>

      {/* Shoe Collection */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-stone-800">Your Collection</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All
            </button>
            {['work', 'weekend', 'evening', 'travel'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  selectedCategory === cat
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredShoes.map((shoe) => (
            <ShoeCard
              key={shoe.id}
              shoe={shoe}
              onFeedback={() => onModalOpen('fitFeedback')}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-12 bg-gradient-to-br from-stone-50 to-stone-100 rounded-3xl p-8">
        <h3 className="text-lg font-medium text-stone-800 mb-6">Improve Your Wardrobe</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onModalOpen('reserveSlot')}
            className="p-6 bg-white rounded-2xl hover:shadow-md transition-all text-left group"
          >
            <TrendingUp className="text-amber-600 mb-3" size={28} />
            <h4 className="font-medium text-stone-900 mb-2">Fill Coverage Gaps</h4>
            <p className="text-stone-600 text-sm">Complete your wardrobe for all occasions</p>
          </button>
          
          <button
            onClick={() => onModalOpen('fitFeedback')}
            className="p-6 bg-white rounded-2xl hover:shadow-md transition-all text-left group"
          >
            <Calendar className="text-blue-600 mb-3" size={28} />
            <h4 className="font-medium text-stone-900 mb-2">Update Fit Feedback</h4>
            <p className="text-stone-600 text-sm">Help us perfect your next pair</p>
          </button>
        </div>
      </div>
    </div>
  )
}