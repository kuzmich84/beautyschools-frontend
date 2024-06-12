'use client'
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Select,
  SelectItem,
  Button,
} from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import SignInButton from '../ui/SignInButton'
import HeaderAuth from './HeaderAuth'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = ['Главная', 'Школы', 'Курсы', 'Мастер-классы', 'Онлайн']

  const { data: session, status, update } = useSession()

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      classNames={{
        wrapper: 'mx-[60px] px-0 grow-0 justify-start',
      }}
    >
      <NavbarContent
        className="lg:hidden data-[justify=start]:grow-0"
        justify="start"
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      <NavbarContent
        className="lg:hidden pr-3 data-[justify=start]:grow-0"
        justify="start"
      >
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            Beauty Schools
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden lg:flex gap-4 data-[justify=start]:grow-0"
        justify="start"
      >
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit text-2xl mr-10">
            Beauty Schools
          </Link>
        </NavbarBrand>

        <NavbarItem isActive>
          <Link color="foreground" href="#">
            Главная
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" aria-current="page">
            Школы
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Курсы
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Мастер-классы
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Онлайн
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <Select
          label="Выбрать город"
          variant="flat"
          className="max-w-44 xl-hidden "
          size="sm"
          classNames={{
            trigger: [
              'bg-white shadow-none hover:bg-blue-200 data-[hover=true]:bg-blue-200',
            ],
            label: ['text-inherit'],
            base: ['sm:block', 'hidden'],
          }}
          listboxProps={{
            itemClasses: {
              base: ['data-[selectable=true]:focus:bg-blue-200'],
            },
          }}
        >
          <SelectItem key="Saint-Peterburg">Санкт-Петербург</SelectItem>
          <SelectItem key="Moscow">Москва</SelectItem>
          <SelectItem key="Ekaterinburg">Екатеринбург</SelectItem>
          <SelectItem key="Kazan">Казань</SelectItem>
        </Select>

        <NavbarItem>
          <HeaderAuth />
          {/* <Link href="#" color="foreground">
            Войти
          </Link> */}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href="#" size="lg" color="foreground">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Select
            label="Выбрать город"
            variant="flat"
            className="max-w-44 xl-hidden "
            size="sm"
            classNames={{
              trigger: [
                'bg-white shadow-none hover:bg-blue-200 data-[hover=true]:bg-blue-200 p-0',
              ],
              label: ['text-inherit'],
              base: ['sm:hidden'],
            }}
            listboxProps={{
              itemClasses: {
                base: ['data-[selectable=true]:focus:bg-blue-200'],
              },
            }}
          >
            <SelectItem key="Saint-Peterburg">Санкт-Петербург</SelectItem>
            <SelectItem key="Moscow">Москва</SelectItem>
            <SelectItem key="Ekaterinburg">Екатеринбург</SelectItem>
            <SelectItem key="Kazan">Казань</SelectItem>
          </Select>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#" color="danger">
            Выйти
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
