"use client"

import { CheckCircledIcon, Cross2Icon, StopwatchIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTableFacetedFilterBoolean } from "@/components/table-components/data-table-boolean-filter"
import { DataTableViewOptions } from "@/components/table-components/table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>,


}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const payment_status = [
    {
      label: "Verified",
      value: true,
      icon: CheckCircledIcon,
    },
    {
      label: "Processing",
      value: false,
      icon: StopwatchIcon,
    },
  ]

  return (
    <div className="flex items-center justify-between">
      <div className=" w-full flex gap-x-0 gap-y-3 gap-0 sm:gap-3  flex-row flex-wrap   justify-between items-center xsm:items-start ">

        <Input
          placeholder="Filter Products..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="w-full dark:bg-neutral-900 dark:text-white "
        />
        <div>
          {table.getColumn("isVerified") && (
            <DataTableFacetedFilterBoolean
              column={table.getColumn("isVerified")}
              title="Verification Status"
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