import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = process.env.NEXT_PUBLIC_BASE_URL!

  return [
    {
      url: appUrl,
      lastModified: new Date(),
      priority: 1
    },
    {
      url: `${appUrl}/battles`,
      lastModified: new Date(),
      priority: 0.8
    },
    {
      url: `${appUrl}/stacks`,
      lastModified: new Date(),
      priority: 0.8
    },
    {
      url: `${appUrl}/leaderboard`,
      lastModified: new Date(),
      priority: 0.64
    },
    {
      url: `${appUrl}/leaderboard/stack`,
      lastModified: new Date(),
      priority: 0.64
    },
    {
      url: `${appUrl}/leaderboard/battle`,
      lastModified: new Date(),
      priority: 0.64
    },
    {
      url: `${appUrl}/login`,
      lastModified: new Date(),
      priority: 0.5
    },
    {
      url: `${appUrl}/register`,
      lastModified: new Date(),
      priority: 0.5
    }
  ]
}
