import Link from 'next/link'
import SignUpForm from './SignUpForm'
import { auth } from '@/auth'
import LoginForm from '../login/LoginForm'

export default async function SignUp() {
  const session = await auth()
  return (
    <div className="container mx-auto my-8 p-8 max-w-min rounded-sm">
      <h2 className="text-center  mb-8">Регистрация</h2>
      {session ? (
        <p className="text-center">You are already signed in.</p>
      ) : (
        <div>
          <LoginForm tabKey="sign-up" />
        </div>
      )}
    </div>
  )
}
