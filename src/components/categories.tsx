"use client"
import { Category } from '@prisma/client'
import { CategoryItem } from './category-items';
type Props = {
    items: Category[];
}


export const Categories = ({ items }: Props) => {
    return (
        <div className=' flex items-center gap-x-2 overflow-x-auto  pb-2'>
            {items.map((item) => {
                return (
                    <CategoryItem
                        key={item.id}
                        label={item.name}
                        value={item.id}
                    />
                )
            })}
        </div>
    )
}

