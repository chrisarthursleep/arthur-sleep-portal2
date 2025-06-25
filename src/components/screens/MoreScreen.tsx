import { Phone, Mail, MapPin, Gift, User, Settings, Bell, Shield, ChevronRight, Award, Calendar } from 'lucide-react'
import Card from '@/components/ui/Card'
import { ModalType } from '@/types/navigation'
import { customerData } from '@/data/customer-data'

interface MoreScreenProps {
  onModalOpen: (modal: ModalType) => void
}

export default function MoreScreen({ onModalOpen }: MoreScreenProps) {
  const membershipYears = new Date().getFullYear() - customerData.memberSince.getFullYear()

  return (
    <div className="max-w-4xl mx-auto p-6 animate-slide-up">
      <div className="mb-8">
        <h2 className="text-3xl font-light text-stone-800 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          Settings & Services
        </h2>
        <p className="text-stone-600 text-lg">
          Manage your account and access premium services
        </p>
      </div>

      <div className="space-y-6">
        {/* Quick Services */}
        <Card className="p-8">
          <h3 className="text-xl font-medium text-stone-800 mb-6">Quick Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-6 bg-amber-50 rounded-2xl hover:bg-amber-100 transition-all text-left">
              <Phone className="text-amber-700 mb-3" size={28} />
              <h4 className="font-medium text-amber-950 mb-2">Call Your Team</h4>
              <p className="text-amber-700 text-sm">Direct line to Rebecca</p>
              <p className="text-amber-600 text-xs mt-2">+44 20 7123 4567</p>
            </button>

            <button className="p-6 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-all text-left">
              <Mail className="text-blue-700 mb-3" size={28} />
              <h4 className="font-medium text-blue-950 mb-2">Email Support</h4>
              <p className="text-blue-700 text-sm">For detailed enquiries</p>
              <p className="text-blue-600 text-xs mt-2">support@arthursleep.com</p>
            </button>

            <button 
              onClick={() => onModalOpen('bookScan')}
              className="p-6 bg-green-50 rounded-2xl hover:bg-green-100 transition-all text-left"
            >
              <MapPin className="text-green-700 mb-3" size={28} />
              <h4 className="font-medium text-green-950 mb-2">Visit Mount Street</h4>
              <p className="text-green-700 text-sm">Book an appointment</p>
              <p className="text-green-600 text-xs mt-2">Mayfair, London</p>
            </button>

            <button 
              onClick={() => onModalOpen('reserveSlot')}
              className="p-6 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-all text-left"
            >
              <Gift className="text-purple-700 mb-3" size={28} />
              <h4 className="font-medium text-purple-950 mb-2">Gift a Pair</h4>
              <p className="text-purple-700 text-sm">Share the experience</p>
              <p className="text-purple-600 text-xs mt-2">From £2,850</p>
            </button>
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="p-8">
          <h3 className="text-xl font-medium text-stone-800 mb-6">Account Settings</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-stone-50 rounded-2xl hover:bg-stone-100 transition-colors">
              <div className="flex items-center gap-3">
                <User className="text-stone-600" size={20} />
                <span className="text-stone-800 font-medium">Personal Information</span>
              </div>
              <ChevronRight className="text-stone-400" size={20} />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-stone-50 rounded-2xl hover:bg-stone-100 transition-colors">
              <div className="flex items-center gap-3">
                <Settings className="text-stone-600" size={20} />
                <span className="text-stone-800 font-medium">Preferences</span>
              </div>
              <ChevronRight className="text-stone-400" size={20} />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-stone-50 rounded-2xl hover:bg-stone-100 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="text-stone-600" size={20} />
                <span className="text-stone-800 font-medium">Notifications</span>
              </div>
              <ChevronRight className="text-stone-400" size={20} />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-stone-50 rounded-2xl hover:bg-stone-100 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="text-stone-600" size={20} />
                <span className="text-stone-800 font-medium">Privacy & Security</span>
              </div>
              <ChevronRight className="text-stone-400" size={20} />
            </button>
          </div>
        </Card>

        {/* Membership Information */}
        <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-medium text-amber-900">Membership Status</h3>
              <p className="text-amber-700">Established Member</p>
            </div>
            <Award className="text-amber-600" size={40} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center">
              <Calendar className="mx-auto mb-2 text-amber-700" size={24} />
              <div className="text-2xl font-light text-amber-900">{membershipYears}</div>
              <p className="text-amber-700 text-sm">Years</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-light text-amber-900">{customerData.totalPairs}</div>
              <p className="text-amber-700 text-sm">Pairs Created</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-light text-amber-900">{customerData.averageFitConfidence}%</div>
              <p className="text-amber-700 text-sm">Avg Fit Score</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/40 backdrop-blur-sm rounded-xl">
            <p className="text-amber-800 text-sm italic text-center">
              "Thank you for being part of the Arthur Sleep family. Your journey with us is what makes each pair special."
            </p>
            <p className="text-amber-700 text-sm text-center mt-2">- The Arthur Sleep Team</p>
          </div>
        </div>

        {/* Contact Information */}
        <Card className="p-8">
          <h3 className="text-xl font-medium text-stone-800 mb-6">Contact Information</h3>
          <div className="space-y-4 text-stone-700">
            <div>
              <p className="font-medium text-stone-900 mb-1">Mount Street Atelier</p>
              <p className="text-sm">42 Mount Street, Mayfair</p>
              <p className="text-sm">London W1K 2RN</p>
            </div>
            <div>
              <p className="font-medium text-stone-900 mb-1">Opening Hours</p>
              <p className="text-sm">Monday - Friday: 10:00 - 18:00</p>
              <p className="text-sm">Saturday: 10:00 - 17:00</p>
              <p className="text-sm">Sunday: By appointment only</p>
            </div>
            <div>
              <p className="font-medium text-stone-900 mb-1">Direct Contact</p>
              <p className="text-sm">Phone: +44 20 7123 4567</p>
              <p className="text-sm">Email: hello@arthursleep.com</p>
              <p className="text-sm">WhatsApp: +44 7700 900123</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}