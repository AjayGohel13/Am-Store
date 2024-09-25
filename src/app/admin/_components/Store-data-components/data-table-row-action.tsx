"use client"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from '@/components/ui/use-toast';
import { useState } from "react"
import { useConfirm } from "@/components/confirm-dialog"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ToastAction } from "@/components/ui/toast"
import { Delete, Trash } from "lucide-react"
const labels = [
    {
        label: "Draft",
        value: "Draft"
    },
    {
        label: "Active",
        value: "Active"
    },
    {
        label: "Archieved",
        value: "Archieved"
    },
]
interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    id: string;
}

export function DataTableRowActions<TData>({
    row, id
}: DataTableRowActionsProps<TData>) {
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const onDelete = async () => {
        try {
            await axios.delete(`/api/store/${id}`)
            toast({ title: "Store has been removed" })
            router.refresh()

        } catch (error: any) {
            console.error(error)
            toast({
                title: "There are product which needs to delivered",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try Again</ToastAction>,
            })
        } finally {
            setIsLoading(false);
        }
    }

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        `You are about to delete this Store `,
    )
    return (
        <DropdownMenu>
            <ConfirmDialog  />
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted dark:text-white"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
               
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button
                        className=" w-full "
                        variant="destructive"
                        onClick={async () => {
                            const ok = await confirm();
                            if (ok) {
                                await onDelete()
                            }
                        }}>
                        Delete <Trash className=" h-4 w-4 ml-2"/>
                    </Button>
                    {/* <DropdownMenuShortcut></DropdownMenuShortcut> */}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}