import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import OrderDetailPage from './_components/order-detail';
import { Metadata } from 'next';

type Props = {}
export const metadata: Metadata = {
    title: "AM Store | Order page",
};
const page = async (props: Props) => {

    const { userId } = auth()


    const orders = await db.order.findMany({
        where: {
            userId: userId!,
            isPaid: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const address = await db.address.findUnique({
        where: {
            userId: userId!,
        }
    })

    return (
        <MaxWidthWrapper className=' mt-10 '>
            <h2 className="mb-8 text-5xl px-5 font-bold font-heading">Thanks for ordering</h2>
            {orders.map((order) => (
                <OrderDetailPage
                    key={order.id}
                    orderId={order.id}
                    price={order.totalPrice}
                    address={address!}
                    date={order.createdAt}
                    status={order.isPaid}
                />
            ))}
        </MaxWidthWrapper>
    )
}

export default page