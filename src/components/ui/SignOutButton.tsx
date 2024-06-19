'use client'
import { Button } from '@nextui-org/button'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        await signOut()
      }}
    >
      <Button color="primary" variant="light" type="submit">
        Выйти
      </Button>
    </form>
  )
}
