'use client'

import { useSearchParams } from 'next/navigation'
import * as actions from '@/actions'

export default function GoogleSignInButton() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  return (
    <form action={() => actions.signInGoogle(callbackUrl)}>
      <button
        type="submit"
        className="bg-white border border-zinc-300 py-1 rounded-md w-full text-zinc-700"
        onClick={() => actions.signInGoogle(callbackUrl)}
      >
        <span className="text-red-700 mr-2">G</span> Sign in with Google
      </button>
    </form>
  )
}
