'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'
import clsx from 'clsx'
import { ModeToggle } from '@/components/mode-toggle'
import { LayoutDashboard, Loader2, BarChart, LogOut, Bolt, PackagePlus, PackageSearch } from "lucide-react";

type Props = {}



const MenuOptions = (props: Props) => {

    const menuOption = [
        {
            label: "Dashboard",
            href: "/admin",
            icon: (
                <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
            ),
        },
        {
            label: "Analysis",
            href: "/admin/analysis",
            icon: (
                <BarChart className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
            ),
        },
        {
            label: "Product-lists",
            href: "/admin/product-lists",
            icon: (
                <PackagePlus className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
            ),
        },
        {
            label: "Seller-lists",
            href: "/admin/seller",
            icon: (
                <PackageSearch className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
            ),
        },
        {
            label: "Settings",
            href: "/admin/settings",
            icon: (
                <Bolt className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
            ),
        },
   
    ];
    const pathName = usePathname()
    return (
        <nav className=' dark:bg-black h-screen overflow-scroll justify-between flex items-center flex-col gap-10 py-6 px-2'>
            <div className=' flex items-center justify-center flex-col gap-8'>
                <Link
                    className=' flex font-bold flex-row '
                    href='/'
                >
                    fuzzie
                </Link>
                <TooltipProvider>
                    {menuOption.map((menuItem) => (
                        <ul key={menuItem.label}>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger>
                                    <li>
                                        <Link className={clsx(
                                            'group h-8 w-8 flex items-center justify-center  scale-[1.5] rounded-lg p-[3px]  cursor-pointer',
                                            {
                                                'dark:bg-[#2F006B] bg-[#EEE0FF] ':
                                                    pathName === menuItem.href,
                                            }
                                        )} href={menuItem.href} >
                                            <div>{menuItem.icon}</div>
                                        </Link>
                                    </li>
                                </TooltipTrigger>
                                <TooltipContent
                                    className=' bg-black/10 backdrop-blur-xl'
                                    side='right'
                                >
                                    <p>{menuItem.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        </ul>
                    ))}
                </TooltipProvider>
            </div>
            <div className="flex items-center justify-center flex-col gap-8">
                <ModeToggle />
            </div>
        </nav>
    )
}

export default MenuOptions