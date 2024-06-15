'use server'

import { signIn, signOut } from 'next-auth/react'

export async function signInGoogle() {
  return signIn('google')
}

export async function signInCredentials() {
  return signIn('credentials')
}

export async function SignOut() {
  return signOut()
}
