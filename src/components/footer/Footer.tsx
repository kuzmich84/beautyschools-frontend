import { Link } from '@nextui-org/react'
import React from 'react'
import { SiTelegram } from 'react-icons/si'

export default function Footer() {
  return (
    <footer className="bg-neutral-50">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link href="/" className="font-bold text-inherit">
              Beauty Schools
            </Link>

            <p className="mt-4 max-w-xs text-gray-500"></p>

            <ul className="mt-8 flex gap-4">
              <li>
                <Link
                  className="text-gray-700 transition hover:opacity-75"
                  isExternal={true}
                  rel="noreferrer"
                  href="https://vk.com"
                >
                  <span className="sr-only">В контакте</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="st0"
                      d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 1.801-2.339 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974h-3.255c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.48 2.708 7.376 2.708z"
                    />
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-700 transition hover:opacity-75"
                  isExternal={true}
                  rel="noreferrer"
                  href="https://telegram.com"
                >
                  <span className="sr-only">Телеграм</span>

                  <SiTelegram className="h-6 w-6" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-gray-900">Категории</p>

              <ul className="mt-6 space-y-2 text-sm">
                <li>
                  <Link
                    href="/schools"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Школы
                  </Link>
                </li>

                <li>
                  <Link
                    href="/courses"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Курсы
                  </Link>
                </li>

                <li>
                  <Link
                    href="/master-classes"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Мастер-классы
                  </Link>
                </li>

                <li>
                  <Link
                    href="/online"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Онлайн
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">О компании</p>

              <ul className="mt-6 space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    О Нас
                  </Link>
                </li>

                <li>
                  <Link
                    href="/blog"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Блог
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contacts"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Поддержка</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    href="/help-center"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Центр помощи
                  </Link>
                </li>

                <li>
                  <Link
                    href="/questiions"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Правила</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    href="/policy"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Пользовательское соглашение
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Beauty Schools. Все права защищены.
        </p>
      </div>
    </footer>
  )
}
