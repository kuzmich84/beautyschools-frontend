import NextAuth from 'next-auth'

import { StrapiErrorT } from './types/strapi/StrapiError'
import { StrapiLoginResponseT } from './types/strapi/User'
import authConfig from './auth.config'

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  pages: {
    signIn: '/login',
    error: '/auth-error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, trigger, account, profile, user, session }) {
      if (account) {
        if (account.provider === 'google') {
          // we now know we are doing a sign in using GoogleProvider
          try {
            const strapiResponse = await fetch(
              `${process.env.STRAPI_BACKEND_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`,
              { cache: 'no-cache' }
            )
            if (!strapiResponse.ok) {
              const strapiError: StrapiErrorT = await strapiResponse.json()
              throw new Error(strapiError.error.message)
            }

            const strapiLoginResponse: StrapiLoginResponseT =
              await strapiResponse.json()
            // customize token
            // name and email will already be on here
            token.strapiToken = strapiLoginResponse.jwt
            token.provider = account.provider
            token.strapiUserId = strapiLoginResponse.user.id
            token.blocked = strapiLoginResponse.user.blocked
          } catch (error) {
            throw error
          }
        }
        if (account.provider === 'credentials') {
          // for credentials, not google provider
          // name and email are taken care of by next-auth or authorize
          token.strapiToken = user.strapiToken
          token.strapiUserId = user.strapiUserId
          token.provider = account.provider
          token.blocked = user.blocked
        }
      }

      return token
    },
    async session({ token, session }) {
      session.strapiToken = token.strapiToken
      session.provider = token.provider
      session.user.strapiUserId = token.strapiUserId
      session.user.blocked = token.blocked

      return session
    },
    // async signIn({ user, account, profile }) {
    //   console.log('singIn callback', { account, profile, user })
    //   if (
    //     account &&
    //     account.provider === 'google' &&
    //     profile &&
    //     'email_verified' in profile
    //   ) {
    //     if (!profile.email_verified) return false
    //   }
    //   return true
    // },
  },
})
