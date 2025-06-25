'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import TodayScreen from '@/components/screens/TodayScreen'
import MyJourney from '@/components/screens/MyJourney'
import MyTeam from '@/components/screens/MyTeam'
import MyWardrobe from '@/components/screens/MyWardrobe'
import MoreScreen from '@/components/screens/MoreScreen'
import Modal from '@/components/modals/Modal'
import { TabType, ModalType } from '@/types/navigation'

export default function Portal() {
  const [activeTab, setActiveTab] = useState<TabType>('today')
  const [showModal, setShowModal] = useState<ModalType | null>(null)

  const renderScreen = () => {
    switch (activeTab) {
      case 'today':
        return <TodayScreen onModalOpen={setShowModal} />
      case 'journey':
        return <MyJourney onModalOpen={setShowModal} />
      case 'team':
        return <MyTeam onModalOpen={setShowModal} />
      case 'wardrobe':
        return <MyWardrobe onModalOpen={setShowModal} />
      case 'more':
        return <MoreScreen onModalOpen={setShowModal} />
      default:
        return <TodayScreen onModalOpen={setShowModal} />
    }
  }

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderScreen()}
      <Modal type={showModal} onClose={() => setShowModal(null)} />
    </Layout>
  )
}