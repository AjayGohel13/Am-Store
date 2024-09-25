"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

type Props = {
    isRegistered:boolean
    count:number
}

const CheckoutButton = ({isRegistered, count}: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const onClick = async () => {
        try {
            setIsLoading(true);
            if(!isRegistered) 
            {
                return router.push("/address");
            }
            const response = await axios.post("/api/cart/checkout");
            
            window.location.assign(response.data.url);

        } catch (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            variant="default"
            className="font-semibold  uppercase "
            onClick={onClick}
            disabled={isLoading || count < 0} 
        >
            Checkout
        </Button>
    )
}

export default CheckoutButton