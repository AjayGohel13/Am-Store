"use client"
import { OrderItem } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { format } from "date-fns"
import { DataTableColumnHeader } from "@/components/table-components/data-table-column-header"


export const columns: ColumnDef<OrderItem>[] = [
    {
        accessorKey: "userName",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Customer" />
            )
        },
        cell: ({ row }) => {
            const { userEmail, userName } = row.original;

            return (
                <>
                    <div className="font-medium text-black dark:text-gray-200">{userName}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                        {userEmail}
                    </div>
                </>
            )
        },
        footer: "Customer"
    },
    {
        accessorKey: "productName",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Products" />
            )
        },
        cell: ({ row }) => {
            const { productName } = row.original;

            return (
                <>
                    <p className=" text-black dark:text-gray-50 text-base font-medium">{productName}</p>
                </>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        footer: "Products"
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Amount" />

            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price") || "0");
            const { number } = row.original;
            const original = formatCurrency(price / number);

            return (
                <p className=" text-black dark:text-gray-50 text-base font-medium">{original}</p>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        footer: "Amount"

    },
    {
        accessorKey: "number",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Quantity" />

            )
        },
        cell: ({ row }) => {
            const { number } = row.original;

            return (
                <p className="text-black dark:text-gray-50 text-base font-medium">{number}</p>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        footer: "Quantity"

    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Total" />

            )
        },
        cell: ({ row }) => {
            const { price } = row.original;
            const final = formatCurrency(price!)

            return (
                <p className="text-black dark:text-gray-50 text-base font-medium">{final}</p>
            )
        },
        footer: "Total"

    },
    {
        accessorKey: "isPaid",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Payment Status" />
            )
        },
        cell: ({ row }) => {
            const isPaid = row.getValue("isPaid") || false;

            return (
                <Badge variant={isPaid ? "primary" : "destructive"} className=" text-base ">
                    {isPaid ? "Completed" : "Processing"}
                </Badge>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        footer: "Payment Status"

    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Order Date" />

            )
        },
        cell: ({ row }) => {
            const { createdAt } = row.original;

            return (
                <p className="text-black dark:text-gray-50 text-base font-medium">{format(createdAt, "dd MMMM,yyyy")}</p>
            )
        },
        footer: "Order Date",
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },


]
