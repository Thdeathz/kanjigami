import { AxiosError } from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { IRemainingTime } from '@/@types/battle'

/**
 * Merges class names with tailwindcss
 * @param {string[]} inputs - The class names to merge
 * @returns {string} The merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns the error string from an error object
 * @param {unknown} error - The error object
 * @returns {string} The error string
 */
export function getErrorString(error: unknown): string {
  if (error instanceof AxiosError) {
    if (!error.response) return 'Network Error'

    return error.response.data.message
  }

  return String(error)
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
