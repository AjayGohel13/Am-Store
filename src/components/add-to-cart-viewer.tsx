"use client"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useCart } from "@/hooks/use-cart"
import { Heart } from "lucide-react"
import { Product } from "@prisma/client"

const AddToCartButtonForViewer = ({ product }:
    {
        product: Product
    }) => {
    const { addItem } = useCart()

    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 2000);
        return () => clearTimeout(timeout)
    }, [isSuccess])


    return (
        <Button onClick={() => {
            addItem(product)
            setIsSuccess(true)
        }}
            className="bg-gray-500/50 dark:text-white hover:bg-gray-500/90 w-full"
            size='lg'  >
            {isSuccess ? 'Added' : 'Add to WishList'}  
            {"   "}<Heart className="ml-3" aria-hidden='true'  />
        </Button>)
}

export default AddToCartButtonForViewer
