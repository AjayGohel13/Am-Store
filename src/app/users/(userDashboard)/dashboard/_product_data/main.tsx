import React from "react";
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { DataTable } from './data-table'
import { columns } from './column'
const ProductData = async () => {
  const { userId } = auth()
  if (!userId) return null;
  const products = await db.product.findMany({
    where: {
      userId: userId,
      isVerified:true,
    }
  })
  const options = [
    {
      label: "Draft",
      value: "Draft"
    },
    {
      label: "Active",
      value: "Active"
    },
    {
      label: "Archieved",
      value: "Archieved"
    },
  ]


  return (
    <div className='bg-white dark:bg-black h-full min-h-screen  ' >
      <div className='pt-6  max-w-screen-3xl mx-auto px-8' >
        <div className=' mt-3 text-muted-foreground font-medium text-base'>
          Here is your product list
        </div>
        <div className=''>
          <DataTable options={options} columns={columns} data={products} />
        </div>
      </div>
    </div>
  )
}

export default ProductData