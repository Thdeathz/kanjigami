import React from 'react'

import JsonLd from '@/components/json-ld'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: 'https://kanjigami.pro/battles',
  name: 'Kanji Battles',
  description: 'Compete with players around the world and learn more kanji.',
  mainEntity: [
    {
      '@type': 'Game',
      name: 'Kanji Online Battle',
      description: 'A competitive game where players battle by answering Kanji-related questions.',
      url: 'https://kanjigami.pro/battles',
      author: {
        '@type': 'Organization',
        name: 'Kanjigami'
      }
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

export default function BattlesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <JsonLd data={structuredData} />
    </>
  )
}
