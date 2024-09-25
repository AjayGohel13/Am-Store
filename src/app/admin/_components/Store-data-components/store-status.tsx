"use client"
import { useConfirm } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type Props = {
    id: string;
    status: boolean;
}

const StoreStatus = ({ id, status }: Props) => {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const onClick = async () => {
        try {
            setIsLoading(true)
            if (status) {
                await axios.patch(`/api/store/${id}/unVerified`)
                toast({ title: "Store has been set to unVerified" })
                router.refresh()


            }
            else {
                await axios.patch(`/api/store/${id}/verify`)
                toast({ title: "Store has been set to Verified" })

                router.refresh()

            }
        } catch (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        } finally {
            setIsLoading(false);
        }
    }
    const VerifiedStatus = status ? "set UnVerified" : "Verify"
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        `You are about to ${VerifiedStatus} this store `
    )

    return (
        <div>
            <ConfirmDialog />
            <div className=' flex items-center gap-3' >
                {isLoading && (
                    <Loader className=' h-4 w-4 animate-spin' />
                )}
                <Button
                    onClick={async () => {
                        const ok = await confirm();
                        if (ok) {
                            await onClick()
                        }
                    }}
                    className={cn(
                        " bg-rose-400 text-whiten dark:bg-rose-400 px-4 py-2 text-white ",
                        status && "bg-emerald-400 hover:bg-emerald-400 dark:bg-emerald-400 text-white"
                    )}
                >
                    {status ? "Verified" : "Verification Pending"}
                </Button>
            </div>

        </div>
    )
}

export default StoreStatus