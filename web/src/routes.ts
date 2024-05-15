/**
 * An array of public routes that are accessible to all users.
 * @type {RegExp[]}
 */
export const publicRoutes: RegExp[] = [
  /\/battles/,
  /\/stacks/,
  /\/leaderboard/,
  /\/player/,
  /\/battles/,
  /\/stacks/,
  /\/plus/
]

export const adminRoutesPrefix: string = '/admin'

/**
 * An array of authentication routes that are only accessible to unauthenticated users.
 */
export const authRoutes: RegExp[] = [/\/login/, /\/register/, /\/forgot-password/, /\/reset-password/]

/**
 * An array of protected routes that are only accessible to authenticated users.s
 * @type {RegExp[]}
 */
export const protectedRoutes: RegExp[] = [/\/me/, /\/settings/, /\/play\/S+/]

/**
 * The prefix for the API routes.
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth'

/**
 * The default redirect path after a user logs in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/'

export const DEFAULT_LOGIN_REDIRECT_ADMIN: string = '/admin'

export const OFFLINE_PAGE: string = '/~offline'
