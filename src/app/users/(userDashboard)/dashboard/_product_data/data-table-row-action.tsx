"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useToast } from '@/components/ui/use-toast';
import { taskSchema } from "./schema"
import Link from "next/link"
import { useState } from "react"
import { useConfirm } from "@/components/confirm-dialog"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ToastAction } from "@/components/ui/toast"
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
    const task = taskSchema.parse(row.original)
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const onClick = async (value: string) => {
        try {
            await axios.patch(`/api/product/${id}/status/${value}`);

        } catch (error) {
            toast({
                title: "Uh! Something went wrong..",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try Again</ToastAction>,
            })
        }
    }

    const onDelete = async () => {
        try {
            await axios.delete(`/api/product/${id}`)
            toast({ title: "Product has been removed" })
            router.refresh()

        } catch (error: any) {
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
        `You are about to delete this product `,
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
                <Link href={`/users/product/${id}`}>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup value={task.status}>
                            {labels.map((label) => (
                                <DropdownMenuRadioItem key={label.value} value={label.value} >
                                    <Button variant="ghost" onClick={() => onClick(label.value)} >
                                        {label.label}
                                    </Button>
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
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
                        Delete ⌘⌫
                    </Button>
                    {/* <DropdownMenuShortcut></DropdownMenuShortcut> */}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}