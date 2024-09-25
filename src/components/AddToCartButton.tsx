"use client"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useCart } from "@/hooks/use-cart"
import { BaggageClaim } from "lucide-react"
import { Product } from "@prisma/client"

const AddToCartButton = ({ product }:
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
            variant="default"
            size='lg'  >
            {isSuccess ? 'Added' : 'Add to Cart'}
            {" "}{" "}{" "}<BaggageClaim className="ml-3" aria-hidden='true' />
        </Button>)
}

export default AddToCartButton
