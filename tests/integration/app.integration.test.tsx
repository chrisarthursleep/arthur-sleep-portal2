import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Portal from '@/app/page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
}))

// Mock API client
jest.mock('@/lib/api-client', () => ({
  apiClient: {
    getCustomer: jest.fn().mockResolvedValue({ data: { name: 'James' } }),
    getOrders: jest.fn().mockResolvedValue({ data: { orders: [] } }),
    getMessages: jest.fn().mockResolvedValue({ data: { messages: [] } }),
  },
  mockApi: {
    getWeather: jest.fn().mockResolvedValue({ temperature: 16 }),
    getRecommendation: jest.fn().mockResolvedValue({ shoe: {} }),
  },
}))

describe('Portal Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the portal with default Today screen', () => {
    render(<Portal />)
    
    // Check header is present
    expect(screen.getByText('Arthur Sleep')).toBeInTheDocument()
    
    // Check navigation is present
    expect(screen.getByText('Today')).toBeInTheDocument()
    expect(screen.getByText('My Journey')).toBeInTheDocument()
    expect(screen.getByText('My Team')).toBeInTheDocument()
    expect(screen.getByText('My Wardrobe')).toBeInTheDocument()
    expect(screen.getByText('More')).toBeInTheDocument()
    
    // Check Today screen content is visible
    expect(screen.getByText(/Good afternoon/)).toBeInTheDocument()
  })

  it('navigates between screens', async () => {
    render(<Portal />)
    
    // Navigate to My Journey
    fireEvent.click(screen.getByText('My Journey'))
    await waitFor(() => {
      expect(screen.getByText('Track every step of your bespoke shoe creation')).toBeInTheDocument()
    })
    
    // Navigate to My Team
    fireEvent.click(screen.getByText('My Team'))
    await waitFor(() => {
      expect(screen.getByText('The craftspeople bringing your vision to life')).toBeInTheDocument()
    })
    
    // Navigate to My Wardrobe
    fireEvent.click(screen.getByText('My Wardrobe'))
    await waitFor(() => {
      expect(screen.getByText('Your complete shoe collection and life coverage analysis')).toBeInTheDocument()
    })
    
    // Navigate to More
    fireEvent.click(screen.getByText('More'))
    await waitFor(() => {
      expect(screen.getByText('Manage your account and access premium services')).toBeInTheDocument()
    })
    
    // Navigate back to Today
    fireEvent.click(screen.getByText('Today'))
    await waitFor(() => {
      expect(screen.getByText(/Good afternoon/)).toBeInTheDocument()
    })
  })

  it('opens and closes modals', async () => {
    render(<Portal />)
    
    // Open voice message modal
    const quickMessageButton = screen.getByText('Quick Message').closest('div')?.parentElement
    fireEvent.click(quickMessageButton!)
    
    await waitFor(() => {
      expect(screen.getByText('Send a Message')).toBeInTheDocument()
    })
    
    // Close modal
    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)
    
    await waitFor(() => {
      expect(screen.queryByText('Send a Message')).not.toBeInTheDocument()
    })
  })

  it('maintains active tab state in navigation', () => {
    render(<Portal />)
    
    // Check Today is active by default
    const todayButton = screen.getAllByText('Today')[0].parentElement
    expect(todayButton).toHaveClass('bg-amber-50')
    
    // Navigate to My Journey
    fireEvent.click(screen.getByText('My Journey'))
    
    // Check My Journey is now active
    const journeyButton = screen.getAllByText('My Journey')[0].parentElement
    expect(journeyButton).toHaveClass('bg-amber-50')
    
    // Check Today is no longer active
    const todayButtonAfter = screen.getAllByText('Today')[0].parentElement
    expect(todayButtonAfter).not.toHaveClass('bg-amber-50')
  })

  it('shows customer initials in header', () => {
    render(<Portal />)
    expect(screen.getByText('JW')).toBeInTheDocument()
  })

  it('handles modal backdrop click to close', async () => {
    render(<Portal />)
    
    // Open a modal
    const quickMessageButton = screen.getByText('Quick Message').closest('div')?.parentElement
    fireEvent.click(quickMessageButton!)
    
    await waitFor(() => {
      expect(screen.getByText('Send a Message')).toBeInTheDocument()
    })
    
    // Click backdrop
    const backdrop = document.querySelector('.fixed.inset-0')
    if (backdrop) {
      fireEvent.click(backdrop)
    }
    
    await waitFor(() => {
      expect(screen.queryByText('Send a Message')).not.toBeInTheDocument()
    })
  })

  it('responsive navigation works on mobile', () => {
    // Mock mobile viewport
    global.innerWidth = 375
    global.innerHeight = 667
    
    render(<Portal />)
    
    // Mobile nav should be visible
    const mobileNav = document.querySelector('nav.fixed.bottom-0')
    expect(mobileNav).toBeInTheDocument()
    
    // Desktop sidebar should be hidden
    const desktopSidebar = document.querySelector('aside.hidden.md\\:block')
    expect(desktopSidebar).toBeInTheDocument()
  })
})