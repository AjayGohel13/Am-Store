import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { productId: string } }
) {
    const { userId } = auth()
    const { productId } = params;

    if (!userId) {
        return new NextResponse("UNAUTHORISED USER", { status: 401 });
    }

    const product = await db.product.findUnique({
        where: {
            id: productId
        }
    });

    if (!product) {
        return new NextResponse("PRODUCT_NOT_FOUND", { status: 401 });
    }

    if(product.stock === 0){
        return new NextResponse("PRODUCT_OUT_OF_STOCK", { status: 401 });
    }

    const CheckifAlreadyItemExistInCart = await db.cart.findFirst({
        where: {
            productId,
            userId,
        }
    })

    if (CheckifAlreadyItemExistInCart) {
        const AddCart = await db.cart.updateMany({
            where: {
                userId,
                productId,
            },
            data: {
                number: CheckifAlreadyItemExistInCart.number + 1,
                price: CheckifAlreadyItemExistInCart.price! + product.price!,
            }
        })
        return NextResponse.json(AddCart);
    }
    else {

        const cart = await db.cart.create({
            data: {
                productId,
                userId,
                number: 1,
                price: product.price,
                productOwner:product.userId,
                productName:product.title
            }
        })
        return NextResponse.json(cart)
    }

}