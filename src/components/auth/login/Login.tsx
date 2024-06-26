import React from 'react'
import Link from 'next/link'
import GoogleSignInError from './GoogleSignInError'
import LoginForm from './LoginForm'
import { auth } from '@/auth'
import GoogleSignInButton from './GoogleSignInButton'

export default async function Login() {
  const session = await auth()
  return (
    <div className="container mx-auto my-8 p-8 max-w-min rounded-sm">
      <h2 className="text-center  mb-8">Авторизация</h2>
      {session ? (
        <p className="text-center">You are already signed in.</p>
      ) : (
        <div>
          <LoginForm tabKey='login' />
          <div className='text-center relative my-8 after:content-[""] after:block after:w-full after:h-[1px] after:bg-zinc-300 after:relative after:-top-3 after:z-0'>
            <span className="bg-zinc-100 px-4 relative z-10 text-zinc-400">
              or
            </span>
          </div>
          <GoogleSignInButton />
          <GoogleSignInError />
        </div>
      )}
    </div>
  )
}
