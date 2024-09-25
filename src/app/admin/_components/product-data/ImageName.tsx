import { db } from '@/lib/db'
import Image from 'next/image'
import React from 'react'

type Props = {
    id: string
    title: string
}

const ImageName = async ({ id, title }: Props) => {
    const image = await db.images.findFirst({
        where: {
            productId: id
        }
    })
    return (
        <div className=' flex items-center justify-start gap-4'>

            <div className="justify-center h-16 w-16 flex  items-center rounded-2xl gap-3">
                <Image
                    src={image?.imageUrl!}
                    alt='product image'
                    height={100}
                    width={100}
                    className='w-2/3 h-2/3 scale-150 rounded-xl  '
                />
            </div>
            <p className=' text-muted-foreground'>
                {title}
            </p >
        </div>

    )
}

export default ImageName