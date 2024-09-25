import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const user = await currentUser()
        if(!user?.id){
            return new NextResponse("UNAUTHORISED USER", {status:401});
        }
        const values = await req.json()

        const CheckStore = await db.store.findUnique({
            where:{
                userId:user.id,
            }
        })

        if(CheckStore){
            return new NextResponse("STORE WITH THIS ID ALREADY EXIST", {status:401});
        }

        const store = await db.store.create({
            data:{
                ...values,
                userId:user.id,
                email:user.emailAddresses?.[0]?.emailAddress,
                phoneNumber:user.phoneNumbers?.[0]?.phoneNumber,
            }
        })
        return NextResponse.json(store)


    } catch (error) {
        console.log("[STORE_CREATION]",error)
        return new NextResponse("Internal Error",{status:500})
    }    
}