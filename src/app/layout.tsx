import type { Metadata } from 'next'
import { FC, PropsWithChildren } from 'react'
import { Nunito } from 'next/font/google'
import { ClerkProvider, auth } from '@clerk/nextjs'
import { AppContextProvider } from '@/context'
import StyleProvider from '@/providers/style'
import NextTopLoader from 'nextjs-toploader'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import './globals.css'

const nunito = Nunito({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Task Manager Application Developed with Next.js & TypeScript',
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const { userId } = auth()

  return (
    <ClerkProvider>
      <html lang='en'>
        <head>
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
            integrity='sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=='
            crossOrigin='anonymous'
            referrerPolicy='no-referrer'
          />
        </head>
        <body className={nunito.className}>
          <NextTopLoader height={2} color='#27AE60' easing='cubic-bezier(0.53,0.21,0,1)' />
          <AppContextProvider>
            <StyleProvider>
              {userId && <Sidebar />}

              <main className='w-full'>{children}</main>
            </StyleProvider>
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
