import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
    req:Request,
    {params}:{params:{cartId:string}}
) {
    try {
        const { userId } = auth()
        if(!userId) {
            return new NextResponse("UNAUTHORISES",{status:401});
        }
        const cartProductOwnerCheck = await db.cart.findUnique({
            where:{
                id:params.cartId,
                userId,
            }
        })
    
        if(!cartProductOwnerCheck) return new NextResponse("UNAUTHORISED",{status:401});
    
        const deleteItemFromCart = await db.cart.delete({
            where:{
                id:params.cartId,
                userId,
            }
        })

    
        return NextResponse.json(deleteItemFromCart)
    } catch (error) {
        console.log("[CART_ITEM_DELETE_ERROR]",error)
        return NextResponse.json("Internal server error",{status:405})
    }
}