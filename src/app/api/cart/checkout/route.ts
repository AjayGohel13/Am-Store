import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import Stripe from "stripe";

export async function POST(
    req:Request,
) {
    try {
        const user = await currentUser()
        if (!user?.id || !user || !user.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse("UNAUTHORISED_USER", { status: 401 });
        }

        const cart = await db.cart.findMany({
            where:{
                userId:user.id,
            }
        })

        if (!cart) {
            return new NextResponse("Not found", { status: 404 });
        }

        const total = cart.reduce((accumulator,item)=>{
            return accumulator + item.price!
        }, 0);


        const Filter_Product = cart.filter((cartItem)=>Boolean(cartItem.id));

        const order = await db.order.create({
            data:{
                userId:user.id,
                totalPrice:total,
                isPaid:false,
            }
        }) 

        const userName = user.fullName

        Filter_Product.forEach(async(prod)=>{
            await db.orderItem.create({
                data:{
                    orderId:order.id,
                    productId:prod.productId,
                    userId:prod.userId,
                    ownerId:prod.productOwner,
                    number:prod.number,
                    price:prod.price,
                    userName:userName,
                    userEmail:user.emailAddresses?.[0]?.emailAddress,
                    productName:prod.productName,
                }
            })
        })

        const line_items:Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity:1,
                price_data:{
                    currency:"USD",
                    unit_amount:total * 100,
                    product_data:{
                        name:order.id,
                        description:order.id,
                    }
                },
            }
        ];

        const stripeSession = await stripe.checkout.sessions.create({
            success_url:`${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}`,
            cancel_url:`${process.env.NEXT_PUBLIC_APP_URL}/cart`,
            mode:"payment",
            metadata:{
                orderId:order.id,
                userId:order.id,
            },
            line_items,
       
        })


        return NextResponse.json({ url: stripeSession.url });

    } catch (error) {

        console.log("[STRIPE_CHECKOUT_ERROR]",error)
        return new NextResponse("Internal server error",{status:500})        
    }
}