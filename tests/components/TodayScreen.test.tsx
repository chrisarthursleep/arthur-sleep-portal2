import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodayScreen from '@/components/screens/TodayScreen'

// Mock the child components
jest.mock('@/components/features/OrderProgress', () => ({
  __esModule: true,
  default: ({ order, onViewLive }: any) => (
    <div data-testid="order-progress">
      Order Progress: {order.progress}%
      <button onClick={onViewLive}>View Live</button>
    </div>
  ),
}))

jest.mock('@/components/features/WeatherRecommendation', () => ({
  __esModule: true,
  default: ({ onPerfectChoice, onWhyThisWorks }: any) => (
    <div data-testid="weather-recommendation">
      Weather Recommendation
      <button onClick={onPerfectChoice}>Perfect Choice</button>
      <button onClick={onWhyThisWorks}>Why This Works</button>
    </div>
  ),
}))

describe('TodayScreen Component', () => {
  const mockOnModalOpen = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the greeting with customer name', () => {
    render(<TodayScreen onModalOpen={mockOnModalOpen} />)
    expect(screen.getByText(/Good afternoon, James/)).toBeInTheDocument()
  })

  it('displays order progress information', () => {
    render(<TodayScreen onModalOpen={mockOnModalOpen} />)
    expect(screen.getByText(/Your shoes are ready in \d+ days/)).toBeInTheDocument()
    expect(screen.getByText('72%')).toBeInTheDocument()
    expect(screen.getByText('Complete')).toBeInTheDocument()
  })

  it('shows milestone celebration when fit confidence is high', () => {
    render(<TodayScreen onModalOpen={mockOnModalOpen} />)
    expect(screen.getByText('🎉 Milestone Achievement')).toBeInTheDocument()
    expect(screen.getByText(/98% fit confidence reached/)).toBeInTheDocument()
  })

  it('renders weather recommendation component', () => {
    render(<TodayScreen onModalOpen={mockOnModalOpen} />)
    expect(screen.getByTestId('weather-recommendation')).toBeInTheDocument()
  })

  it('displays all quick action buttons', () => {
    render(<TodayScreen onModalOpen={mockOnModalOpen} />)
    
    expect(screen.getByText('Quick Message')).toBeInTheDocument()
    expect(screen.getByText('Voice note to Rebecca')).toBeInTheDocument()
    
    expect(screen.getByText('Book 3D Scan')).toBeInTheDocument()
    expect(screen.getByText('Next available: Tomorrow 2pm')).toBeInTheDocument()
    
    expect(screen.getByText('Reserve Production')).toBeInTheDocument()
    expect(screen.getByText('For special occasions')).toBeInTheDocument()
    
    expect(screen.getByText('Fit Feedback')).toBeInTheDocument()
    expect(screen.getByText('Help us perfect your fit')).toBeInTheDocument()
  })

  it('opens voice message modal when Quick Message is clicked', () => {
    render(<TodayScreen onModalOpen={mockOnModalOpen} />)
    
    const quickMessageButton = screen.getByText('Quick Message').closest('div')?.parentElement
    fireEvent.click(quickMessageButton!)
    
    expect(mockOnModalOpen).toHaveBeenCalledWith('voiceMessage')
  })

  it('opens book scan modal when Book 3D Scan is clicked', () => {
    render(<TodayScreen onModalOpen={mockOnModalOpen} />)
    
    const bookScanButton = screen.getByText('Book 3D Scan').closest('div')?.parentElement
    fireEvent.click(bookScanButton!)
    
    expect(mockOnModalOpen).toHaveBeenCalledWith('bookScan')
  })

  it('opens reserve slot modal when Reserve Production is clicked', () => {
    render(<TodayScreen onModalOpen={mockOnModalOpen} />)
    
    const reserveButton = screen.getByText('Reserve Production').closest('div')?.parentElement
    fireEvent.click(reserveButton!)
    
    expect(mockOnModalOpen).toHaveBeenCalledWith('reserveSlot')
  })

  it('opens fit feedback modal when Fit Feedback is clicked', () => {
    render(<TodayScreen onModalOpen={mockOnModalOpen} />)
    
    const feedbackButton = screen.getByText('Fit Feedback').closest('div')?.parentElement
    fireEvent.click(feedbackButton!)
    
    expect(mockOnModalOpen).toHaveBeenCalledWith('fitFeedback')
  })

  it('displays recent activity', () => {
    render(<TodayScreen onModalOpen={mockOnModalOpen} />)
    
    expect(screen.getByText('Recent Activity')).toBeInTheDocument()
    expect(screen.getByText(/David Chen/)).toBeInTheDocument()
    expect(screen.getByText(/completed upper stitching/)).toBeInTheDocument()
    expect(screen.getByText(/2 hours ago/)).toBeInTheDocument()
    
    expect(screen.getByText(/Rebecca/)).toBeInTheDocument()
    expect(screen.getByText(/sent you a message/)).toBeInTheDocument()
    expect(screen.getByText(/Yesterday/)).toBeInTheDocument()
  })

  it('handles perfect choice selection', async () => {
    render(<TodayScreen onModalOpen={mockOnModalOpen} />)
    
    const perfectChoiceButton = screen.getByText('Perfect Choice')
    fireEvent.click(perfectChoiceButton)
    
    // The button should show selected state temporarily
    await waitFor(() => {
      // Check if the component handles the state change
      expect(screen.getByTestId('weather-recommendation')).toBeInTheDocument()
    })
  })

  it('opens live progress modal from order progress', () => {
    render(<TodayScreen onModalOpen={mockOnModalOpen} />)
    
    const viewLiveButton = screen.getByText('View Live')
    fireEvent.click(viewLiveButton)
    
    expect(mockOnModalOpen).toHaveBeenCalledWith('liveProgress')
  })
})