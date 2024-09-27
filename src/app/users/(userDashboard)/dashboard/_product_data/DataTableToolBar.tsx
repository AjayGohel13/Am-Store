"use client"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { DataTableViewOptions } from "@/components/table-components/table-view-options"
import { Product_Status } from "./data"
import { DataTableFacetedFilter } from "@/components/table-components/data-table-faceted-filter"
import { DataTableFacetedFilterBoolean } from "@/components/table-components/data-table-boolean-filter"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaPlusCircle } from "react-icons/fa"

interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  options: {
    label: string
    value: string
  }[];
}

export function DataTableToolbar<TData>({
  table,
  options
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between w-full">
      <div className=" w-full flex gap-x-0 gap-y-3 gap-0 sm:gap-3  flex-row flex-wrap  items-center xsm:items-start space-x-2">
        <div>
          <Input
            placeholder="Filter Products..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm dark:bg-neutral-900 dark:text-white "
          />
        </div>
        <div>

          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Products Status"
              options={options}
            />
          )}
        </div>

        <div >

          {table.getColumn("isVerified") && (
            <DataTableFacetedFilterBoolean
              column={table.getColumn("isVerified")}
              title="Verification Status"
              options={Product_Status}
            />
          )}
        </div>
        <div>

          <DataTableViewOptions table={table} />
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div>
        <Link href="/users/create-product">
          <Button
            variant="cart"
          >
            <FaPlusCircle/><span className=" ml-3">Add New</span>
          </Button>
        </Link>        
      </div>
    </div>
  )
}