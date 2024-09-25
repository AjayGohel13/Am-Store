import { getProduct } from '@/actions/get-product'
import { InfiniteMovingCardsWrapperForCategory } from '@/components/Hero/moving-categories'
import ProductList from '@/components/Hero/product-list'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { db } from '@/lib/db'
import React from 'react'

type Props = {
    searchParams: {
        title: string,
        categoryId: string
    }
}

const page = async ({ searchParams }: Props) => {
    const productData = await getProduct({
        ...searchParams,
    })
    const categories = await db.category.findMany({
        orderBy:{
            id:"asc"
        }
    })
    return (
        <MaxWidthWrapper>
            <InfiniteMovingCardsWrapperForCategory
                items={categories}
            />
            <ProductList
                items={productData}
            />
        </MaxWidthWrapper>
    )
}

export default page