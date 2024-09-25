import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { Metadata } from 'next'
import CartItems from './_components/ch-cart-items'
import { toast } from 'sonner'
type Props = {}
export const metadata: Metadata = {
    title: "AM Store | Shopping Cart",
};
const page = async (props: Props) => {
    const { userId } = auth()
    if(!userId) {
        toast.message("You need to sign-in first");
        return redirect("/sign-in");
    }

    const cartItems = await db.cart.findMany({
        where: {
            userId,
        }
    })
    return (
        <MaxWidthWrapper className='PX-10 dark:bg-black'>
                <CartItems data={cartItems}/>
        </MaxWidthWrapper>
    )
}

export default page