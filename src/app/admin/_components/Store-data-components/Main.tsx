import { db } from '@/lib/db'
import { DataTable } from './data-table';
import { columns } from './columns';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Activity, BadgeIndianRupee, DollarSign, ListOrdered } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Metadata } from 'next';
type Props = {
  data?: {
    store_name: string;
    totalEarnings: number;
    totalSold: number;
  }[];
  orderData:{
    productId: string | null;
    price: number | null;
    productName: string | null;
    store_name:string | null;
    number:number;
  }[];
}

const StoreTable = async ({ data, orderData }: Props) => {
  const store = await db.store.findMany({
    orderBy: {
      name: "asc"
    },
    include:{
      products:{
        select:{
          price:true,
        }
      },
      orderItem:true
    },
  })
  const products = await db.product.count({
    where:{
      isVerified:true,
      status:"Active"
    }
  })
  const totalRevenue = data!.reduce((acc, curr) => acc + curr.totalEarnings, 0)
  const totalOrders = orderData!.reduce((Acc, curr)=> Acc + curr.number,0)
  return (
    <div className='pt-6 max-w-screen-3xl mx-auto  w-full dark:bg-black h-full ' >
      <div className='mt-10 max-w-screen-3xl mx-auto' >
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0" className=' dark:bg-black dark:border-zinc-600'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1" className=' dark:bg-black dark:border-zinc-600'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Profit
              </CardTitle>
              <BadgeIndianRupee  className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalRevenue / 10)}</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2" className=' dark:bg-black dark:border-zinc-600'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ListOrdered className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3" className=' dark:bg-black dark:border-zinc-600'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <Activity className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{products}</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <DataTable columns={columns} data={store} />
      </div>
    </div>
  )
}

export default StoreTable