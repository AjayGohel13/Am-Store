
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/lib/utils';
const CustomTooltip = ({ active, payload }: any) => {
  if (!active) return null
  const productName = payload[0].payload.productName;
  const totalsold = payload[0].payload.totalSold;
  const totalEarnings = payload[0].payload.totalEarnings

  return (
    <div className=" rounded-sm bg-white dark:bg-black shadow-sm border overflow-hidden ">
       <div className=" flex item-center justify-between gap-x-4 px-3 ">
          <div className=" flex items-center gap-x-2 ">
            <div className=" size-1.5 bg-rose-400 rounded-full " />
            <p className=" text-sm text-muted-foreground">
              Qty:
            </p>
          </div>
          <p className=" text-sm text-right font-medium">
            {totalsold}
          </p>
        </div>
      <Separator />
      <div className=" p-2 px-3 space-y-1 ">

        <div className=" flex item-center justify-between gap-x-4 ">
          <div className=" flex items-center gap-x-2 ">
            <div className=" size-1.5 bg-emerald-400 rounded-full " />
            <p className=" text-sm text-muted-foreground">
              Product
            </p>
          </div>
          <p className=" text-sm text-right font-medium">
            {formatCurrency(totalEarnings)}
          </p>
        </div>
        <div className=" flex item-center justify-between gap-x-4 ">
          <div className=" flex items-center gap-x-2 ">
            <div className=" size-1.5 bg-sky-600 rounded-full " />
            <p className=" text-sm text-muted-foreground">
              Product
            </p>
          </div>
          <p className=" text-sm text-right font-medium">
            {productName}
          </p>
        </div>

      </div>
    </div>
  )
}

export default CustomTooltip
