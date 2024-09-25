import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { formatCurrency } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import { Address } from '@prisma/client';
import { format } from 'date-fns';
import { BookCheck, CheckCheck, Mail, Phone, Truck,  } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaTruckMoving } from 'react-icons/fa';

type Props = {
    orderId: string;
    price: number;
    address: Address;
    date: Date;
    status: boolean | undefined;
}
const OrderDetail = async ({ status, date, orderId, price, address }: Props) => {

    const orderItems = await db.orderItem.findMany({
        where: {
            orderId,
        }
    })
    const user = await currentUser()
    return (
        <section>
            <div className="pt-12 pb-24 bg-white dark:bg-black overflow-hidden">
                <div className="container px-4 mx-auto">
                    <div className="relative pb-9 text-center">
                        <h2 className=" text-4xl md:text-5xl lg:text-9xl leading-normal font-heading font-medium text-center dark:text-white">Thanks for order</h2>
                        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-screen border-b border-black dark:border-zinc-600 border-opacity-5"></div>
                    </div>
                    <div className="sm:flex sm:justify-center sm:items-center p-8 xl:p-10 mb-8 xl:mb-32 border-b border-black dark:border-zinc-600 border-opacity-10">
                        <div className="md:flex-shrink-0 flex  justify-center">
                            <div className="justify-center h-16 w-16 flex items-center rounded-full bg-green-100 text-green-500">
                                <CheckCheck className='w-1/3 h-1/3 scale-150' />
                            </div>
                        </div>
                        <h3 className="sm:ml-10 text-lg md:text-xl font-heading font-medium text-center md:text-left">Payment completed successfully!</h3>
                    </div>
                    <div className="md:flex md:flex-wrap">
                        <div className="w-full md:w-6/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12 md:pr-7 xl:pr-24 xl:pl-32 mb-14 md:mb-0">
                            <div className="bg-white dark:bg-black rounded-3xl">
                                <p className="sm:pl-7 mb-11 text-gray-400 font-medium">Your orders:</p>
                                {orderItems.map(async (item) => {
                                    const product = await db.product.findUnique({
                                        where: {
                                            id: item.productId!,
                                        }
                                    })

                                    const image = await db.images.findFirst({
                                        where: {
                                            productId: product?.id,
                                        }
                                    })
                                    return (
                                        <div className="sm:flex sm:items-center pb-7 mb-7 border-b border-black border-opacity-5" key={item.id}>
                                            <Image  className="h-16 sm:pl-7 mb-6 sm:mb-0 sm:mr-12 mx-auto sm:ml-0 object-cover" src={image?.imageUrl!} alt="product-image" height={100} width={100} />
                                            <div>
                                                <Link className="inline-block mb-1 text-lg hover:underline font-heading font-medium" href={`/product/${item.productId}`}>{item.productName}</Link>
                                                <div className="flex flex-wrap">
                                                    <p className="mr-4 text-sm font-medium">
                                                        <span className="font-heading">Color:</span>
                                                        <span className="ml-2 text-gray-400">{product?.variant}</span>
                                                    </p>
                                                    <p className="mr-4 text-sm font-medium">
                                                        <span>Qty:</span>
                                                        <span className="ml-2 text-gray-400">{item.number}</span>
                                                    </p>
                                                    <p className="text-sm font-medium mr-4">
                                                        <span>Price:</span>
                                                        <span className="ml-2 text-gray-400">{formatCurrency(product?.price!)}</span>
                                                    </p>
                                                    <p className="text-sm font-medium">
                                                        <span>Total:</span>
                                                        <span className="ml-2 text-gray-400">{formatCurrency(item.price!)}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="flex flex-wrap ">
                                    <div className="w-full lg:w-auto px-4 md:px-10 mb-6 lg:mb-0">
                                        <h4 className="mb-6 font-bold font-heading flex items-center gap-2">Delivery Address<Truck className=' h-6 w-6' /></h4>
                                        <p className="text-gray-500">{address.house_no},{" "}{address.street_no},{" "}{address.city},{" "}{address.state}</p>
                                        <p className="text-gray-500">{" "}{address.country}{" "}-{" "} {address.pincode}</p>
                                    </div>
                                    <div className="w-full lg:w-auto px-4 md:px-10 mb-6 lg:mb-0">
                                    <h4 className="mb-6 font-bold font-heading flex items-center gap-2">Shipping Information<BookCheck className=' h-6 w-6' /></h4>
                                    <p className="text-gray-500 flex gap-2 items-center"><Mail/> {user?.emailAddresses[0].emailAddress}</p>
                                        <p className="text-gray-500 flex gap-2 items-center mt-2"><Phone/>{address.contactNo}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="md:pl-7 w-full md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12">
                            <div className="pt-11 pb-11 bg-slate-200 dark:bg-zinc-800 rounded-md">
                                <div className="">
                                    <div className="px-10 pb-7 ">
                                        <div className=' w-full mb-5 flex items-center justify-between'>
                                            <h3 className=" text-3xl dark:text-slate-200 font-heading font-medium">Total</h3>
                                            <p className=' text-base font-semibold'>{format(date, "dd MMMM,yyyy")}</p>
                                        </div>
                                        <p className="flex items-center justify-between leading-8 font-heading font-medium">
                                            <span className="dark:text-white text-opacity-70">Subtotal</span>
                                            <span className="flex items-center text-xl dark:text-white">
                                                <span>{formatCurrency(price)}</span>
                                            </span>
                                        </p>
                                        <p className="flex items-center justify-between leading-8 font-heading font-medium">
                                            <span className="dark:text-white text-opacity-70">Shipping</span>
                                            <span className="flex items-center text-xl dark:text-white">
                                                <span>{formatCurrency(10)}</span>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="px-10 mb-7">
                                    <div className="py-5 border-y border-black dark:border-zinc-500">
                                        <p className="flex items-center justify-between leading-8 font-heading font-medium">
                                            <span className="dark:text-white">Total</span>
                                            <span className="flex items-center text-xl dark:text-white">
                                                <span>{formatCurrency(price + 10)}</span>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="px-10 w-full">
                                    <p className="text-gray-400 font-medium">Payment method: {status ? "Card" : "Pay on Delivery"}</p>
                                </div>
                                <div className="px-10 pt-5 w-full">
                                    <div className=' mx-auto'>
                                        <Button
                                            variant="default"
                                        >
                                            Download Invoice
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrderDetail