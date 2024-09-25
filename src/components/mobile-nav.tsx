import React from 'react'
import { MobileSidebar, SidebarLink, SidebarProvider } from './ui/Sidebar'
import Link from 'next/link'
import Image from 'next/image'
import { ChartLine, ChevronDown, User } from 'lucide-react'
import UserNav from './UserNav'
import { Category } from '@prisma/client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from './ui/dropdown-menu'
import { db } from '@/lib/db'

type Props = {
    data: Category[]
}

const MobileBar = ({ data }: Props) => {

    return (
        <SidebarProvider>
            <MobileSidebar className='' >
                <div className='rounded-md flex flex-col justify-around text-black-2 dark:text-white h-full pt-5 '>
                    <div className="flex flex-col flex-1 overflow-y-auto  ">
                        <Link href="/" className='  flex flex-row items-center  '>
                            <Image
                                width={150}
                                height={150}
                                src="/logo.png"
                                alt="Logo"
                                className=" h-16 w-16  "
                            />
                            <h1 className='bg-gradient-to-b from-lime-400 to-gray-800  text-transparent bg-clip-text text-3xl font-bold'>Am-Store</h1>
                        </Link>
                        <div className='w-full flex flex-col items-start gap-y-5 '>
                            <DropdownMenu >
                                <DropdownMenuTrigger className=' bg-white dark:bg-gray-800 rounded-md  '>
                                    <div className='flex gap-1 items-center justify-between w-full px-2 py-2 hover:border-none border-none focus-visible:border-none '>
                                        <div className=' flex items-center gap-1 '>
                                            Categories
                                            <ChevronDown className='ml-1 h-4 w-4' />
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className=' border dark:bg-zinc-900 dark:border-zinc-600 '>
                                    <DropdownMenuLabel className=' text-base dark:text-emerald-50'>Top Categories</DropdownMenuLabel>
                                    <DropdownMenuSeparator className=' bg-black dark:bg-white' />
                                    {data.map((categories) => (
                                        <DropdownMenuItem key={categories.id}>
                                            <SidebarLink label={categories.name} link={`/category/${categories.id}`} />
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger className=' bg-none  rounded-md flex gap-1 items-center px-2 hover:border-none border-none '>
                                    Mega Menu <span><ChevronDown className=' h-4 w-4' /></span>
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
                                                    <SidebarLink label={category.name} link={`/category/${category.id}`} />
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuSubContent>
                                                    {sub_category.map((sub) => (
                                                        <DropdownMenuItem key={sub.id}>
                                                            <SidebarLink label={sub.name} link={`/category/sub-category/${sub.id}`} />
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuSubContent>
                                            </DropdownMenuSub>
                                        )
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger className=' bg-none  rounded-md flex gap-1 items-center px-2 dark:border-zinc-700 focus-visible:border-zinc-600'>
                                    Home <span><ChevronDown className=' h-4 w-4' /></span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='border dark:bg-zinc-900 dark:border-zinc-600'>
                                    <DropdownMenuLabel className=' text-base dark:text-rose-50 flex flex-row items-center gap-3'>Top Selling<span><ChartLine /></span></DropdownMenuLabel>
                                    <DropdownMenuSeparator className=' bg-black dark:bg-white' />
                                    <DropdownMenuItem>Best Sellers</DropdownMenuItem>
                                    <DropdownMenuItem>New release</DropdownMenuItem>
                                    <DropdownMenuItem>Best deals</DropdownMenuItem>
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
                                    <DropdownMenuItem>Wishlists</DropdownMenuItem>
                                    <DropdownMenuItem>Your Orders</DropdownMenuItem>
                                    <DropdownMenuItem>Address Details</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div>
                        <UserNav isName={true} />
                    </div>
                </div>
            </MobileSidebar>
        </SidebarProvider>

    )
}

export default MobileBar