/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: [
      'localhost',
      'arthur-sleep.com',
      'images.unsplash.com', // If using placeholder images
      'res.cloudinary.com'   // If using Cloudinary
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WEATHER_API_KEY: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
  },
  
  // Internationalization (British English)
  i18n: {
    locales: ['en-GB'],
    defaultLocale: 'en-GB',
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/portal',
        destination: '/',
        permanent: true,
      },
    ]
  },
  
  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Audio file handling for voice messages
    config.module.rules.push({
      test: /\.(mp3|wav|webm|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/audio/',
          outputPath: 'static/audio/',
          name: '[name].[hash].[ext]',
        },
      },
    })
    
    return config
  },
  
  // Performance optimizations
  swcMinify: true,
  
  // Experimental features
  experimental: {
    // Enable if using app directory
    typedRoutes: true,
  },
  
  // Output configuration for Vercel
  output: 'standalone',
}

module.exports = nextConfig