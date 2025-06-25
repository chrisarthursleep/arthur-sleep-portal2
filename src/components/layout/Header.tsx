import { Bell } from 'lucide-react'
import { customerData } from '@/data/customer-data'

export default function Header() {
  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-stone-200 px-6 py-4 z-40">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>
          Arthur Sleep
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-stone-100 rounded-full transition-colors">
            <Bell className="text-stone-600" size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>
          <button className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center hover:bg-amber-500 transition-colors">
            <span className="font-medium text-amber-900">{customerData.initials}</span>
          </button>
        </div>
      </div>
    </header>
  )
}