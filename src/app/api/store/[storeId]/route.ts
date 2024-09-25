import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth()
        const { storeId } = params;
        if (!userId) return new NextResponse("UNAUTHORISES", { status: 401 });

        if (userId !== process.env.ADMIN_ID) {
            return new NextResponse("UNAUTHORISED USER", { status: 401 })
        }

        const store = await db.store.findUnique({
            where: {
                id: storeId,
            }
        })
        if (!store) {
            return new NextResponse("STORE_DATA_IS_MISSING", { status: 404 })
        }


        const orderIsPendingChecking = await db.orderItem.findFirst({
            where: {
                storeId,
                userId,
                deliveryStatus: false,
            }
        })

        if (orderIsPendingChecking) {
            return new NextResponse("There are product which needs to delivered", { status: 402 })
        }
        const store_delete = await db.store.delete({
            where: {
                id: storeId,
            },
            include:{
                orderItem:true,
                products:true,
            }
        })
        return NextResponse.json(store_delete)
    } catch (error) {
        console.log("[storeId_api_delete]", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}