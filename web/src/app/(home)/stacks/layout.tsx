import React from 'react'

import JsonLd from '@/components/json-ld'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: 'https://kanjigami.pro/stacks',
  name: 'Kanji Stacks',
  description:
    "Learn and master Kanji through engaging and interactive stacks. Build your knowledge step by step with Kanjigami's structured learning approach.",
  mainEntity: [
    {
      '@type': 'CreativeWork',
      name: 'Kanji Learning Stack',
      description: 'Play game and learn more kanji.',
      url: 'https://kanjigami.pro/stacks',
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

export default function StacksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <JsonLd data={structuredData} />
    </>
  )
}
