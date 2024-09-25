import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react'
import OrderDetailPage from '../_components/order-detail';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import OrderDetail from './_components/order-detail';

type Props = {
    params: {
        orderId: string;
    }
}
const page = async ({ params }: Props) => {
    const { orderId } = params;
    const { userId } = auth()

    const order = await db.order.findUnique({
        where: {
            id: orderId,
        }
    })
    const address = await db.address.findUnique({
        where: {
            userId: userId!,
        }
    })

    return (
        <MaxWidthWrapper className=' mt-10'>
            {/* <OrderDetailPage
                key={order?.id!}
                orderId={order?.id!}
                price={order?.totalPrice!}
                address={address!}
                date={order?.createdAt!}
            /> */}
            <OrderDetail
                key={order?.id!}
                orderId={order?.id!}
                price={order?.totalPrice!}
                address={address!}
                date={order?.createdAt!}
                status={order?.isPaid}
            />
        </MaxWidthWrapper>
    )
}

export default page