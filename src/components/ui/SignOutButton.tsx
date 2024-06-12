'use client'
import { Button } from '@nextui-org/button'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function SignOutButton() {
  return (
    <Button color="primary" variant="light" onClick={() => signOut()}>
      Выйти
    </Button>
  )
}
