"use client"
import ImageSlider from '@/components/imageSlider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency } from '@/lib/utils';
import axios from 'axios';
import { ArrowRight, Eye, Store } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
type Props = {
    id: string;
    title: string;
    imageUrl: string[];
    price: number;
    category: string | undefined;
    description: string;
    brand: string;
    storeName: string;
}

const ProductCard = ({
    id,
    title,
    imageUrl,
    price,
    description,
    storeName,
    category,
}: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const { user } = useUser()
    const onClick = async () => {
        try {
            setIsLoading(true)
            if (!user?.id) {
                return toast({
                    title: "You need to sign-in first",
                    action: (
                        <Link href="/sign-in">
                            <Button variant="cart">
                                Sign-In
                            </Button>
                        </Link>
                    ),
                })
            }
            await axios.post(`/api/product/${id}/cart`)
            toast({
                description: "Item has been added to Cart.",
            })
        } catch (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className=" p-2 sm:p-4 sm:max-w-[300px]   bg-gray-50 border xsm:max-w-full hover:border hover:border-zinc-950 rounded-sm shadow dark:bg-zinc-900 dark:border-zinc-700 ">

            <div className=' hover:scale-105 transition ease-linear relative'>
                <ImageSlider
                    urls={imageUrl}
                />
            </div>


            <div className="  p-1 sm:p-3">
                <Link href={`/product/${id}`} className=' flex justify-between flex-col items-start sm:flex-row sm:items-center '>
                    <div className=' flex flex-row items-center'>
                        <h5 className="mb-2  text-xs sm:text-2xl font-bold tracking-tight  text-gray-900 dark:text-white line-clamp-1">{title}</h5>
                    </div>
                    <p className=' font-bold pl-0  sm:pl-2'>
                        {formatCurrency(price)}
                    </p>
                </Link>
            </div>
            <div className=' flex flex-row sm:flex-col justify-between px-3 items-center '>
                <div className=' hidden sm:block  w-full'>
                    <p className='hidden sm:flex flex-row items-center gap-2 text-xs sm:text-base'><Store className=' text-muted-foreground h-4 w-4' />{storeName}</p>
                    <div className=' hidden sm:block'>
                        <p className="mb-3 xsm:text-xs md:text-base font-normal text-gray-700 dark:text-gray-400 line-clamp-2 ">{description}</p>
                    </div>
                </div>

                <div className=' flex items-center justify-between mb-2 w-full'>
                    <div
                        className='hidden 3xsm:flex flex-row items-center 3xsm:text-xs justify-between text-base text-muted-foreground'
                    >
                        <p className=' w-full'>Read more</p>
                        <ArrowRight />
                    </div>
                    <Dialog>
                        <DialogTrigger >
                            <Button variant="ghost">
                                <Eye className=' h-3 w-3 xsm:h-5 xsm:w-5' />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-5xl dark:bg-zinc-950 dark:border-zinc-700">
                            <DialogHeader>
                                <DialogTitle className=' text-3xl text-rose-400 font-bold'>{title}</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col  md:flex-row justify-between items-center p-10 ">
                                <div className=" flex items-center justify-center w-full">
                                    <Image
                                        height={180}
                                        width={180}
                                        loading="eager"
                                        className="z-10 h-60 w-60 rounded-md object-center  "
                                        src={imageUrl[0]}
                                        alt="product image"
                                    />
                                </div>
                                <div className=" flex flex-col items-start justify-center gap-3 w-full">
                                    <h2 className=' text-xl font-semibold'>CATEGORY:{category}</h2>
                                    <h1 className='text-rose-600 font-medium text-2xl'>{formatCurrency(price)}</h1>
                                    <p className=' line-clamp-3 '>{description}</p>
                                    <Button
                                        variant="cart"
                                        disabled={isLoading}
                                        className=' w-full'
                                        onClick={onClick}
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                            <DialogFooter>

                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>

            <div>
                <Button
                    variant="outline"
                    disabled={isLoading}
                    className="bg-gray-300/60 dark:bg-gray-500/50 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500/90 w-full"
                    onClick={onClick}
                >
                    Add to Cart
                </Button>
            </div>
        </div>

    )
}

export default ProductCard