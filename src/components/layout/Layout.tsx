import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'
import { TabType } from '@/types/navigation'

interface LayoutProps {
  children: React.ReactNode
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      {/* Desktop Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      
      {/* Main Content */}
      <main className="pb-24 md:pb-0 md:pl-72">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}