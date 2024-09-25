import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const { userId } = auth()
        const { title, categoryId} = await req.json()
        if(!userId){
            return new NextResponse("Unauthorised User",{status:401})
        }
        const storeOwner = await db.store.findUnique({
            where:{
                userId:userId,
                isVerified:true,
            }
        });

        if(!storeOwner){
            return new NextResponse("There is no store with this user id",{status:401})
        }

        // const storeUpdate = await
        const product = await db.product.create({
            data:{
                userId,
                title,
                categoryId,
                store:storeOwner.name,
                storeId:storeOwner.id
            }
        })
        return NextResponse.json(product)

    } catch (error) {
        console.log("[product]",error)
        return new NextResponse("Internal Error",{status:500})
    }
}