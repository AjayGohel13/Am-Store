"use client"
import ImageSlider from '@/components/imageSlider';
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@prisma/client'
import axios from 'axios';
import { BaggageClaim, Check, CircleAlert, CircleGauge, HeartHandshake, History, Shield, Star } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FeaturePreview } from './Feature-preview';
import { toast } from 'sonner';

type Props = {
    data: Product;
    category: string;
    images: string[]
}
const BREADCRUMBS = [
    { id: 1, name: 'Home', href: "/" },
    { id: 3, name: 'Product', href: '/product' },
]
const Overview = ({ data, category, images }: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const onClick = async () => {
        try {
            setIsLoading(true)
            await axios.post(`/api/product/${data.id}/cart`)
            toast.info("Item has been added to Cart.",)
        } catch (error) {
            toast.error("Uh oh! Something went wrong.There was a problem with your request.")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <MaxWidthWrapper>
            <div className=" mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
                <div className="lg:max-w-lg lg:self-end  ">
                    <ol className='flex items-center space-x-2 mb-3 '>
                        {BREADCRUMBS.map((breadcrumb, i) => (
                            <li key={breadcrumb.href}>
                                <div className='flex items-center text-sm'>
                                    <Link
                                        href={breadcrumb.href}
                                        className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                                        {breadcrumb.name}
                                    </Link>
                                    {i !== BREADCRUMBS.length - 1 ? (
                                        <svg
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                            aria-hidden='true'
                                            className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                                            <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                                        </svg>
                                    ) : null}
                                </div>
                            </li>
                        ))}
                    </ol>
                    <p>{category}</p>

                    <div className="mt-4">
                        <h1 className="text-3xl font-extrabold tracking-tight dark:text-gray-100 sm:text-4xl">{data.title}<span className=' font-medium text-muted-foreground text-xl ml-4'>{data.brand}</span></h1>
                    </div>

                    <section aria-labelledby="information-heading" className="mt-4">

                        <div className="flex items-center">
                            <p className="text-lg dark:text-gray-100 sm:text-xl">{formatCurrency(data.price!)}</p>

                            <div className="ml-4 pl-4 border-l border-gray-300">
                                <h2 className="sr-only">Reviews</h2>
                                <div className="flex items-center">
                                    <div>
                                        <div className="flex items-center">
                                            <Star className=' text-yellow-300 h-5 w-5 flex-shrink-0' fill='yellow' />
                                            <Star className=' text-yellow-300 h-5 w-5 flex-shrink-0' fill='yellow' />
                                            <Star className=' text-yellow-300 h-5 w-5 flex-shrink-0' fill='yellow' />
                                            <Star className=' text-yellow-300 h-5 w-5 flex-shrink-0' fill='yellow' />
                                            <Star className=' text-yellow-300 h-5 w-5 flex-shrink-0' />


                                        </div>
                                        <p className="sr-only">4 out of 5 stars</p>
                                    </div>
                                    <p className="ml-2 text-sm text-gray-500">1624 reviews</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <div className="text-xl dark:text-white font-bold flex items-center gap-3"><HeartHandshake className=' h-6 w-6' />Benifits</div>
                            <div className=' flex flex-col gap-3'>

                                <div className='group inline-flex text-sm text-medium ml-4'>
                                    <History
                                        aria-hidden='true'
                                        className='mr-2 h-5 w-5 flex-shrink-0 text-emerald-400'
                                    />
                                    <span className='text-muted-foreground hover:text-gray-700'>

                                        30 Day Return Guarantee
                                    </span>

                                </div>
                                <div className='group inline-flex text-sm text-medium ml-4'>
                                    <Shield
                                        aria-hidden='true'
                                        className='mr-2 h-5 w-5 flex-shrink-0 text-emerald-400'
                                    />
                                    <span className='text-muted-foreground hover:text-gray-700'>

                                        Damage and theft insurance
                                    </span>

                                </div>
                                <div className='group inline-flex text-sm text-medium ml-4'>
                                    <CircleGauge
                                        aria-hidden='true'
                                        className='mr-2 h-5 w-5 flex-shrink-0 text-emerald-400'
                                    />
                                    <span className='text-muted-foreground hover:text-gray-700'>

                                        Warranty included
                                    </span>

                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center">
                            {(data.stock!) > 10 &&
                                <div className=' flex items-center'>
                                    <Check className='flex-shrink-0 w-5 h-5 text-green-500' />
                                    <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
                                </div>
                            }

                            {Number(data.stock) < 10 && <div className='mt-6 flex items-center'>
                                <CircleAlert aria-hidden='true' className='h-5 w-5 flex-shrink-0 text-red-500' />
                                <p className='ml-2 text-sm text-muted-foreground text-red-500 '>
                                    Hurry Up only {' '}{data.stock} {data.title} left...
                                </p>
                            </div>}
                        </div>
                    </section>
                </div>

                <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
                    <div className=" rounded-2xl overflow-hidden">
                        <ImageSlider
                            urls={images}
                        />
                    </div>
                </div>

                <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
                    <section aria-labelledby="options-heading">
                        <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
                            <div>
                                <div className='mt-10'>
                                    <Button
                                        onClick={onClick}
                                        disabled={isLoading}
                                        variant="default"
                                        size='lg'  >
                                        {isLoading ? 'Added' : 'Add to Cart'}
                                        {" "}{" "}{" "}<BaggageClaim className="ml-3" aria-hidden='true' />
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
                <div className=' w-full'>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Features and Specification</AccordionTrigger>
                            <AccordionContent>
                                <FeaturePreview
                                    value={data.features!}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>


                    <Accordion type="single" collapsible className=' mt-5'>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Description and details</AccordionTrigger>
                            <AccordionContent>
                                <h1 className=' text-lg dark:text-wrap font-semibold'>{data.description!}</h1>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </div>

            </div>
        </MaxWidthWrapper>

    )
}

export default Overview

