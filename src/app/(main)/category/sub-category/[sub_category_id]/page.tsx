import ProductList from '@/components/Hero/product-list';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { db } from '@/lib/db';
import { Metadata, ResolvingMetadata } from 'next';
import React from 'react'

type Props = {
  params: {
    sub_category_id: string;
  }
}
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { sub_category_id } = params;

  const subCategory = await db.subCategory.findUnique({
    where: {
      id: sub_category_id
    }
  });

  if (!subCategory) {
    return {
      title: 'Category not found | AM Store',
    };
  }

  return {
    title: `${subCategory.name} | AM Store`,
  };
}

const page = async ({ params }: Props) => {
  const { sub_category_id } = params;
  const subCategory = await db.subCategory.findUnique({
    where: {
      id: sub_category_id,
    },
  });
  const data = await db.product.findMany({
    where: {
      subCategory: subCategory?.name,
      status: "Active",
      isVerified: true,
    }
  })
  return (
    <MaxWidthWrapper>
      <div className=' text-xl sm:text-3xl md:text-4xl py-5 px-5 '>
        Explore the greate range of <span className=' text-red-400'>{subCategory?.name}</span>
      </div>
      <ProductList
        items={data!}
      />
      <div className=' px-10'>
        {data.length === 0 && (<p className=' text-muted-foreground pb-5'>No Product Found</p>)}
      </div>
    </MaxWidthWrapper>
  )
}

export default page