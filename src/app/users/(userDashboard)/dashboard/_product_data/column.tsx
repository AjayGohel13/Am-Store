"use client"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { formatCurrency } from "@/lib/utils"
import { format } from "date-fns"
import { DataTableColumnHeader } from "@/components/table-components/data-table-column-header"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { DataTableRowActions } from "./data-table-row-action"
export const columns: ColumnDef<Product>[] = [
    {
        id: "actions1",
        cell: ({ row }) => {
            const { thumbnail } = row.original;
            return (
                <div className=" h-10 w-10">
                    <Image
                        alt="Product image"
                        className="aspect-square h-10 w-10 rounded-md object-center"
                        height="64"
                        src={thumbnail!}
                        width="64"
                    />
                </div>
            )
        },
        footer: "Image",
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Product" />
            )
        },
        cell: ({ row }) => {
            const { title } = row.original;

            return (
                <div className=" pl-5 text-base font-medium dark:text-white">
                    {title}
                </div>
            )
        },
        footer: "Product",
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Product Status" />
            )
        },
        cell: ({ row }) => {
            const { status } = row.original;

            return (
                <Badge >
                    {status}
                </Badge>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        footer: "Product Status"
    },
    {
        accessorKey: "stock",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Stock" />

            )
        },
        cell: ({ row }) => {
            const { stock } = row.original;

            return (
                <p className="text-black dark:text-gray-50 text-base font-medium">{stock}</p>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        footer: "Stock",


    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Amount" />

            )
        },
        cell: ({ row }) => {
            const { price } = row.original;

            return (
                <p className="text-black dark:text-gray-50 text-base font-medium">{formatCurrency(price!)}</p>
            )
        },
        footer: "Amount",
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },

    },
    {
        accessorKey: "brand",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Brand" />

            )
        },
        cell: ({ row }) => {
            const { brand } = row.original;

            return (
                <p className="text-black dark:text-gray-50 text-base font-medium">{brand}</p>
            )
        },
        footer: "Brand",
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },

    },
    {
        accessorKey: "isVerified",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Verification" />

            )
        },
        cell: ({ row }) => {
            const { isVerified } = row.original;

            return (
                <p className="text-black dark:text-gray-50 text-base font-medium">{isVerified ? " Verified" : "Verification pending"}</p>
            )
        },
        footer: "Verification",
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Date" />
            )
        },
        cell: ({ row }) => {
            const { createdAt } = row.original;

            return (
                <p className="text-black dark:text-gray-50 text-base font-medium">{format(createdAt, "dd MMMM,yyyy")}</p>

            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        footer: "Date"

    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <DataTableRowActions id={id} row={row} />
            )
        },
    },

]
