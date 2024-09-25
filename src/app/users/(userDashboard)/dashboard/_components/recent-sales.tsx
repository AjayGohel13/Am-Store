import { db } from "@/lib/db"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"

type props = {
  userId: string;
}

export async function RecentSales({ userId }: props) {
  const analysis = await db.orderItem.findMany({
    take: 5,
    where: {
      ownerId: userId,
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  return (
    <div className="space-y-8">
      {analysis.map(async (analize) => {
        const product = await db.product.findUnique({
          where: {
            id: analize.productId!,
          }
        })

        const image = await db.images.findFirst({
          where: {
            productId: product?.id,
          }
        })
        return (
          <div className="flex items-center w-full" key={analize.id}>
              <Image src={image?.imageUrl!} alt="Avatar" height={100} width={100} className="h-14 w-14 rounded-md" />
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{product?.title}</p>
                <p className="text-sm text-muted-foreground">
                  {product?.brand}
                </p>
              </div>
              <div>
              </div>
              <div className="ml-auto font-medium flex flex-col gap-2">
                <p className="text-sm font-medium leading-none">Qty X {analize.number}</p>
                <p className="text-sm font-medium leading-none">{formatCurrency(analize.price!)}</p>
              </div>
          </div>
        )
      })}


    </div>
  )
}

