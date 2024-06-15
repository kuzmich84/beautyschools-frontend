'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import SignInButton from '../ui/SignInButton'
import SignOutButton from '../ui/SignOutButton'

export default function HeaderAuth() {
  const { data: session } = useSession()

  if (!session) {
    return <SignInButton />
  }
  return (
    <div className="flex items-center">
      <div className="text-sky-700">{session.user?.email}</div>
      <SignOutButton />
    </div>
  )
}
