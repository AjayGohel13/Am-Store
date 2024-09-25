import { Badge } from '@/components/ui/badge';
import { db } from '@/lib/db';
import React from 'react'

type Props = {
    id: string ;
}

const TableCategory = async ({ id }: Props) => {

        const CategoryName = await db.category.findUnique({
            where: {
                id,
            }
        })

    return (
        <Badge
            className=" hover:bg-emerald-400/70 px-4 py-2 text-white bg-emerald-400 border border-emerald-400 "
        >
            {CategoryName?.name!}
        </Badge>
        )
}

export default TableCategory