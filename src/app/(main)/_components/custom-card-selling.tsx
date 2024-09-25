import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

type Props = {}

const CustomProd = (props: Props) => {
  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 px-5 lg:px-8">
      <Card className=' dark:border-zinc-700 bg-banner-1 text-white '>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-xl font-medium">
            New Arrivals
          </CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-between'>
          <div>

            <div className="text-base ">Upcomming winter Sale</div>
            <p className="text-lg text-red-400 ">
              Up to 30% off
            </p>
            <Button variant="link" >
              <Link href="/sale" className='text-white'>Shop Now &rarr;</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className=' dark:border-zinc-700 bg-banner-2'>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium text-black">
            New Arrivals
          </CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-between'>
          <div>

            <div className="text-base text-black ">Upcomming winter Sale</div>
            <p className="text-lg text-red-400 ">
              Up to 30% off
            </p>
            <Button variant="link">
              <Link href="/sale" className=' text-black'>Shop Now &rarr;</Link>
            </Button>
          </div>

        </CardContent>
      </Card>
      <Card className=' dark:border-zinc-700 bg-banner-1 text-white '>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">
            New Arrivals
          </CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-between'>
          <div>

            <div className="text-base ">Upcomming winter Sale</div>
            <p className="text-lg text-red-400 ">
              Up to 30% off
            </p>
            <Button variant="link" >
              <Link href="/sale" className='text-white'>Shop Now &rarr;</Link>
            </Button>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}

export default CustomProd