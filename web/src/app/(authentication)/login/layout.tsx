import React from 'react'

import JsonLd from '@/components/json-ld'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: 'https://kanjigami.pro/login',
  name: 'Login to Kanjigami',
  description:
    'Access your Kanjigami account to track your Kanji learning progress, compete in battles, and more. Log in now to continue your learning journey.',
  mainEntity: {
    '@type': 'WebPageElement',
    name: 'Login Form',
    description: 'Form to log in to Kanjigami with email and password.'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Kanjigami',
    logo: {
      '@type': 'ImageObject',
      url: 'https://kanjigami.pro/favicon.ico'
    }
  }
}

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <JsonLd data={structuredData} />
    </>
  )
}
