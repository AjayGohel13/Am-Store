import ProductList from '@/components/Hero/product-list';
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { db } from '@/lib/db';
import { Metadata, ResolvingMetadata } from 'next';
import React from 'react'

type Props = {
    params: {
        categoryId: string;
    }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const { categoryId } = params;

    const category = await db.category.findUnique({
        where: {
            id: categoryId
        }
    });

    if (!category) {
        return {
            title: 'Category not found | AM Store',
        };
    }

    return {
        title: `${category.name} | AM Store`,
    };
}

const page = async ({ params }: Props) => {

    const { categoryId } = params;
    const category = await db.category.findUnique({
        where: {
            id: categoryId
        }
    });
    const product = await db.product.findMany({
        where: {
            categoryId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return (
        <MaxWidthWrapper>
            <div className=' text-xl sm:text-3xl md:text-4xl py-5 px-5 '>
                Explore the greate range of <span className=' text-red-400'>{category?.name}</span>
            </div>
            <ProductList
                items={product!}
            />
            <div className=' px-10'>
                {product.length === 0 && (<p className=' text-muted-foreground'>No Product Found</p>)}
            </div>
        </MaxWidthWrapper>
    )
}

export default page