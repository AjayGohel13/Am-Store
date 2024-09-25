"use client"
import React, { useEffect } from 'react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { ShoppingCartIcon } from 'lucide-react';
import { Separator } from './ui/separator';
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { useState } from 'react'
import { useCart } from '@/hooks/use-cart';
import { ScrollArea } from './ui/scroll-area';
// import CartItem from './Cart-Item';
import CartItemViewer from './cart-item-viewer';

const Carts = () => {
    const { items } = useCart()

    const itemsCount = items?.length;
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])
    const cartTotal = items.reduce((total, { product }) => total + product?.price!,
        0
    )

    return (
        <div>
            <Sheet>
                <SheetTrigger className='group flex items-center'>
                    <ShoppingCartIcon
                        aria-hidden='true'
                        className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500' />
                    <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-500 dark:text-white'>
                        {isMounted ? itemsCount : 0}
                    </span>
                </SheetTrigger>
                <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg border-l border-gray-500 dark:border-zinc-800 dark:bg-black '>
                    <SheetHeader className='space-y-2.5 pr-6'>
                        <SheetTitle> WishList({itemsCount})</SheetTitle>
                    </SheetHeader>
                    {Number(itemsCount) > 0 ? (
                        <>
                            <div className="flex w-full flex-col pr-6">
                                <ScrollArea>
                                    {items?.map(( item ) => (
                                        <CartItemViewer product={item.product} key={item.product.id} />
                                    ))}
                                    Cart Items
                                </ScrollArea>

                            </div>
                            <div className="space-y-4 pr-6">
                                <Separator />

                                <SheetFooter>
                                    <SheetTrigger asChild>
                                        <Link href='/cart' className={buttonVariants({
                                            className: 'w-full',
                                        })}>Continue to checkout</Link>
                                    </SheetTrigger>
                                </SheetFooter>
                            </div>
                        </>

                    ) : (

                        <div className='flex h-full flex-col items-center justify-center space-y-1'>
                            <div aria-hidden="true" className="relative mb-4 h-60 w-60 text-muted-foreground">
                            </div>
                            <div className="text-xl font-semibold">Your Cart is Empty</div>
                            <SheetTrigger asChild>
                                <Link href="/product"
                                    className={buttonVariants({
                                        variant: 'link',
                                        size: 'sm',
                                        className: 'text-sm text-muted-foreground',
                                    })}>Add items to your Cart</Link>
                            </SheetTrigger>

                        </div>
                    )}
                </SheetContent>
            </Sheet>

        </div>
    )
}

export default Carts
