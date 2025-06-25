import { useState } from 'react'
import { MessageCircle, Phone, Calendar, Award, Clock, Star } from 'lucide-react'
import TeamMemberCard from '@/components/features/TeamMemberCard'
import Button from '@/components/ui/Button'
import { ModalType } from '@/types/navigation'
import { teamData } from '@/data/team-data'

interface MyTeamProps {
  onModalOpen: (modal: ModalType) => void
}

export default function MyTeam({ onModalOpen }: MyTeamProps) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  const handleMemberClick = (memberId: string) => {
    setSelectedMember(selectedMember === memberId ? null : memberId)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 animate-slide-up">
      <div className="mb-8">
        <h2 className="text-3xl font-light text-stone-800 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          My Team
        </h2>
        <p className="text-stone-600 text-lg">
          The craftspeople bringing your vision to life
        </p>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {teamData.map((member) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            isExpanded={selectedMember === member.id}
            onClick={() => handleMemberClick(member.id)}
            onMessage={() => onModalOpen('voiceMessage')}
          />
        ))}
      </div>

      {/* Detailed View */}
      {selectedMember && (
        <div className="bg-white rounded-3xl border border-stone-200 p-8 animate-slide-up">
          {(() => {
            const member = teamData.find(m => m.id === selectedMember)
            if (!member) return null

            return (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-medium text-stone-900 mb-2">{member.name}</h3>
                    <p className="text-stone-600">{member.role}</p>
                    <p className="text-amber-600 font-medium">{member.specialty}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-stone-600 text-sm">Available</span>
                  </div>
                </div>

                <div className="prose prose-stone mb-8 max-w-none">
                  <p className="text-stone-700">{member.bio}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <Award className="mx-auto mb-2 text-amber-600" size={32} />
                    <div className="text-2xl font-light text-stone-900">{member.stats.pairsMade}</div>
                    <p className="text-stone-600 text-sm">Pairs Made</p>
                  </div>
                  <div className="text-center">
                    <Clock className="mx-auto mb-2 text-amber-600" size={32} />
                    <div className="text-2xl font-light text-stone-900">{member.stats.yearsExperience}</div>
                    <p className="text-stone-600 text-sm">Years Experience</p>
                  </div>
                  <div className="text-center">
                    <Star className="mx-auto mb-2 text-amber-600" size={32} />
                    <div className="text-2xl font-light text-stone-900">{member.stats.customerRating}</div>
                    <p className="text-stone-600 text-sm">Customer Rating</p>
                  </div>
                </div>

                {/* Expertise */}
                <div className="mb-8">
                  <h4 className="font-medium text-stone-900 mb-4">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-amber-50 text-amber-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Personal Note */}
                {member.personalNote && (
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-8">
                    <h4 className="font-medium text-amber-900 mb-2">Personal Note</h4>
                    <p className="text-amber-800 italic">"{member.personalNote}"</p>
                  </div>
                )}

                {/* Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="primary"
                    onClick={() => onModalOpen('voiceMessage')}
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Send Message
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex items-center justify-center gap-2"
                  >
                    <Phone size={18} />
                    Schedule Call
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => onModalOpen('bookScan')}
                    className="flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} />
                    Book Meeting
                  </Button>
                </div>

                {/* Response Time */}
                <p className="text-center text-stone-500 text-sm mt-4">
                  {member.name.split(' ')[0]} typically responds within {member.responseTime}
                </p>
              </>
            )
          })()}
        </div>
      )}

      {/* Quick Messages */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-stone-800 mb-4">Suggested Messages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onModalOpen('voiceMessage')}
            className="p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors text-left"
          >
            <p className="font-medium text-stone-900 mb-1">Check on my order</p>
            <p className="text-stone-600 text-sm">Ask about current progress and timeline</p>
          </button>
          <button
            onClick={() => onModalOpen('shareInspiration')}
            className="p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors text-left"
          >
            <p className="font-medium text-stone-900 mb-1">Share inspiration</p>
            <p className="text-stone-600 text-sm">Send style references or ideas</p>
          </button>
          <button
            onClick={() => onModalOpen('voiceMessage')}
            className="p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors text-left"
          >
            <p className="font-medium text-stone-900 mb-1">Discuss next pair</p>
            <p className="text-stone-600 text-sm">Start planning your next creation</p>
          </button>
          <button
            onClick={() => onModalOpen('bookScan')}
            className="p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors text-left"
          >
            <p className="font-medium text-stone-900 mb-1">Schedule consultation</p>
            <p className="text-stone-600 text-sm">Book time with your team</p>
          </button>
        </div>
      </div>
    </div>
  )
}