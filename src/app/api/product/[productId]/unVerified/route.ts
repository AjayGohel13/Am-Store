import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(
    req:Request,
    {params}:{
        params:{
            productId:string
        }
    }
) {
    try {
        const { userId } = auth()
        const admin = process.env.ADMIN_ID;
        if(!userId || userId !== admin){
            return new NextResponse("UNAUTHORISED USER",{status:401});
        }

        const product = await db.product.findMany({
            where:{
                id:params.productId,
            }
        })

        if(!product){
            return new NextResponse("Product Data is missing", { status: 400 })
        }

        const Product_Verification = await db.product.update({
            where:{
                id:params.productId,
            },
            data:{
                isVerified:false,
            }
        })

        return NextResponse.json(Product_Verification);
        
    } catch (error) {
        console.log("[Product_Verification]", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}