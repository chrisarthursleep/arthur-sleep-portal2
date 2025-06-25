import { MessageCircle, ChevronDown } from 'lucide-react'
import Card from '@/components/ui/Card'
import { TeamMember } from '@/types/team'

interface TeamMemberCardProps {
  member: TeamMember
  isExpanded: boolean
  onClick: () => void
  onMessage: () => void
}

export default function TeamMemberCard({ 
  member, 
  isExpanded, 
  onClick, 
  onMessage 
}: TeamMemberCardProps) {
  return (
    <Card 
      className="p-6 cursor-pointer hover:shadow-md transition-all"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
          <span className="text-2xl font-light text-amber-800">
            {member.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <ChevronDown 
          className={`text-stone-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          size={20} 
        />
      </div>
      
      <h4 className="font-medium text-stone-900 mb-1">{member.name}</h4>
      <p className="text-stone-600 text-sm mb-2">{member.role}</p>
      <p className="text-amber-600 text-sm font-medium mb-4">{member.specialty}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {member.available ? (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-stone-600 text-xs">Available</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-stone-400 rounded-full"></div>
              <span className="text-stone-600 text-xs">Busy</span>
            </>
          )}
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation()
            onMessage()
          }}
          className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
        >
          <MessageCircle className="text-stone-600" size={18} />
        </button>
      </div>
    </Card>
  )
}