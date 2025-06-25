import { NextRequest, NextResponse } from 'next/server'

// Google Weather API configuration
const GOOGLE_WEATHER_API_KEY = process.env.WEATHER_API_KEY
const GOOGLE_WEATHER_BASE_URL = 'https://weather.googleapis.com/v1/forecast/days:lookup'

// Interface for Google Weather API response
interface GoogleWeatherResponse {
  location: {
    name: string
    region: string
    country: string
  }
  current: {
    temp_c: number
    condition: {
      text: string
      code: number
    }
    humidity: number
    precip_mm: number
  }
  forecast: {
    forecastday: Array<{
      hour: Array<{
        time: string
        temp_c: number
        condition: {
          text: string
          code: number
        }
        chance_of_rain: number
      }>
    }>
  }
}

// Function to map Google Weather conditions to our internal conditions
function mapWeatherCondition(condition: string): string {
  const conditionLower = condition.toLowerCase()
  
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return 'light-rain'
  } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
    return 'cloudy'
  } else if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
    return 'sunny'
  } else if (conditionLower.includes('snow')) {
    return 'snow'
  } else {
    return 'dry'
  }
}

// Function to fetch weather data from Google Weather API
async function fetchWeatherData(location: string = 'London') {
  try {
    // Check if API key is available
    if (!GOOGLE_WEATHER_API_KEY) {
      throw new Error('Weather API key is not configured. Please check your environment variables.')
    }

    const response = await fetch(
      `${GOOGLE_WEATHER_BASE_URL}?key=${GOOGLE_WEATHER_API_KEY}&q=${encodeURIComponent(location)}&days=1&aqi=no&alerts=no`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`)
    }

    const data: GoogleWeatherResponse = await response.json()
    
    // Transform Google Weather API response to our expected format
    const transformedData = {
      temperature: Math.round(data.current.temp_c),
      condition: mapWeatherCondition(data.current.condition.text),
      humidity: data.current.humidity,
      chanceOfRain: data.forecast.forecastday[0]?.hour[0]?.chance_of_rain || 0,
      forecast: data.forecast.forecastday[0]?.hour
        .filter((_, index) => index % 3 === 0) // Take every 3rd hour for 4 data points
        .slice(0, 4)
        .map(hour => ({
          time: new Date(hour.time).toLocaleTimeString('en-GB', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          temp: Math.round(hour.temp_c),
          condition: mapWeatherCondition(hour.condition.text)
        })) || []
    }

    return transformedData
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}

// Shoe recommendations based on weather
const weatherRecommendations = {
  'light-rain': {
    primary: {
      name: 'The Pablo',
      style: 'City Shoe',
      color: 'Chocolate Suede',
      features: ['Water-resistant', 'All-day comfort'],
      matchScore: 96,
      reasoning: "Perfect for today's weather with your Mayfair meetings. The treated suede handles light rain beautifully whilst maintaining elegance."
    },
    alternatives: [
      {
        name: 'The Chelsea',
        style: 'Chelsea Boot',
        color: 'Black',
        matchScore: 92
      },
      {
        name: 'The Traveller',
        style: 'Derby',
        color: 'Brown',
        matchScore: 88
      }
    ]
  },
  'cloudy': {
    primary: {
      name: 'The Kensington',
      style: 'Brogue Oxford',
      color: 'Tan',
      features: ['Versatile styling', 'Weather-appropriate'],
      matchScore: 94,
      reasoning: "Excellent choice for overcast conditions. The rich tan leather complements the muted lighting whilst maintaining sophistication."
    },
    alternatives: [
      {
        name: 'The Mayfair',
        style: 'Oxford Cap-Toe',
        color: 'Black',
        matchScore: 90
      }
    ]
  },
  'sunny': {
    primary: {
      name: 'The Piccadilly',
      style: 'Loafer',
      color: 'Cognac',
      features: ['Breathable leather', 'Elegant casual'],
      matchScore: 95,
      reasoning: "Perfect for bright weather. The cognac leather gains beautiful patina in natural light, ideal for outdoor meetings."
    },
    alternatives: []
  },
  'dry': {
    primary: {
      name: 'The Mayfair',
      style: 'Oxford Cap-Toe',
      color: 'Black',
      features: ['Classic elegance', 'Business appropriate'],
      matchScore: 98,
      reasoning: "Ideal for your formal meetings today. The box calf leather maintains its pristine appearance throughout the day."
    },
    alternatives: []
  }
}

export async function GET(request: NextRequest) {
  try {
    // Extract location from query parameters, default to London
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') || 'London'

    // Fetch real weather data from Google Weather API
    const weather = await fetchWeatherData(location)
    
    // Get appropriate shoe recommendation based on weather condition
    const recommendation = weatherRecommendations[weather.condition as keyof typeof weatherRecommendations] 
      || weatherRecommendations.dry

    return NextResponse.json({
      weather,
      recommendation,
      location,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Weather API error:', error)
    
    // Return fallback response if weather API fails
    return NextResponse.json(
      { 
        error: 'Failed to fetch weather data',
        fallback: {
          weather: {
            temperature: 15,
            condition: 'dry',
            humidity: 65,
            chanceOfRain: 10,
            forecast: []
          },
          recommendation: weatherRecommendations.dry
        }
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerId, preferences, location } = body

    // Validate required fields
    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      )
    }

    // Fetch current weather for customer's location
    const weather = await fetchWeatherData(location || 'London')
    
    // In production, you would:
    // 1. Validate the customer ID against your database
    // 2. Fetch customer's shoe collection and preferences
    // 3. Store updated preferences
    // 4. Analyse weather patterns for better recommendations
    // 5. Generate personalised recommendation based on their collection

    return NextResponse.json({
      success: true,
      message: 'Preferences updated successfully',
      currentWeather: weather,
      location: location || 'London'
    })
  } catch (error) {
    console.error('Weather preferences error:', error)
    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 500 }
    )
  }
}