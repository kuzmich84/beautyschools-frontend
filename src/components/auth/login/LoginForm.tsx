'use client'
import React from 'react'
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from '@nextui-org/react'
import { Eye, EyeOff } from 'lucide-react'

interface LoginFormProp {
  tabKey: 'login' | 'sign-up'
}

export default function LoginForm({ tabKey }: LoginFormProp) {
  const [selected, setSelected] = React.useState<React.Key>(tabKey)
  const [isVisible, setIsVisible] = React.useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

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
              <form className="flex flex-col gap-4">
                <Input
                  variant="bordered"
                  size="lg"
                  type="text"
                  name="name"
                  label="Имя"
                  labelPlacement="outside"
                  placeholder="Ваш имя"
                  className="pt-6"
                  radius="sm"
                  isRequired
                />
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
                    fullWidth={true}
                    className=" text-white mt-8 mb-5 hover:bg-green-600"
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
      </Card>
    </div>
  )
}
