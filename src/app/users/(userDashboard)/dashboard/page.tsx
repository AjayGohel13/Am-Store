import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"
import { Search } from "@/components/search"
import { RecentSales } from "./_components/recent-sales"
import { getAnalysis } from "@/actions/user-analysis"
import { CalendarArrowDown, DollarSign, PackageSearch, StoreIcon } from "lucide-react"
import { db } from "@/lib/db"
import DailyRevenueCharts from "./_components/monthly-overview/DailyRevenueCharts"
import ProductWiseMonthlyOverview from "./_components/Products-charts/productWise-overview"
import OverviewByAllOrders from "@/components/all-order-overview/overview-by-all-orders"
import CountUpComponent from "@/components/countUp-component"
import { redirect } from "next/navigation"
import UserAccount from "@/components/UserAccount"
import { FaPiggyBank } from "react-icons/fa"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import OrderData from "./_order_components/main"
import ProductData from "./_product_data/main"
import Info from "@/components/info"
import { ModeToggle } from "@/components/mode-toggle"

const page = async () => {
  const { userId } = auth()
  if (!userId) return null;
  const {
    data,
    totalSales,
    products,
    preMonthData,
    AllOrdersMonthlyChartData,
    finalChartData1,
    finalProduct
  } = await getAnalysis(userId)


  const store = await db.store.findUnique({
    where: {
      userId: userId!,
      isVerified: true,
    }
  })

  if (!store) {
    return redirect("/users/create-store")
  }


  const bentoGridItems = [
    {
      header:
        <Card className="  dark:bg-black border-none p-3 ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm sm:text-2xl font-medium">
              Current Month Revenue
            </CardTitle>
            <DollarSign />
          </CardHeader>
          <CardContent>
            <div className=" flex flex-row items-center justify-between">

              <div className="text-2xl font-bold">
                <CountUpComponent data={data} />
                <p className="text-xs text-muted-foreground">
                  Previous Month Revenue{" "}{preMonthData}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>,
    },
    {
      header: <Card className=" dark:bg-black p-3 border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm sm:text-2xl font-medium">
            Total Orders
          </CardTitle>
          <CalendarArrowDown />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSales}</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </CardContent>
      </Card>,
    },
    {
      header: <Card className="  dark:bg-black p-3  border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm sm:text-2xl font-medium">Total Products</CardTitle>
          <PackageSearch />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{products}</div>
          <p className="text-xs text-muted-foreground">
            +19% from last month
          </p>
        </CardContent>
      </Card>,
    },
    {
      header: <Card className="dark:bg-black border-none ">

        <CardContent className="pl-2">
          <OverviewByAllOrders data={AllOrdersMonthlyChartData!} />
        </CardContent>
      </Card>,
    },
    {
      header: <Card className="dark:bg-black border-none ">
        <CardContent className="pl-2">
          <ProductWiseMonthlyOverview data={finalProduct!} />
        </CardContent>
      </Card>,
    },
    {
      header: <Card className=" dark:bg-black border-none">
        <CardContent className="pl-2 mt-4">
          <DailyRevenueCharts data={finalChartData1!} />
        </CardContent>
      </Card>,
    },
    {
      header: <Card className="dark:bg-black border-none p-0 sm:p-2 ">
        <div className=" flex flex-row items-center justify-between">
          <CardHeader>
            <div>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                You made {totalSales} sales this month.
              </CardDescription>
            </div>

          </CardHeader>

        </div>
        <CardContent>
          <RecentSales userId={userId} />
        </CardContent>
      </Card>,
    },
  ]


  return (
    <>
      <div className=" flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Button className=" font-bold bg-gray-100 hover:bg-gray-300 text-black dark:text-white dark:bg-zinc-800 text-xl dark:hover:bg-zinc-700 flex flex-row"><StoreIcon className=" h-5 mr-2 w-5" />{store?.name}</Button>
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
              <Search />
              <UserAccount />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6 dark:bg-black bg-white ">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2">
            <Info />
            <div className="text-3xl font-bold tracking-tight text-black dark:text-white flex flex-row gap-2 ">Dashboard</div>

          </div>
          <Tabs defaultValue="overview" className="space-y-8 bg-white dark:bg-black w-full">
            <TabsList className="  dark:bg-neutral-900 w-full " defaultValue="overview">
              <TabsTrigger value="overview" defaultChecked={true}>Overview</TabsTrigger>
              <TabsTrigger value="Orders" >
                Orders
              </TabsTrigger>
              <TabsTrigger value="Product_List" >
                Product list
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-10">
              <BentoGrid className="max-w-screen-3xl mx-auto">
                {bentoGridItems.map((item, i) => (
                  <BentoGridItem
                    key={i}
                    header={item.header}
                    className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                  />
                ))}
              </BentoGrid>
            </TabsContent>
            <TabsContent value="Orders" className="space-y-10">
              <OrderData />
            </TabsContent>
            <TabsContent value="Product_List" className="space-y-10">
              <ProductData />
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </>

  )
}

export default page