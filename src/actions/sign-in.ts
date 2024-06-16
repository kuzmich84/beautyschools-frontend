import { signIn } from '@/auth'

export async function signInCredentials() {
  return signIn('credentials')
}
