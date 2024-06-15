import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { IRemainingTime } from '@/@types/battle'

/**
 * Merges class names with tailwindcss
 * @param {string[]} inputs - The class names to merge
 * @returns {string} The merged class names
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Returns the error string from an error object
 * @param {unknown} error - The error object
 * @returns {string} The error string
 */
export function getErrorString(error: unknown): string {
  return String(error).replace(/Error: /g, '')
}

/**
 * Returns the difference between two dates
 * @param {Date} date1 - The first date
 * @param {Date} date2 - The second date
 * @returns {IRemainingTime} The difference between the two dates
 */
export const getDateDifference = (date1: Date, date2: Date): IRemainingTime => {
  let delta = Math.abs(date1.getTime() - date2.getTime()) / 1000

  const days = Math.floor(delta / 86400)
  delta -= days * 86400

  const hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600

  const minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60

  const seconds = Math.floor(delta % 60)

  return { days, hours, minutes, seconds }
}

/**
 * Returns the time difference from now
 * @param {Date} inputDate - The input date
 * @returns {string} The time difference from now
 */
export function getTimeDifferenceFromNow(inputDate: Date): string {
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - inputDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return `${diffDays} days ago`
}

/**
 * Returns the endpoint with query parameters
 * @param {string} endpoint - The endpoint
 * @param {Record<string, string | number>} query - The query parameters
 * @returns {string} The endpoint with query parameters
 */
export function makeEndpoint(endpoint: string, query?: Record<string, string | number | undefined>): string {
  const params = new URLSearchParams()

  let returnEndpoint = endpoint

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value) params.append(key, String(value))
    })
  }

  if (params.toString()) {
    returnEndpoint += `?${params.toString()}`
  }

  return returnEndpoint
}
