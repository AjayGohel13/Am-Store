import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(
    req:Request,
    {params}:{
        params:{
            storeId:string
        }
    }
) {
    try {
        const { userId } = auth()
        const admin = process.env.ADMIN_ID;
        if(!userId || userId !== admin){
            return new NextResponse("UNAUTHORISED USER",{status:401});
        }

        const store = await db.store.findUnique({
            where:{
                id:params.storeId,
            }
        })
        if(!store){
            return new NextResponse("Store Data is Missing",{status:404});
        }

        const Store_Verification = await db.store.update({
            where:{
                id:params.storeId,
            },
            data:{
                isVerified:true,
            }
        })

        return NextResponse.json(Store_Verification);
        
    } catch (error) {
        console.log("[Store_Verification]", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}