import withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  fallbacks: {
    // Failed page requests fallback to this.
    document: '/~offline'
    // This is for /_next/.../.json files.
    // data: '/fallback.json'
    // This is for images.
    // image: '/fallback.webp',
    // This is for audio files.
    // audio: '/fallback.mp3',
    // This is for video files.
    // video: '/fallback.mp4'
    // This is for fonts.
    // font: '/fallback-font.woff2'
  },
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /\/downloads/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'download-page',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
          }
        }
      }
    ]
  },
  cacheStartUrl: false,
  dynamicStartUrl: false,
  cacheOnFrontendNav: false
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/kanjigami-61289.appspot.com/o/**'
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/kanjigami-61289.appspot.com/images/**'
      },
      // TODO: Remove this after migration
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        port: '',
        pathname: '/**'
      },
      // TODO: Remove this after migration
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default withPWA(nextConfig)
