import { db } from '@/lib/db'
import { formatCurrency } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import { Cart } from '@prisma/client'
import { Cross, SquareX, X } from 'lucide-react'
import { notFound } from 'next/navigation'
import React from 'react'
import CheckoutButton from './checkout-btn'
import DeleteBtn from './delete-btn'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  data: Cart[]
}

const CartItems
 = async ({ data }: Props) => {

  const cartTotal = data.reduce((accumulator, item) => {
    return accumulator + item.price!
  }, 0)

  const { userId } = auth()
  if (!userId) return notFound()

  const hasAddress = await db.address.findUnique({
    where: {
      userId,
    }
  })

  let IsRegistered = true;

  if (!hasAddress) {
    IsRegistered = false;
  }
  return (
    <section className="pt-12 pb-24 bg-blueGray-100">
      {data.length > 0 && (
        <div className="container px-4 mx-auto">
          <div className="pb-9 mb-7 text-center border-b border-black border-opacity-5">
            <h2 className="text-5xl leading-normal font-heading font-medium text-center">Your cart</h2>
          </div>
          <div className="py-12 px-8 md:px-12 mb-14 xl:mb-9 dark:bg-black rounded-3xl">
            <span className="inline-block mb-16 text-darkBlueGray-300 font-medium">{data.length} Product</span>
            <div className="lg:px-10">
              {data.map(async (item) => {

                const image = await db.images.findFirst({
                  where: {
                    productId: item.productId,
                  }
                })
                const product = await db.product.findUnique({
                  where: {
                    id: item.productId,
                  }
                })
                return (
                  <div className="relative py-4 flex flex-wrap items-center -mx-4" key={item.id}>
                    <div className="relative w-full md:w-auto px-4 md:pr-10 mb-6 md:mb-0">
                      <Link className="block mx-auto max-w-max" href={`/product/${item.productId}`}>
                        <Image height={140} width={140} className="w-24 object-cover rounded-md" src={image?.imageUrl!} alt="" />
                      </Link>
                    </div>
                    <div className="w-full md:w-auto px-4">
                      <div className=' flex mb-5 flex-row items-center'>

                        <Link className="block text-xl font-heading font-medium hover:underline" href={`/product/${item.productId}`}>{item.productName}</Link>
                        <DeleteBtn id={item.id} />

                      </div>
                      <div className="flex flex-wrap">
                        <p className="mr-4 text-sm font-medium">
                          <span className="font-heading">Variant:</span>
                          <span className="ml-2 text-gray-400">{product?.variant}</span>
                        </p>
                        <p className="mr-4 text-sm font-medium">
                          <span className="font-heading">Brand:</span>
                          <span className="ml-2 text-gray-400">{product?.brand}</span>
                        </p>

                      </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-auto ml-auto px-4 mb-6 md:mb-0">
                      <div className="inline-flex w-full md:w-auto mb-4 md:mb-0 md:mr-10 items-center">
                        <h4 className="mr-4 font-heading font-medium">Qty:</h4>
                        <div className="w-16 px-3 py-2 text-center placeholder-gray-400 text-gray-400 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" >
                          {item.number}
                        </div>
                      </div>
                      <span className="text-xl font-heading font-medium text-blue-500">
                        <span>{formatCurrency(item.price!)}</span>
                      </span>
                    </div>
                    <button className="absolute top-0 right-0 lg:mt-2 lg:-mr-4 ">
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="lg:flex xl:items-center">
            <div className="mb-10 xl:mb-0 lg:w-2/12 xl:w-1/12">
              <h3 className="text-xl font-heading font-medium">Cart totals</h3>
            </div>
            <div className="sm:flex sm:flex-wrap lg:justify-end items-center lg:w-10/12 xl:w-11/12">
              <div className="sm:pr-3 lg:px-3 mb-6 xl:mb-0 w-full sm:w-1/2 lg:w-4/12 xl:w-3/12">
                <div className="relative flex items-center justify-between py-4 px-10 leading-8 font-medium rounded-3xl">
                  <div className="absolute left-3 flex justify-center items-center w-20 h-20 rounded-full">
                    <div className="flex justify-center items-center w-11 h-11 text-xl text-white font-bold bg-blue-500 rounded-full">{data.length}</div>
                  </div>
                  <span className="ml-16">Products</span>
                </div>
              </div>
              <div className="sm:pl-3 lg:px-3 mb-3 xl:mb-0 w-full sm:w-1/2 lg:w-4/12 xl:w-3/12">
                <div className="flex items-center justify-between py-4 px-10 leading-8 font-heading font-medium rounded-3xl">
                  <span>Shipping:</span>
                  <span className="flex items-center">
                    <span className="mr-3 text-sm">$</span>
                    <span className="text-xl">{formatCurrency(10)}</span>
                  </span>
                </div>
              </div>
              <div className="sm:pr-3 lg:px-3 mb-10 sm:mb-0 w-full sm:w-1/2 lg:w-4/12 xl:w-3/12">
                <div className="flex items-center justify-between py-4 px-10 leading-8 font-heading font-medium rounded-3xl">
                  <span>Total:</span>
                  <span className="flex items-center text-blue-500">
                    <span className="text-xl">{formatCurrency(cartTotal + 10)}</span>
                  </span>
                </div>
              </div>
              <CheckoutButton count={data.length} isRegistered={IsRegistered} />
            </div>
          </div>
        </div>)}
      {data.length === 0 && (
        <div>

          <h1 className=' text-2xl'>Your cart is Empty!</h1>
          <Link href="/product" > Click here to continue Shopping</Link>
        </div>
      )}
    </section>
  )
}

export default CartItems
