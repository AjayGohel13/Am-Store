import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function PATCH(
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {
        const { userId } = auth()
        const { productId } = params;
        const values = await req.json()
        if (!userId) {
            return new NextResponse("Unauthorised User", { status: 401 })
        }

        const images = await db.images.create({
            data: {
                productId: productId,
                ...values,
            }
        })
        return NextResponse.json(images)
    } catch (error) {
        console.log("[images_form]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: Request,
    { params }: { params: { productId: string } }
) {
    try {
        const { userId } = auth()
        const { productId } = params;
        if (!userId) {
            return new NextResponse("Unauthorised User", { status: 401 })
        }

        const images = await db.images.findFirst({
            where:{
                productId,
            }
        });

        const product = await db.product.update({
            where:{
                id:productId
            },
            data:{
                thumbnail:images?.imageUrl,
            }
        })
        return NextResponse.json(images)
    } catch (error) {
        console.log("[images_form]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}