'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../Button/Button'
import { arrowLeft, bars, logout } from '@/helpers/icons'
import { UserButton, useClerk, useUser } from '@clerk/nextjs'
import { useAppContext } from '@/context'
import { navlinks } from '@/helpers/constants'
import { StyledSidebar } from './styles'

const Sidebar = () => {
  const { theme, isCollapsed, collapseMenu } = useAppContext()
  const { signOut } = useClerk()

  const { user } = useUser()

  const { firstName, lastName, imageUrl } = user || {
    firstName: '',
    lastName: '',
    imageUrl: '',
  }

  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (link: string) => {
    router.push(link)
  }

  return (
    <StyledSidebar theme={theme} $collapsed={isCollapsed}>
      <button className='toggle-nav' onClick={collapseMenu}>
        {isCollapsed ? bars : arrowLeft}
      </button>
      <div className='profile'>
        <div className='profile-overlay'></div>
        <div className='image'>
          <Image width={70} height={70} src={imageUrl} alt='profile' />
        </div>
        <div className='user-btn'>
          <UserButton />
        </div>
        <h1 className=''>
          {firstName} {lastName}
        </h1>
      </div>
      <ul className='nav-items'>
        {navlinks.map((item) => (
          <li
            key={item.id}
            className={`nav-item ${pathname === item.link && 'active'}`}
            onClick={() => {
              handleClick(item.link)
            }}
          >
            {item.icon}
            <Link href={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <div className='sign-out'>
        <Button
          name={'Sign Out'}
          type={'submit'}
          padding={'0.4rem 0.8rem'}
          borderRad={'0.8rem'}
          fw={'500'}
          fs={'1rem'}
          icon={logout}
          click={() => {
            signOut(() => router.push('/signin'))
          }}
        />
      </div>
    </StyledSidebar>
  )
}

export { Sidebar }
