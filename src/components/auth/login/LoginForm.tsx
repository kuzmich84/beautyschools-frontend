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
import { signInCredentials } from '@/actions/sign-in'

interface LoginFormProp {
  tabKey: 'login' | 'sign-up'
}

const INITIAL_STATE = {
  data: null,
}

export default function LoginForm({ tabKey }: LoginFormProp) {
  const [selected, setSelected] = useState<React.Key>(tabKey)
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const { pending } = useFormStatus()

  const [formState, formAction] = useFormState(registerUser, INITIAL_STATE)

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
              <form className="flex flex-col gap-4">
                <Input
                  variant="bordered"
                  size="lg"
                  type="email"
                  name="email"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Ваш email"
                  className="pt-6"
                  radius="sm"
                  isRequired
                />
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
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    className="bg-indigo-600 text-white mt-8 mb-5 hover:bg-green-600"
                    size="lg"
                    radius="sm"
                  >
                    Войти
                  </Button>
                </div>
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
                <div className="flex gap-2 justify-end">
                  <Button
                    type="submit"
                    fullWidth={true}
                    className=" text-white mt-8 hover:bg-green-600"
                    size="lg"
                    radius="sm"
                    color="secondary"
                  >
                    Зарегистрироваться
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
        <CardFooter className="flex justify-center">
          <StrapiErrors error={formState?.strapiErrors} />
        </CardFooter>
      </Card>
    </div>
  )
}
