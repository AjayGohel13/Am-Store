"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import axios from 'axios';
type Props = {
    disabled: boolean;
    id:string;
}

const Action = ({ disabled, id}: Props) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const onClick = async() => { 
        setIsLoading(true)
        await axios.post(`/api/product/${id}/image`);
        toast.info("Product will be displayed once it will be verified");
        setIsLoading(false)
        router.push("/users/dashboard");
     }
    return (
        <div className=' mb-10'>
            <Button
                disabled={disabled || isLoading}
                onClick={onClick}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium dark:bg-slate-900 bg-slate-100 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"                
            >
                Submit
            </Button>
        </div>
    )
}

export default Action