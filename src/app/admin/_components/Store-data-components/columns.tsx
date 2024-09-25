"use client"
import { OrderItem, store } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { DataTableColumnHeader } from "@/components/table-components/data-table-column-header"
import { DataTableRowActions } from "./data-table-row-action"
import { formatCurrency } from "@/lib/utils"
import StoreStatus from "./store-status"
export const columns: ColumnDef<store & {
    products: {
        price: number | null;
    }[];
    orderItem: OrderItem[]
}>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Store-name" />
                )
            },
            cell: ({ row }) => {
                const { name } = row.original;
                return (
                    <div className="hidden  text-base font-medium dark:text-white md:inline">
                        {name}
                    </div>
                )
            },
            footer: "Store-name",

        },
        {
            accessorKey: "owner",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Owner Name" />
                )
            },
            cell: ({ row }) => {
                const { owner } = row.original;

                return (
                    <div className="hidden  text-base font-medium dark:text-white md:inline">
                        {owner}
                    </div>
                )
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
            footer: "Seller Name"
        },
        {
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="E-mail Address" />
                )
            },
            cell: ({ row }) => {
                const { email } = row.original;

                return (
                    <div className="hidden  text-base font-medium dark:text-white md:inline">
                        {email}
                    </div>
                )
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
            footer: "E-mail Address"
        },
        {
            accessorKey: "products",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Products" />
                )
            },
            cell: ({ row }) => {
                const { products } = row.original;

                return (
                    <div className="hidden  text-base font-medium dark:text-white md:inline">
                        {products.length}
                    </div>
                )
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
            footer: "Products"
        },
        {
            accessorKey: "orderItem",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Total Orders" />
                )
            },
            cell: ({ row }) => {
                const { orderItem } = row.original;
                return (
                    <div className="hidden  text-base font-medium dark:text-white md:inline">
                        {orderItem.length}
                    </div>
                )
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
            footer: "Total Orders"
        },
        {
            accessorKey:"userId",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Total Sales" />
                )
            },
            cell: ({ row }) => {
                const { orderItem } = row.original;
                const totalSales = orderItem.reduce((acc, curr)=>acc + curr.number,0)
                return (
                    <div className="hidden  text-base font-medium dark:text-white md:inline">
                        {totalSales}
                    </div>
                )
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
            footer: "Total Sales"
        },
        {
            accessorKey:"phoneNumber",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Total Revenue" />
                )
            },
            cell: ({ row }) => {
                const { orderItem } = row.original;
                const totalRevenue = orderItem.reduce((acc, curr)=>acc + curr.price!,0)
                return (
                    <div className="hidden  text-base font-medium dark:text-white md:inline">
                        {formatCurrency(totalRevenue)}
                    </div>
                )
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
            footer: "Total Revenue"
        },
        {
            accessorKey:"isVerified",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Verification Status" />
                )
            },
            cell: ({ row }) => {
                const { id, isVerified } = row.original;
                return (
                    <div className="hidden  text-base font-medium dark:text-white md:inline">
                        <StoreStatus id={id} status={isVerified} />
                    </div>
                )
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
            footer: "Verification Status"
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
