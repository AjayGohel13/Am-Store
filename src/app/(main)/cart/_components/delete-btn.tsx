"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { X } from 'lucide-react'
import React, { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

type Props = {
    id: string
}

const DeleteBtn = ({ id }: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const onDelete = async () => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/cart/${id}`)
            toast({
                description: "Item has been removed from Cart.",
              })
            router.refresh()

        } catch (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }finally{
            setIsLoading(false)
        }
    }
    return (
        <Button
            className="text-xs leading-3  text-rose-400 cursor-pointer flex items-center "
            variant="ghost"
            onClick={onDelete}
            disabled={isLoading}
        >
            <X />
        </Button>)
}

export default DeleteBtn