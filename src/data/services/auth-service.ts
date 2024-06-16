import { getStrapiURL } from '@/lib/utils'
import paths from '@/paths'
import { redirect } from 'next/navigation'

interface RegisterUserProps {
  username: string
  password: string
  email: string
}

interface LoginUserProps {
  identifier: string
  password: string
}

const baseUrl = getStrapiURL()

export async function registerUserService(userData: RegisterUserProps) {
  const url = new URL('/api/auth/local/register', baseUrl)

  // await new Promise((resolve) => setTimeout(resolve, 3000))

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData }),
      cache: 'no-cache',
    })

    return response.json()
  } catch (error) {
    console.error('Registration Service Error:', error)
  }
}

export async function loginUserService(userData: LoginUserProps) {
  const url = new URL('/api/auth/local', baseUrl)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData }),
      cache: 'no-cache',
    })

    return response.json()
  } catch (error) {
    console.error('Login Service Error:', error)
    throw error
  }
}
