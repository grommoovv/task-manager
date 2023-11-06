'use client'
import { SignUp } from '@clerk/nextjs'

const Page = () => {
  return (
    <div className='flex items-center justify-center h-full'>
      <SignUp />
    </div>
  )
}

export default Page
