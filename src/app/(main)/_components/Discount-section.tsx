import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

const DiscountSection = (props: Props) => {
  return (
    <div className=' h-28 w-full bg-gray-300 dark:bg-zinc-800 flex items-center rounded-md justify-between px-4 '>
        <div className=''>
            <h1 className=' text-sm md:text-3xl dark:text-white font-bold'>GIFT<span className=' text-rose-400'> 30% OFF </span> PERFECT STYLES</h1>
            <p className=' hidden sm:block text-muted-foreground'>Only until the end of this week. Terms and conditions apply</p>
        </div>
        <Button className=' text-sm sm:text-xl bg-gray-800 dark:bg-gray-100 shadow-lg' size="sm">Discover Now</Button>
    </div>
  )
}

export default DiscountSection