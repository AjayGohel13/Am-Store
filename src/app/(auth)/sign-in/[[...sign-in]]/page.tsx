import React from 'react'
import { Loader2 } from 'lucide-react'
import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import Image from 'next/image'
const signin = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 ">
      <div className="h-full lg:flex flex-col itce' justify-center px-4 ">
        <div className="text-center space-y-4 pt-16 ">

          <div className=" flex items-center justify-center flex-col ">
            <div className=' block lg:hidden h-20 w-20'>
              <Image alt='logo image' src='/logo.png' height={300} width={300} />
            </div>
            <h1 className='font-bold text-3xl text-muted-foreground'>
              Welcome to Am - Store!
            </h1>
          </div>
          <p className="text-base text-[#2E2A47] ">
            Log in or Create account!
          </p>
          <div className='flex items-center justify-center mt-8'>
            <ClerkLoaded>
              <SignIn path='/sign-in' />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className='animate-spin text-muted-foreground ' />
            </ClerkLoading>
          </div>
        </div>
      </div>
      <div className='h-full bg-slate-100 dark:bg-black hidden lg:flex items-center justify-center   '>
        <Image alt='logo image' src='/logo.png' height={300} width={300} />
      </div>
    </div>
  )
}

export default signin
