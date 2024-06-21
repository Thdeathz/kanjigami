import React from 'react'

import JsonLd from '@/components/json-ld'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: 'https://kanjigami.pro/leaderboard',
  name: 'Kanji Leaderboard',
  description:
    'Check out the top performers in Kanji learning on Kanjigami. See who is leading the charts and strive to reach the top of the leaderboard.',
  mainEntity: [
    {
      '@type': 'ItemList',
      name: 'Kanji Leaderboard',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Top Kanji Learner'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Second Best Kanji Learner'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Third Best Kanji Learner'
        }
      ]
    }
  ],
  publisher: {
    '@type': 'Organization',
    name: 'Kanjigami',
    logo: {
      '@type': 'ImageObject',
      url: 'https://kanjigami.pro/favicon.ico'
    }
  }
}

export default function LeaderboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <JsonLd data={structuredData} />
    </>
  )
}
