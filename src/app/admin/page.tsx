import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PackagePlus } from "lucide-react"
import UserAccount from "@/components/UserAccount"
import Info from "@/components/info"
import { Search } from "@/components/search"
import VisitorMonthlyCharts from "./_components/charts/visitor/Visitor-Monthly-Chart"
import { ModeToggle } from '@/components/mode-toggle'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { FaRegEye } from "react-icons/fa"
import ProductDataForAdmin from "./_components/product-data/Main"
import StoreTable from "./_components/Store-data-components/Main"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { toast } from "sonner"
import OverviewByAllProducts from "./_components/all-product-overview/overview-by-all-products"
import StoreDataChart from "./_components/store-data/store-data-chart"
import OverviewByAllOrders from "@/components/all-order-overview/overview-by-all-orders"
import { getAdminAnalisis } from "@/actions/admin-analisis"
const page = async () => {

  const {
    finalData,
    finalDataForStore,
    orderItem,
    thisMonthOrder,
    result,
    preViousWeek,
    visitors,
    allVisitor
  } = await getAdminAnalisis()

  const { userId } = auth();
  if (userId !== process.env.ADMIN_ID) {
    toast.info("You are not allowed to access this page");
    return redirect("/");
  }


 
  return (
    <div className=" w-full max-w-screen-3xl mx-auto min-h-screen px-5 mt-5 ">
      <div className="flex h-16 items-center">
        <Info />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <Search />
          <UserAccount />
        </div>
      </div>
      <div>
        <Tabs defaultValue="overview" className="space-y-8 bg-white dark:bg-black w-full mt-5">

          <TabsList className="  dark:bg-neutral-900 ">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="Store_Details" >
              Store Details
            </TabsTrigger>
            <TabsTrigger value="Product_List" >
              Product list
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-10">
            <div className=" grid grid-cols-1 gap-5  md:grid-cols-4 lg:grid-cols-4 h-full mt-5">

              <div className="col-span-1 sm:col-span-2 rounded-xl group/bento hover:shadow-xl dark:hover:shadow-3xl border border-gray-200 dark:border-zinc-700 transition duration-200 shadow-input  dark:bg-black dark:border-white/[0.2] bg-white  justify-between flex flex-col space-y-4">

                <Card className="  dark:bg-black border-none p-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm sm:text-2xl font-medium">Total Views</CardTitle>
                    <FaRegEye className=" h-8 w-8" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{visitors.length}</div>

                  </CardContent>
                  <CardFooter className=" p-0">
                    <div className=" flex flex-row justify-between w-full items-center">
                      <p className="text-lg text-muted-foreground">
                        This Month{" "}:{" "}{allVisitor.length}
                      </p>

                      <p className="text-lg text-muted-foreground">
                        +19% from last month
                      </p>

                    </div>
                  </CardFooter>
                </Card>
              </div>
              <div className="col-span-1 sm:col-span-2 rounded-xl group/bento hover:shadow-xl dark:hover:shadow-3xl border border-gray-200 dark:border-zinc-700 transition duration-200 shadow-input  dark:bg-black dark:border-white/[0.2] bg-white  justify-between flex flex-col space-y-4">
                <Card className="  dark:bg-black border-none p-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm sm:text-2xl font-medium">Total Orders</CardTitle>
                    <PackagePlus className=" h-8 w-8" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{orderItem}</div>
                  </CardContent>
                  <CardFooter className=" p-0">
                    <div className=" flex flex-row justify-between w-full items-center">
                      <p className="text-lg text-muted-foreground">
                        This Month{" "}:{" "}{thisMonthOrder.length}
                      </p>
                      <p className="text-lg text-muted-foreground">
                        +19% from last month
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </div>
              <div className="col-span-1 sm:col-span-4 row-span-2  rounded-xl group/bento hover:shadow-xl dark:hover:shadow-3xl border border-gray-200 dark:border-zinc-700 transition duration-200 shadow-input  dark:bg-black dark:border-white/[0.2] bg-white  justify-between flex flex-col space-y-4">
                <CardContent>
                  <VisitorMonthlyCharts
                    data={result}
                  />
                </CardContent>
              </div>
              <div className="col-span-1 sm:col-span-4 row-span-2  rounded-xl group/bento hover:shadow-xl dark:hover:shadow-3xl border border-gray-200 dark:border-zinc-700 transition duration-200 shadow-input  dark:bg-black dark:border-white/[0.2] bg-white  justify-between flex flex-col space-y-4">
                <CardContent>
                  <OverviewByAllOrders
                    data={thisMonthOrder}
                  />
                </CardContent>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5   md:grid-cols-5 lg:grid-cols-5 h-full mt-5">
              <div className="row-span-2 col-span-1 sm:col-span-2 rounded-xl group/bento hover:shadow-xl dark:hover:shadow-3xl border border-gray-200 dark:border-zinc-700 transition duration-200 shadow-input  dark:bg-black dark:border-white/[0.2] bg-white  justify-between flex flex-col space-y-4">
                <StoreDataChart data={finalDataForStore} />
              </div>
              <div className="row-span-2 col-span-1 sm:col-span-3 w-full rounded-xl group/bento hover:shadow-xl dark:hover:shadow-3xl border border-gray-200 dark:border-zinc-700 transition duration-200 shadow-input  dark:bg-black dark:border-white/[0.2] bg-white  justify-between flex flex-col space-y-4">
                <OverviewByAllProducts data={finalData} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="Store_Details" className="space-y-10">
            <StoreTable data={finalDataForStore} orderData={preViousWeek} />
          </TabsContent>
          <TabsContent value="Product_List" className="space-y-10">
            <ProductDataForAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default page
