import { auth } from '@/auth'
import React from 'react'

export default async function SettingsPage() {
  const session = await auth()
  return <div className="container mx-auto">{JSON.stringify(session)}</div>
}
