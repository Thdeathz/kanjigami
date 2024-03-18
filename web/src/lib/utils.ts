import { AxiosError } from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
