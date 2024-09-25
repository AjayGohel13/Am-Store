"use client"
import React from 'react'
import { Button } from './ui/button'
import { LayoutDashboard, Loader2, ShoppingCart, User2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ClerkLoaded, ClerkLoading, UserButton, useUser } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { dark } from '@clerk/themes'
import Image from 'next/image'
import { ModeToggle } from './mode-toggle'
import { useRouter } from 'next/navigation'
import { toast } from './ui/use-toast'
type Props = {
    className?: string;
}
const Navigation = ({ className }: Props) => {
    const { resolvedTheme } = useTheme();
    const router = useRouter()
    const { user } = useUser()
    const onClick = () => {
        if (!user?.id) {
            toast({
                title: "You need to sign-in first",
                action: (
                    <Link href="/sign-in">
                        <Button variant="cart">
                            Sign-In
                        </Button>
                    </Link>
                ),
            })
        } else {
            router.push("/cart");
        }
    }

    return (

        <div className='w-full hidden lg:flex items-center gap-x-2  overflow-x-auto  ' >
            <div className={cn(" w-full  flex sticky items-center max-w-screen-2xl z-50  justify-between mx-auto  ", className)}>
                <Link href="/" className='  flex flex-row items-center  '>
                    <Image
                        width={150}
                        height={150}
                        src="/logo.png"
                        alt="Logo"
                        className=" h-20 w-20 "
                    />
                    <h1 className='bg-gradient-to-b from-lime-400 to-gray-800  text-transparent bg-clip-text text-5xl font-bold'>Am-Store</h1>
                </Link>

                <div>
                    <ul className=" leading-none flex  w-full items-center justify-around gap-3 ">
                        <div className='  py-3'>
                            <ModeToggle />
                        </div>
                        <ul className=" leading-none flex  w-full items-center justify-start ">
                            {!user?.id && (
                                <Link href='/sign-in' >
                                    <Button variant='ghost' >
                                        <User2 />
                                    </Button>
                                </Link>
                            )}

                            {user?.id && (
                                <Button variant='ghost' >
                                    <ClerkLoaded>
                                        <div className=" flex items-center text-black dark:text-white gap-3 " >
                                            {user?.fullName}
                                            <UserButton
                                                appearance={{
                                                    baseTheme: resolvedTheme === "dark" ? dark : undefined,
                                                }}
                                            >

                                                <UserButton.MenuItems >
                                                    <UserButton.Link
                                                        label="Continue to Dashboard"
                                                        labelIcon={<LayoutDashboard className=' h-4 w-4' />}
                                                        href="/users/dashboard"
                                                    />
                                                </UserButton.MenuItems>
                                            </UserButton>
                                        </div>
                                    </ClerkLoaded>
                                    <ClerkLoading>
                                        <Loader2 className=' size-8 animate-spin text-slate-400 ' />
                                    </ClerkLoading>
                                </Button>
                            )}
                        </ul>
                        <Button onClick={onClick} variant='ghost' size="default" className=' mr-3' >
                            <ShoppingCart />
                        </Button>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Navigation