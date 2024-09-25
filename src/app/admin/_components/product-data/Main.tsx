import { db } from '@/lib/db'
import { DataTable } from './data-table';
import { columns } from './columns';
const ProductDataForAdmin = async () => {
    const product = await db.product.findMany({
        orderBy: {
            title: "asc"
        }
    });


    return (
        <div className='max-w-screen-3xl mx-auto  w-full dark:bg-black-2 h-full ' >
            <div className='mt-5 max-w-screen-3xl mx-auto' >
                <DataTable columns={columns} data={product}  />
            </div>
        </div>
    )
}

export default ProductDataForAdmin