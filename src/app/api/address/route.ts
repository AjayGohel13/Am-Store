import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const { userId } = auth()
        if(!userId){
            return new NextResponse("UNAUTHORISED USER", {status:401});
        }        

        const values = await req.json()



        const address = await db.address.create({
            data:{
                ...values,
                userId:userId,
            }
        })
        return NextResponse.json(address)


    } catch (error) {
        console.log("[ADDRESS_CREATION]",error)
        return new NextResponse("Internal Error",{status:500})
    }    
}