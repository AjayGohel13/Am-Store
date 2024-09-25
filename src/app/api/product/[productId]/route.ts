import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function PATCH(
    req:Request,
    {params}:{params:{productId:string}}
) {
    try {
        const { userId } = auth()
        const { productId } = params;
        const values = await req.json()
        if(!userId) return new NextResponse("UNAUTHORISES",{status:401});

        const ownerCheck = await db.store.findUnique({
            where:{
                userId:userId,
                isVerified:true,
            }
        });

        if(!ownerCheck){
            return new NextResponse("There is no store with this user id",{status:401})
        }
        
        const product = await db.product.update({
            where:{
                id:productId,
                userId,
            },
            data:{
                ...values,
            }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log("[ProductId api]", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}
export async function DELETE(
    req:Request,
    {params}:{params:{productId:string}}
) {
    try {
        const { userId } = auth()
        const { productId } = params;
        if(!userId) return new NextResponse("UNAUTHORISES",{status:401});

        const ownerCheck = await db.store.findUnique({
            where:{
                userId:userId,
            }
        });

        if(!ownerCheck){
            return new NextResponse("There is no store with this user id",{status:401})
        }

        const orderIsPendingCheckin = await db.orderItem.findFirst({
            where:{
                productId,
                userId
            }
        })

        if(orderIsPendingCheckin) {
            return new NextResponse("There are product which needs to delivered",{status:402})
        }
        
        const product = await db.product.delete({
            where:{
                id:productId,
                userId,
            },
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log("[ProductId api]", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}