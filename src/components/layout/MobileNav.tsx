import { Home, Package, MessageCircle, Star, Menu } from 'lucide-react'
import { TabType } from '@/types/navigation'

interface MobileNavProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const navItems = [
  { id: 'today' as TabType, label: 'Today', icon: Home },
  { id: 'journey' as TabType, label: 'My Journey', icon: Package },
  { id: 'team' as TabType, label: 'My Team', icon: MessageCircle },
  { id: 'wardrobe' as TabType, label: 'My Wardrobe', icon: Star },
  { id: 'more' as TabType, label: 'More', icon: Menu }
]

export default function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-3 z-50 md:hidden">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
              activeTab === item.id ? 'text-amber-600 bg-amber-50' : 'text-stone-600'
            }`}
          >
            <item.icon size={22} className="mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}