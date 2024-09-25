import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function DELETE(
    req: Request,
    { params }: { params: { productId: string, id: string } }
) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthorised User", { status: 401 });

        const ownerCheck = await db.store.findUnique({
            where: {
                userId: userId,
            }
        });

        if (!ownerCheck) {
            return new NextResponse("There is no store with this user id", { status: 401 })
        }

        const product = await db.product.findUnique({
            where: {
                id: params.productId,
            }
        })

        if (!product) return new NextResponse("PRODUCT_NOT_FOUND", { status: 404 });

        const delete_image = await db.images.delete({
            where: {
                productId: params.productId,
                id: params.id,
            }
        })
        return NextResponse.json(delete_image);
    } catch (error) {
        console.log("IMAGE_DELETE_ERROR", error);
        return new NextResponse("Internal server", { status: 402 });
    }
}