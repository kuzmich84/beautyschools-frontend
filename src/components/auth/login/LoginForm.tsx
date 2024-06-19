'use client'
import React, { useState } from 'react'
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from '@nextui-org/react'
import { Eye, EyeOff } from 'lucide-react'
import registerUser from '@/actions/sign-up'
import { useFormState, useFormStatus } from 'react-dom'
import { ZodErrors } from '@/components/custom/ZodErrors'
import { StrapiErrors } from '@/components/custom/StrapiErrors'
import StrapiSuccess from '@/components/custom/StrapiSuccess'
import { signIn } from 'next-auth/react'
import { z } from 'zod'

import { useRouter, useSearchParams } from 'next/navigation'

interface LoginFormProp {
  tabKey: 'login' | 'sign-up'
}

const INITIAL_STATE = {
  data: null,
}

const initialLoginState = {
  identifier: '',
  password: '',
}

type FormErrorsT = {
  identifier?: undefined | string[]
  password?: undefined | string[]
  strapiError?: string
}

const formLoginSchema = z.object({
  identifier: z
    .string()
    .min(3, { message: 'Имя или email должны содержать не менее 6 символов' })
    .max(30, {
      message: 'Имя или email должны содержать не более 30 символов',
    }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать не менее 6 символов' })
    .max(30, {
      message: 'Пароль должен содержать не более 30 символов',
    }),
})

export default function LoginForm({ tabKey }: LoginFormProp) {
  const [selected, setSelected] = useState<React.Key>(tabKey)
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const [formState, formAction] = useFormState(registerUser, INITIAL_STATE)

  const [errors, setErrors] = useState<FormErrorsT>({})
  const [loginData, setLoginData] = useState(initialLoginState)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const router = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const validatedFields = formLoginSchema.safeParse(loginData)

    if (!validatedFields.success) {
      setErrors(validatedFields.error.formErrors.fieldErrors)
      setIsLoading(false)
    } else {
      const signInResponse = await signIn('credentials', {
        identifier: loginData.identifier,
        password: loginData.password,
        redirect: false,
      })
      console.log(signInResponse?.error)

      if (signInResponse && !signInResponse?.ok) {
        setErrors({
          strapiError: signInResponse.error
            ? signInResponse.error
            : 'Something went wrong.',
        })
        setIsLoading(false)
      } else {
        // router.push(callbackUrl)
        // router.refresh()
        setIsLoading(false)
      }
    }
  }

  function SubmitButton() {
    const status = useFormStatus()

    return (
      <div className="flex gap-2 justify-end">
        <Button
          type="submit"
          fullWidth={true}
          className=" text-white mt-8 hover:bg-green-600"
          size="lg"
          radius="sm"
          color="secondary"
          isLoading={status.pending}
        >
          Зарегистрироваться
        </Button>
      </div>
    )
  }

  function LoginButton() {
    return (
      <div className="flex gap-2 justify-end">
        <Button
          fullWidth
          className="bg-indigo-600 text-white mt-8 mb-5 hover:bg-green-600"
          size="lg"
          radius="sm"
          isLoading={isLoading}
          type="submit"
        >
          Войти
        </Button>
      </div>
    )
  }
  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[400px]">
        <CardBody className="overflow-hidden px-4 pt-8 pb-0">
          <Tabs
            fullWidth
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected as string}
            onSelectionChange={setSelected}
            color="secondary"
            className="text-white"
          >
            <Tab key="login" title="Войти">
              <form
                className="flex flex-col gap-4"
                method="post"
                onSubmit={handleSubmit}
              >
                <Input
                  variant="bordered"
                  size="lg"
                  type="text"
                  name="identifier"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Ваш email"
                  className="pt-6"
                  radius="sm"
                  isRequired
                  onChange={handleChange}
                />
                <ZodErrors error={errors?.identifier!} />

                <Input
                  isRequired
                  autoComplete="on"
                  variant="bordered"
                  size="lg"
                  name="password"
                  label="Пароль"
                  labelPlacement="outside"
                  placeholder="Ваш пароль"
                  radius="sm"
                  type={isVisible ? 'text' : 'password'}
                  onChange={handleChange}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <Eye className="text-default" />
                      ) : (
                        <EyeOff className="text-default" />
                      )}
                    </button>
                  }
                />
                <ZodErrors error={errors?.password!} />

                <p className="text-center text-small">
                  Нет аккаунта?{' '}
                  <Link
                    size="sm"
                    onPress={() => setSelected('sign-up')}
                    className="text-indigo-700 cursor-pointer"
                  >
                    Зарегистрироваться
                  </Link>
                </p>
                <LoginButton />
              </form>
            </Tab>
            <Tab key="sign-up" title="Регистрация">
              <form action={formAction} className="flex flex-col gap-4">
                <Input
                  variant="bordered"
                  size="lg"
                  type="text"
                  name="username"
                  label="Имя"
                  labelPlacement="outside"
                  placeholder="Ваш имя"
                  className="pt-6"
                  radius="sm"
                  isRequired
                />
                <ZodErrors error={formState?.zodErrors?.username} />
                <Input
                  variant="bordered"
                  size="lg"
                  type="email"
                  name="email"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Ваш email"
                  radius="sm"
                  isRequired
                />
                <ZodErrors error={formState?.zodErrors?.email} />
                <Input
                  isRequired
                  autoComplete="on"
                  variant="bordered"
                  size="lg"
                  name="password"
                  label="Пароль"
                  labelPlacement="outside"
                  placeholder="Ваш пароль"
                  radius="sm"
                  type={isVisible ? 'text' : 'password'}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <Eye className="text-default" />
                      ) : (
                        <EyeOff className="text-default" />
                      )}
                    </button>
                  }
                />

                <ZodErrors error={formState?.zodErrors?.password} />

                <p className="text-center text-small">
                  У вас уже есть аккаунт?{' '}
                  <Link
                    size="sm"
                    onPress={() => setSelected('login')}
                    className="text-indigo-700 cursor-pointer"
                  >
                    Войти
                  </Link>
                </p>
                <SubmitButton />
              </form>
            </Tab>
          </Tabs>
        </CardBody>
        <CardFooter className="flex justify-center">
          <StrapiErrors error={formState?.strapiErrors} />
          <StrapiSuccess message={formState?.successMessage} />

          {errors.password || errors.identifier ? (
            <div className="text-red-700" aria-live="polite">
              Something went wrong. Please check your data.
            </div>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  )
}
