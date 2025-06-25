export type TabType = 'today' | 'journey' | 'team' | 'wardrobe' | 'more'

export type ModalType = 
  | 'voiceMessage' 
  | 'reserveSlot' 
  | 'fitFeedback' 
  | 'liveProgress' 
  | 'bookScan'
  | 'shareInspiration'
  | 'whyThisWorks'
  | null

export interface NavigationItem {
  id: TabType
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  badge?: number
  disabled?: boolean
}

export interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}