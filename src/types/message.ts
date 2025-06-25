export interface Message {
  id: string
  from: string // user ID or team member ID
  to: string // user ID or team member ID
  content: string
  type: MessageType
  timestamp: Date
  read: boolean
  duration?: number // for voice messages in seconds
  attachments?: MessageAttachment[]
  threadId?: string
  replyTo?: string // message ID being replied to
  status?: MessageStatus
  metadata?: MessageMetadata
}

export type MessageType = 'text' | 'voice' | 'image' | 'video' | 'document'

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed'

export interface MessageAttachment {
  id: string
  type: AttachmentType
  url: string
  filename: string
  size: number // in bytes
  mimeType: string
  thumbnail?: string
  duration?: number // for audio/video in seconds
  dimensions?: {
    width: number
    height: number
  }
}

export type AttachmentType = 'image' | 'document' | 'audio' | 'video' | 'other'

export interface MessageMetadata {
  orderId?: string
  shoeId?: string
  appointmentId?: string
  category?: MessageCategory
  priority?: 'normal' | 'high' | 'urgent'
  sentiment?: 'positive' | 'neutral' | 'negative'
  tags?: string[]
}

export type MessageCategory = 
  | 'order-update'
  | 'fit-feedback'
  | 'style-consultation'
  | 'appointment'
  | 'general-inquiry'
  | 'complaint'
  | 'compliment'

export interface MessageThread {
  id: string
  participants: string[]
  subject?: string
  lastMessage: Message
  messageCount: number
  unreadCount: number
  createdAt: Date
  updatedAt: Date
  category?: MessageCategory
  status: ThreadStatus
  orderId?: string
}

export type ThreadStatus = 'active' | 'resolved' | 'archived' | 'waiting'

export interface QuickReply {
  id: string
  text: string
  category: MessageCategory
  usage: number
  lastUsed?: Date
}

export interface MessageTemplate {
  id: string
  name: string
  content: string
  variables?: TemplateVariable[]
  category: MessageCategory
  teamMemberId?: string
}

export interface TemplateVariable {
  key: string
  description: string
  defaultValue?: string
  required: boolean
}