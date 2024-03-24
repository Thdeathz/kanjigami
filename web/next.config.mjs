/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/kanjigami-61289.appspot.com/o/**'
      }
    ]
  }
}

export default nextConfig
