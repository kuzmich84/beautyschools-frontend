'use client'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
} from '@nextui-org/react'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { StrapiImage } from '../ui/StrapiImage'

interface Image {
  id: number
  url: string
  alternativeText: string | 'Foto'
}

interface Link {
  id: number
  url: string
  text: string
}

interface HeroSectionProps {
  id: number
  __component: string
  heading: string
  subHeading: string
  image: Image
  link: Link
}

export function HeroSection({ data }: { readonly data: HeroSectionProps }) {
  const { heading, subHeading, image, link } = data

  const imageURL = process.env.NEXT_PUBLIC_STRAPI_URL + image.url

  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div className="relative h-[700px] overflow-hidden mx-[60px] rounded-xl">
      <StrapiImage
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full aspect/16:9"
        src={imageURL}
        height={1080}
        width={1920}
      />

      <div className="flex flex-col lg:flex-row h-full">
        <div className="relative z-10 flex flex-col items-start justify-center h-full text-white basis-1/2  bg-indigo-950 bg-opacity-70">
          <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl md:px-24 xl:px-28 lg:px-5">
            {heading}
          </h1>
          <Link
            className="mt-8 inline-flex  justify-start px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-400 mx-24 xl:mx-28 lg:mx-5 transition-all"
            href={link.url}
          >
            {link.text}
          </Link>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white basis-1/2  bg-indigo-950 bg-opacity-70 px-24 pb-10 lg:pb-0 lg:px-3">
          <Card
            className="max-w-max lg:max-w-[400px] p-4 pt-5"
            fullWidth={true}
          >
            <h3 className="text-center mb-3">Создать аккаунт</h3>
            <CardBody>
              <form>
                <Input
                  variant="bordered"
                  size="lg"
                  type="text"
                  name="name"
                  label="Имя"
                  labelPlacement="outside"
                  placeholder="Ваш имя"
                  className="mb-11"
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
                  className="mb-11"
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
                <Button
                  fullWidth={true}
                  className="bg-indigo-600 text-white mt-8 mb-8"
                  size="lg"
                  radius="sm"
                >
                  Регистрация
                </Button>
                <Divider />
                <CardFooter className="pb-0">
                  <small>
                    При регистрации на сайт, вы подтверждаете, что соглашаетесь
                    с правилами сайта и положением о конфиденциальности
                  </small>
                </CardFooter>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
