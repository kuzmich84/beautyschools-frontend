'use client'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

type FormErrorsT = {
  identifier?: undefined | string[]
  password?: undefined | string[]
  strapiError?: string
}

export default function SignInFormOld() {
  const initialState = {
    identifier: '',
    password: '',
  }
  const [data, setData] = useState(initialState)

  const formSchema = z.object({
    identifier: z.string().min(3).max(30),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' })
      .max(30),
  })

  const [errors, setErrors] = useState<FormErrorsT>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const router = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setIsLoading(true)

    const validatedFields = formSchema.safeParse(data)

    if (!validatedFields.success) {
      setErrors(validatedFields.error.formErrors.fieldErrors)
      setIsLoading(false)
    } else {
      const signInResponse = await signIn('credentials', {
        identifier: data.identifier,
        password: data.password,
        redirect: false,
      })

      if (signInResponse && !signInResponse?.ok) {
        setErrors({
          strapiError: signInResponse.error
            ? signInResponse.error
            : 'Something went wrong.',
        })
        setIsLoading(false)
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    }
  }

  return (
    <form method="post" className="my-8" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="identifier" className="block mb-1">
          Email or username *
        </label>
        <input
          type="text"
          id="identifier"
          name="identifier"
          required
          className="bg-white border border-zinc-300 w-full rounded-sm p-2"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="block mb-1">
          Password *
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="bg-white border border-zinc-300 w-full rounded-sm p-2"
          onChange={handleChange}
        />
      </div>
      {errors?.identifier ? (
        <div className="text-red-700" aria-live="polite">
          {errors.identifier[0]}
        </div>
      ) : null}

      <div className="mb-3">
        <button
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-md disabled:bg-sky-200 disabled:text-gray-500"
          disabled={isLoading}
        >
          sign in
        </button>
      </div>

      {errors.strapiError ? (
        <div className="text-red-700" aria-live="polite">
          Something went wrong: {errors.strapiError}
        </div>
      ) : null}
    </form>
  )
}
