import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import React from 'react'
import { DataTable } from "./data-table"
import { columns } from "./column"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { cn } from "@/lib/utils"
import CountUpComponent from "@/components/countUp-component"

type Props = {}

const OrderData = async (props: Props) => {

    const { userId } = auth();

    const analysis = await db.orderItem.findMany({
        where: {
            ownerId: userId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    //count analysis for current week
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to get to Sunday
    endOfWeek.setHours(23, 59, 59, 999); // Set time to the end of the day

    const analisisForWeek = await db.orderItem.findMany({
        where: {
            ownerId: userId,
            createdAt: {
                lte: endOfWeek,
                gte: startOfWeek,
            },
            isPaid:true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    //analysis for onemonth ago
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    const analisisForMonth = await db.orderItem.findMany({
        where: {
            ownerId: userId,
            createdAt: {
                lte: currentDate,
                gte: oneMonthAgo,
            },
            isPaid:true,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const startOfPreviousWeek = new Date(currentDate);
    const preday = currentDate.getDay(); // Get the current day of the week (0-6)
    const prediff = currentDate.getDate() - preday - 6; // Adjust to the previous Monday
    startOfPreviousWeek.setDate(prediff);
    startOfPreviousWeek.setHours(0, 0, 0, 0); // Set time to the start of the day

    const endOfPreviousWeek = new Date(startOfPreviousWeek);
    endOfPreviousWeek.setDate(startOfPreviousWeek.getDate() + 6); // Add 6 days to get to Sunday
    endOfPreviousWeek.setHours(23, 59, 59, 999); // Set time to the end of the day

    const analisisForPreviousWeek = await db.orderItem.findMany({
        where: {
            ownerId: userId,
            createdAt: {
                gte: startOfPreviousWeek,
                lte: endOfPreviousWeek,
            },
            isPaid:true,
        },
        orderBy: {
            createdAt: "desc"
        }
    });


    const currentweekRevenue = analisisForWeek.reduce((accc, curr) => accc + curr.price!, 0)
    const preWeekRevenue = analisisForPreviousWeek.reduce((acc, cur) => acc + cur.price!, 0)

    const oneMonthRevenue = analisisForMonth.reduce((accc, curr) => accc + curr.price!, 0)

    const productOptions = await db.product.findMany({
        where: {
            userId: userId!,
        }
    })

    const averageOfCurrentWeek = ((currentweekRevenue * 100) / preWeekRevenue)- 100;
    const formattedAverage = Number(averageOfCurrentWeek.toFixed(2)) ;
    // const averageOfPreWeek = ((preWeekRevenue * 100) / currentweekRevenue) - 100;
    // const formattedAveragePreWeek = averageOfPreWeek.toFixed(2);
    return (

        <div className="flex min-h-screen w-full max-w-screen-3xl mx-auto flex-col bg-white dark:bg-black">

            <div className="flex flex-col sm:gap-4 sm:py-4 ">

                <main className="gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
                    <div className="grid gap-4 md:gap-8 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                            <Card x-chunk="dashboard-05-chunk-1" className="dark:border-zinc-800 dark:bg-black shadow-lg">
                                <div className=" flex items-center justify-between ">
                                    <div>
                                        <CardHeader className="pb-2">
                                            <CardDescription>This Week</CardDescription>
                                            <CardTitle className="text-xl md:text-4xl">
                                                <CountUpComponent
                                                    data={currentweekRevenue}
                                                />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className={cn(
                                                " text-rose-400 text-whiten dark:text-rose-400  ",
                                                Number(formattedAverage) > 0 && "text-emerald-400 hover:text-emerald-400 dark:text-emerald-400 "
                                            )}>
                                                {Number(formattedAverage) < 0 && (`${formattedAverage} % from last week`)}
                                                {Number(formattedAverage) > 0 && (`+ ${formattedAverage} % from last week`)}
                                            </div>
                                        </CardContent>
                                    </div>
                                    <div className=" text-right">

                                        <CardHeader className="pb-2">
                                            <CardDescription>Previous Week</CardDescription>
                                            <CardTitle className="text-4xl">
                                                <CountUpComponent
                                                    data={preWeekRevenue}
                                                />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                        </CardContent>
                                    </div>
                                </div>
                                <CardFooter>
                                    <Progress value={formattedAverage} aria-label={`${averageOfCurrentWeek} % increase`}  />
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-2" className="dark:border-zinc-800 dark:bg-black">
                                <CardHeader className="pb-2">
                                    <CardDescription>This Month</CardDescription>
                                    <CardTitle className="text-4xl">
                                        <CountUpComponent
                                            data={oneMonthRevenue}
                                        />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        +10% from last month
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={12} aria-label="12% increase" />
                                </CardFooter>
                            </Card>

                        </div>
                        <Card x-chunk="dashboard-05-chunk-3" className="dark:border-zinc-800 dark:bg-black">
                            <CardHeader className="px-7">
                                <CardTitle>Orders</CardTitle>
                                <CardDescription>
                                    Recent orders from your store.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>

                            </CardContent>
                        </Card>


                    </div>

                    <DataTable columns={columns} data={analysis} options={productOptions.map((prod) => ({
                        label: prod.title,
                        value: prod.title,
                    }))} />
                </main>
            </div>
        </div>
    )
}

export default OrderData