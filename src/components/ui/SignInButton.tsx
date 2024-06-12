'use client'

import useCallbackUrl from '@/hooks/useCallbackUrl'
import Link from 'next/link'
import React from 'react'

export default function SignInButton() {
  const callbackUrl = useCallbackUrl()
  return (
    <Link href={`/login/?callbackUrl=${callbackUrl}`} color="foreground">
      Войти
    </Link>
  )
}
