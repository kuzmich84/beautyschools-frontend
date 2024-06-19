import { CredentialsSignin, type NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { StrapiErrorT } from './types/strapi/StrapiError'
import { StrapiLoginResponseT } from './types/strapi/User'

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid identifier or password'
}

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'email and password',
      credentials: {
        identifier: {
          label: 'Email or username *',
          type: 'text',
        },
        password: { label: 'Password *', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.identifier || !credentials.password) {
          return null
        }
        try {
          const strapiResponse = await fetch(
            `${process.env.STRAPI_BACKEND_URL}/api/auth/local`,
            {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({
                identifier: credentials!.identifier,
                password: credentials!.password,
              }),
            }
          )

          if (!strapiResponse.ok) {
            // return error to signIn callback

            const contentType = strapiResponse.headers.get('content-type')
            if (contentType === 'application/json; charset=utf-8') {
              const data: StrapiErrorT = await strapiResponse.json()
              throw new Error(data.error.message)
            } else {
              throw new Error(strapiResponse.statusText)
            }
          }

          // success
          const data: StrapiLoginResponseT = await strapiResponse.json()
          return {
            name: data.user.username,
            email: data.user.email,
            id: data.user.id.toString(),
            strapiUserId: data.user.id,
            blocked: data.user.blocked,
            strapiToken: data.jwt,
          }
        } catch (error) {
          // Catch errors in try but also f.e. connection fails
          //   throw error
          return null
        }
      },
    }),
  ],
} satisfies NextAuthConfig
