import { Home, Package, MessageCircle, Star, Menu } from 'lucide-react'
import { TabType } from '@/types/navigation'

interface SidebarProps {
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

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="hidden md:block fixed left-0 top-20 bottom-0 w-72 bg-white border-r border-stone-200 z-40">
      <div className="p-6">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 text-left rounded-2xl transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-amber-50 text-amber-900 border border-amber-200 shadow-sm'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <item.icon size={22} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}