import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChartLine, ChevronDown, LayoutDashboardIcon, User } from 'lucide-react'
import Link from 'next/link'
import { Category } from '@prisma/client'
import { db } from '@/lib/db'
import MobileBar from './mobile-nav'
import { SeerchInputWrapper } from './search-input'

type Props = {
    data: Category[]
}
const ProductNavbar = ({ data }: Props) => {


    return (
        <div>
            <div className=' block lg:hidden text-white' >
                <MobileBar data={data} />
            </div>

            <div className='max-w-screen-2xl mx-auto mt-4 pb-4 hidden lg:flex lg:justify-between lg:items-center px-8 ' >

                <div className='w-full flex items-center  gap-7  '>
                    <DropdownMenu >
                        <DropdownMenuTrigger className=' bg-white dark:bg-black rounded-md  '>
                            <div className='flex gap-1 items-center justify-between w-full px-2 py-2 hover:border-none border-none focus-visible:border-none '>
                                <div className=' flex items-center gap-1'>
                                    <LayoutDashboardIcon className=' h-4 w-4' fill='black' />Categories
                                </div>
                                <div className='ml-10'><ChevronDown className=' h-4 w-4' /></div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className=' border dark:bg-zinc-900 dark:border-zinc-600 '>
                            <DropdownMenuLabel className=' text-base dark:text-emerald-50'>Top Categories</DropdownMenuLabel>
                            <DropdownMenuSeparator className=' bg-black dark:bg-white' />
                            {data.map((categories) => (
                                <Link key={categories.id} href={`/category/${categories.id}`}>
                                    <DropdownMenuItem >
                                        {categories.name}
                                    </DropdownMenuItem>
                                </Link>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger className=' bg-none  rounded-md flex gap-1 items-center px-2 dark:border-zinc-700 focus-visible:border-zinc-600'>
                            Home <span><ChevronDown className=' h-4 w-4' /></span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='border dark:bg-zinc-900 dark:border-zinc-600'>
                            <DropdownMenuLabel className=' text-base text-rose-50 flex flex-row items-center gap-3'>Top Selling<span><ChartLine /></span></DropdownMenuLabel>
                            <DropdownMenuSeparator className=' bg-black dark:bg-white' />
                            <DropdownMenuItem>
                                <Link href="#best_seller">
                                    Best Sellers
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="#new_arrivals">
                                    New release
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="#best_deals">
                                    Best deals
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>Black friday sale</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger className=' bg-none  rounded-md flex gap-1 items-center px-2 hover:border-none border-none '>
                            Menu <span><ChevronDown className=' h-4 w-4' /></span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='border dark:bg-zinc-900 dark:border-zinc-600'>
                            <DropdownMenuLabel className=' flex flex-row items-center gap-3'>My Account <span><User /> </span></DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {/* <MenuItemData /> */}
                            <Link href="/cart">
                                <DropdownMenuItem>
                                    Wishlists
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/orders">
                                <DropdownMenuItem>
                                    Your Orders
                                </DropdownMenuItem>
                            </Link>

                        </DropdownMenuContent >
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger className=' bg-none  rounded-md flex gap-1 items-center px-2 hover:border-none border-none '>
                            Full Screen Menu <span><ChevronDown className=' h-4 w-4' /></span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {data.map(async (category) => {
                                const sub_category = await db.subCategory.findMany({
                                    take: 10,
                                    where: {
                                        categoryId: category.id,
                                    }
                                })
                                return (
                                    <DropdownMenuSub key={category.id}>
                                        <DropdownMenuSubTrigger>
                                            {category.name}
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent>
                                            {sub_category.map((sub) => (
                                                <Link key={sub.id} href={`/category/sub-category/${sub.id}`}>
                                                    <DropdownMenuItem >
                                                        {sub.name}
                                                    </DropdownMenuItem>
                                                </Link>
                                            ))}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>
                    <SeerchInputWrapper />
                </div>
            </div >

        </div>
    )
}

export default ProductNavbar