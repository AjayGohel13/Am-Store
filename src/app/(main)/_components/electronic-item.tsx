import ProductList from '@/components/Hero/product-list'
import { db } from '@/lib/db'
import React from 'react'


const ElectronicItem = async( ) => {
    const electronic = await db.product.findMany({
        take:4,
        where:{
            categoryId:"619dd120-71a7-45e0-bd0b-97242f031e55"
        }
    })
  return (
    <ProductList items={electronic}/>
  )
}

export default ElectronicItem