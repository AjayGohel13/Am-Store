"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { DataTableViewOptions } from "@/components/table-components/table-view-options"

import { payment_status } from "./data"
import { DataTableFacetedFilter } from "@/components/table-components/data-table-faceted-filter"
import { DataTableFacetedFilterBoolean } from "@/components/table-components/data-table-boolean-filter"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  options: {
    label: string
    value: string
  }[];

}

export function DataTableToolbar<TData>({
  table,
  options,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className=" w-full flex gap-x-0 gap-y-3 gap-0 sm:gap-3  flex-row flex-wrap   justify-between items-center xsm:items-start space-x-2">

        <Input
          placeholder="Filter Orders..."
          value={(table.getColumn("userName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("userName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm dark:bg-neutral-900 dark:text-white "
        />
        <div>
          {table.getColumn("productName") && (
            <DataTableFacetedFilter
              column={table.getColumn("productName")}
              title="Products Name"
              options={options}
            />
          )}
        </div>
        <div>
          {table.getColumn("isPaid") && (
            <DataTableFacetedFilterBoolean
              column={table.getColumn("isPaid")}
              title="Payment Status"
              options={payment_status}
            />
          )}
        </div>
        <DataTableViewOptions table={table} />
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
    </div>
  )
}