import withPWAInit from '@ducanh2912/next-pwa'

/** @type {import('next').NextConfig} */
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
  buildExcludes: [/chunks\/images\/.*$/],
  cacheStartUrl: false,
  dynamicStartUrl: false
})

export default withPWA({
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
})
