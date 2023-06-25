import { handleAuth } from '@auth0/nextjs-auth0'

/**
 * This Next.js dynamic API route will automatically create the following endpoints:

  /api/auth/login: Auth0's login route.
  /api/auth/logout: The route used to logout the user.
  /api/auth/callback: The route Auth0 redirects the user to after a successful login.
  /api/auth/me: The route to fetch the user profile from Auth0.
 */

export default handleAuth()