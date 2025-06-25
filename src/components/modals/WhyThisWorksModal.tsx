import { CloudRain, Calendar, Star, Award, Shield, Footprints } from 'lucide-react'

interface WhyThisWorksModalProps {
  onClose: () => void
}

export default function WhyThisWorksModal({ onClose }: WhyThisWorksModalProps) {
  const reasons = [
    {
      icon: CloudRain,
      title: 'Weather Optimised',
      description: 'Water-resistant treatment provides excellent protection against light rain showers while maintaining breathability.',
      color: 'blue'
    },
    {
      icon: Calendar,
      title: 'Schedule Aligned',
      description: 'Perfect for your 2pm client meeting and transitions seamlessly to dinner at Sketch.',
      color: 'green'
    },
    {
      icon: Star,
      title: '96% Confidence Match',
      description: 'Based on your personal measurements, weather conditions, and daily schedule requirements.',
      color: 'purple'
    },
    {
      icon: Footprints,
      title: 'Historical Fit Data',
      description: 'Similar styles have achieved 94%+ satisfaction in your collection.',
      color: 'amber'
    },
    {
      icon: Award,
      title: 'Premium Versatility',
      description: 'Chocolate suede offers sophisticated flexibility for business and social occasions.',
      color: 'orange'
    },
    {
      icon: Shield,
      title: 'Durability Tested',
      description: 'This construction method has proven exceptional longevity in London conditions.',
      color: 'stone'
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600'
      case 'green':
        return 'bg-green-50 text-green-600'
      case 'purple':
        return 'bg-purple-50 text-purple-600'
      case 'amber':
        return 'bg-amber-50 text-amber-600'
      case 'orange':
        return 'bg-orange-50 text-orange-600'
      default:
        return 'bg-stone-50 text-stone-600'
    }
  }

  const getTextColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'text-blue-900'
      case 'green':
        return 'text-green-900'
      case 'purple':
        return 'text-purple-900'
      case 'amber':
        return 'text-amber-900'
      case 'orange':
        return 'text-orange-900'
      default:
        return 'text-stone-900'
    }
  }

  const getDescColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'text-blue-800'
      case 'green':
        return 'text-green-800'
      case 'purple':
        return 'text-purple-800'
      case 'amber':
        return 'text-amber-800'
      case 'orange':
        return 'text-orange-800'
      default:
        return 'text-stone-800'
    }
  }

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h4 className="text-lg font-medium text-stone-800 mb-2">
          Why The Belgrave Works Today
        </h4>
        <p className="text-stone-600 text-sm">
          Rebecca's analysis based on your preferences and conditions
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className={`rounded-2xl p-4 ${getColorClasses(reason.color).split(' ')[0]}`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${getColorClasses(reason.color)}`}>
                <reason.icon size={20} />
              </div>
              <div className="flex-1">
                <h5 className={`font-medium mb-1 ${getTextColorClasses(reason.color)}`}>
                  {reason.title}
                </h5>
                <p className={`text-sm ${getDescColorClasses(reason.color)}`}>
                  {reason.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Personal Note */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 mb-6">
        <p className="text-amber-800 italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          "I've noticed you tend to prefer darker tones for business meetings. The chocolate 
          suede strikes the perfect balance between professional and distinctive - it's a 
          shade that works beautifully with your navy and charcoal suits."
        </p>
        <p className="text-amber-700 text-sm">- Rebecca's personal note</p>
      </div>

      {/* Confidence Score Breakdown */}
      <div className="bg-stone-50 rounded-2xl p-5">
        <h5 className="font-medium text-stone-900 mb-3">Confidence Score Breakdown</h5>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-stone-600 text-sm">Weather Match</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-stone-200 rounded-full h-2">
                <div className="w-[92%] bg-amber-500 h-2 rounded-full"></div>
              </div>
              <span className="text-stone-700 text-sm font-medium">92%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-stone-600 text-sm">Style Compatibility</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-stone-200 rounded-full h-2">
                <div className="w-[98%] bg-amber-500 h-2 rounded-full"></div>
              </div>
              <span className="text-stone-700 text-sm font-medium">98%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-stone-600 text-sm">Comfort Prediction</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-stone-200 rounded-full h-2">
                <div className="w-[94%] bg-amber-500 h-2 rounded-full"></div>
              </div>
              <span className="text-stone-700 text-sm font-medium">94%</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <span className="font-medium text-stone-900">Overall Match</span>
            <span className="text-2xl font-light text-amber-600">96%</span>
          </div>
        </div>
      </div>
    </div>
  )
}