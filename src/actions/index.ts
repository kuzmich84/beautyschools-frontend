'use server'
import { signIn, signOut } from '@/auth'

export async function signInGoogle(callbackUrl: string) {
  return signIn('google', { callbackUrl })
}

export async function SignOut() {
  return signOut()
}
