import React from 'react'
import Overview from '../_components/overview'
import { db } from '@/lib/db';
import ProductList from '@/components/Hero/product-list';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: {
    productId: string;
  }
}
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { productId } = params;

  const product = await db.product.findUnique({
    where: {
      id: productId
    }
  });

  if (!product) {
    return {
      title: 'Product not found | AM Store',
    };
  }

  return {
    title: `${product.title} | AM Store`,
  };
}


const page = async ({ params }: Props) => {
  const { productId } = params;

  const product = await db.product.findUnique({
    where: {
      id: productId
    }
  })

  if (!product) return null;

  const category = await db.category.findUnique({
    where: {
      id: product.categoryId!,
    }
  })

  const images = await db.images.findMany({
    where: {
      productId,
    },
  })

  const category_wise_product = await db.product.findMany({
    take: 8,
    where: {
      categoryId: category?.id,
    }
  })

  const urls = images.map(({ imageUrl }) =>
    typeof imageUrl === "string" ? imageUrl : imageUrl)
    .filter(Boolean) as string[]
  return (
    <div>

      <Overview
        data={product!}
        category={category?.name!}
        images={urls!}
      />
      <div className=' mt-2 max-w-screen-2xl px-5 mx-auto'>
        <h1 className=' text-xl dark:text-white font-medium'>Explore Similiar product with same category</h1>
      </div>
      <div className=' my-5 pb-10'>

        <ProductList items={category_wise_product} />
      </div>
    </div>
  )
}

export default page
