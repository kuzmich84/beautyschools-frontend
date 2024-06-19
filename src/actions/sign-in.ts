import { signIn } from 'next-auth/react'
import { z } from 'zod'

const schemaLogin = z.object({
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

export default async function signInCredentials(
  prevState: any,
  formData: FormData
) {
  const validatedFields = schemaLogin.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  console.log(validatedFields.data)

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: 'Missing Fields. Failed to Login.',
    }
  }

  const responseLogin = await signIn('credentials', {
    identifier: validatedFields.data.email,
    password: validatedFields.data.password,
    redirect: false,
  })

  console.log(responseLogin)

  if (responseLogin && !responseLogin?.ok) {
    return {
      strapiError: responseLogin.error
        ? responseLogin.error
        : 'Something went wrong.',
    }
  }
}
