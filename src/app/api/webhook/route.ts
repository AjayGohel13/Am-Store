import Stripe from "stripe";
import {headers} from "next/headers";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req:Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event:Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!,
        )
    } catch (error:any) {
        return new NextResponse("WEBHOOK_ERROR",error)        
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const orderId =  session?.metadata?.orderId;

    if(event.type === "checkout.session.completed"){
        if(!userId || !orderId){
            return new NextResponse(`WEBHOOK_ERROR:MISSING_METADATA`,{status:400})
        }
        await db.order.update({
            where:{
                id:orderId,
            },
            data:{
                isPaid:true,
            }
        })
        
        await db.orderItem.updateMany({
            where:{
                orderId:orderId,
            },
            data:{
                isPaid:true,
            }
        })
       const Items = await db.orderItem.findMany({
            where:{
                orderId,
            }
        });

        Items.forEach(async(item)=>{
            const product = await db.product.findUnique({
                where:{
                    id:item.productId!,
                }
            });
            await db.product.update({
                where:{
                    id:item.productId!,
                },
                data:{
                    stock:(product?.stock! - item.number)
                }
            })
        })
    }else{
        return new NextResponse(`webhook error: unhandled event `,{status:200})
    }

    return new NextResponse("data updated",{status:200});

}