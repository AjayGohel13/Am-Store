import ProductCard from './product-card'
import { db } from '@/lib/db'
import { Product } from '@prisma/client'
import React from 'react'

type ListingProps = {
    items: Product[] | undefined
    className?: string
    isPoster?: boolean
}



const ProductList = async ({ items }: ListingProps) => {
    if (!items) return null;
    return (
        <>
            <div className="dark:bg-black">
                <div className="mx-auto  px-4 py-3 sm:px-6 lg:max-w-screen-2xl lg:px-8">

                    <div className="mt-6 grid grid-cols-2 xsm:grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                        {items.map(async (item) => {
                            const images = await db.images.findMany({
                                where: {
                                    productId: item.id
                                },
                            })

                            const category = await db.category.findUnique({
                                where: {
                                    id: item.categoryId!,
                                }
                            })

                            const StoreOwner = await db.store.findUnique({
                                where: {
                                    userId: item.userId,
                                }
                            })

                            const urls = images.map(({ imageUrl }) =>
                                typeof imageUrl === "string" ? imageUrl : imageUrl)
                                .filter(Boolean) as string[]
                            return (
                                <ProductCard
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    imageUrl={urls!}
                                    price={item.price!}
                                    category={category?.name}
                                    description={item.description!}
                                    brand={item.brand!}
                                    storeName={StoreOwner?.name!}
                                />
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        </>

    )
}

export default ProductList