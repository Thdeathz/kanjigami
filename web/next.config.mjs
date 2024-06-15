// @ts-check
import withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === 'development',
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    runtimeCaching: [
      {
        // disable cross-origin cache
        urlPattern: ({ sameOrigin }) => false,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'cross-origin',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 60 * 60 // 1 hour
          },
          networkTimeoutSeconds: 10
        }
      },
      {
        urlPattern: () => false,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'pages-rsc-prefetch',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60 // 24 hours
          }
        }
      },
      {
        urlPattern: () => false,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'pages-rsc',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60 // 24 hours
          }
        }
      },
      {
        urlPattern: ({ request, url: { pathname }, sameOrigin }) =>
          sameOrigin && !pathname.startsWith('/api/') && !pathname.startsWith('/_next/') && !request.headers.get('RSC'),
        handler: 'NetworkFirst',
        options: {
          cacheName: 'pages',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60 // 24 hours
          }
        }
      }
    ]
  },
  cacheStartUrl: true,
  dynamicStartUrl: true
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
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/kanjigami.pro/**'
      }
    ]
  }
}

export default withPWA(nextConfig)
