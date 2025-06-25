Arthur Sleep Portal - Testing Guide
Test Structure
tests/
├── components/        # Unit tests for individual components
├── integration/       # Integration tests for full user flows
├── jest.setup.js     # Jest configuration and global mocks
└── README.md         # This file
Running Tests
bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test Button.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="navigation"
Writing Tests
Component Tests
Test individual components in isolation:
typescript
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import YourComponent from '@/components/YourComponent'

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
Integration Tests
Test complete user flows:
typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Portal from '@/app/page'

describe('User Flow', () => {
  it('completes order feedback flow', async () => {
    render(<Portal />)
    // Test multi-step user interaction
  })
})
Test Configuration
jest.config.js (create in root)
javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/tests/**',
  ],
}
Required Dependencies
bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event babel-jest identity-obj-proxy
Mocked APIs
The following are mocked in tests:
navigator.mediaDevices - For voice recording
MediaRecorder - For audio capture
fetch - For API calls
IntersectionObserver - For viewport detection
window.matchMedia - For responsive design
Best Practices
Test user behaviour, not implementation
Focus on what users see and do
Avoid testing internal state
Use semantic queries
Prefer getByRole, getByLabelText
Use getByTestId sparingly
Wait for async operations
typescript
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument()
})
Mock external dependencies
API calls
Browser APIs
Third-party libraries
Test accessibility
Ensure interactive elements are keyboard accessible
Check ARIA labels
Common Test Patterns
Testing Modals
typescript
// Open modal
fireEvent.click(screen.getByText('Open Modal'))
await waitFor(() => {
  expect(screen.getByRole('dialog')).toBeInTheDocument()
})

// Close modal
fireEvent.click(screen.getByLabelText('Close'))
await waitFor(() => {
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
Testing Forms
typescript
// Fill form
fireEvent.change(screen.getByLabelText('Email'), {
  target: { value: 'test@example.com' }
})

// Submit form
fireEvent.click(screen.getByText('Submit'))

// Check result
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument()
})
Testing Navigation
typescript
// Click nav item
fireEvent.click(screen.getByText('My Team'))

// Verify navigation
await waitFor(() => {
  expect(screen.getByText('Team content')).toBeInTheDocument()
})
Debugging Tests
typescript
// Print the DOM
screen.debug()

// Print specific element
screen.debug(screen.getByText('Button'))

// Use queries that show better error messages
screen.getByRole('button', { name: /submit/i })
