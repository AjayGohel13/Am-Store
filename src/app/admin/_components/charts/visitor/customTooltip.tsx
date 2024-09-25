import { format } from "date-fns"

import { Separator } from '@/components/ui/separator'
const CustomTooltip = ({ active, payload }: any) => {
  if (!active) return null
  const createdAt = payload[0].payload.createdAt;
  const number = payload[0].value;
  return (
    <div className=" rounded-sm bg-white/60 dark:bg-black/60 shadow-sm border overflow-hidden ">
      <div className=" text-sm p-2 px-3  " >
        {format(createdAt, "MMMM dd,yyyy")}
      </div>
      <Separator />
      <div className=" p-2 px-3 space-y-1 ">
        <div className=" flex item-center justify-between gap-x-4 ">
          <div className=" flex items-center gap-x-2 ">
            <div className=" size-1.5 bg-blue-500 rounded-full " />
            <p className=" text-sm text-muted-foreground">
              Page Views
            </p>
          </div>
          <p className=" text-sm text-right font-medium">
            {number}
          </p>
        </div>
      

      </div>
    </div>
  )
}

export default CustomTooltip
