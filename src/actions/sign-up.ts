'use server'

import { registerUserService } from '@/data/services/auth-service'
import paths from '@/paths'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const schemaRegister = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Имя должно содержать не менее 3х символов',
    })
    .max(20, {
      message: 'Имя должно содержать не меннее 3х и не более 20 символов',
    }),
  password: z
    .string()
    .min(6, {
      message: 'Пароль должен содержать не менее 6 символов',
    })
    .max(100, {
      message: 'Пароль должен содержать не менее 6 и не более 100 символов',
    }),
  email: z.string().email({
    message: 'Пожалуйста введите правильные email адрес',
  }),
})

export default async function registerUser(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: 'Missing Fields. Failed to Register.',
    }
  }

  const responseData = await registerUserService(validatedFields.data)

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: 'Ops! Something went wrong. Please try again.',
    }
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Failed to Register.',
    }
  }

  console.log('#############')
  console.log('User Registered Successfully', responseData.jwt)
  console.log('#############')

  redirect(paths.login())
}
