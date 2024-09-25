import { db } from "@/lib/db";
import { Category, Product } from "@prisma/client";

type GetProduct = {
    title?:string;
    categoryId?:string;
}

export const getProduct =  async ({title,categoryId}:GetProduct) => {
    
    try {
        const product = await db.product.findMany({
            where:{
                isVerified:true,
                status:"Active",
                title:{
                    contains:title
                },
                categoryId:{
                    contains:categoryId
                }
            },
            include:{
                category:true,
            },
            orderBy:{
                createdAt:"asc"
            }
        })
        return product
    } catch (error) {
        
    }
}