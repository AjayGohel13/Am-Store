import { format } from "date-fns"

import { formatCurrency } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'


const CustomTooltip = ({ active, payload }: any) => {
  if (!active) return null
  const productName = payload[0].payload.productName;
  const price = payload[0].value;
  const totalSold = payload[0].payload.totalSold;
  return (
    <div className=" rounded-sm bg-white dark:bg-black shadow-sm border overflow-hidden ">
      <div className=" text-sm p-2 px-3  " >
        {productName}
      </div>
      <Separator />
      <div className=" p-2 px-3 space-y-1 ">
        <div className=" flex item-center justify-between gap-x-4 ">
          <div className=" flex items-center gap-x-2 ">
            <div className=" size-1.5 bg-blue-500 rounded-full " />
            <p className=" text-sm text-muted-foreground">
              Income
            </p>
          </div>
          <p className=" text-sm text-right font-medium">
            {formatCurrency(price)}
          </p>
        </div>
        <div className=" flex item-center justify-between gap-x-4 ">
          <div className=" flex items-center gap-x-2 ">
            <div className=" size-1.5 bg-rose-500 rounded-full " />
            <p className=" text-sm text-muted-foreground">
              Quantity
            </p>
          </div>
          <p className=" text-sm text-right font-medium">
            {totalSold}
          </p>
        </div>

      </div>
    </div>
  )
}

export default CustomTooltip
