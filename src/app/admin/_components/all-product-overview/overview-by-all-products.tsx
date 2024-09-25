"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, BarChart, FileSearch, LineChart, Loader2 } from "lucide-react";
import AreaVariant from "./area-variant";
import BarVariant from "./bar-variant";
import LineVariant from "./line-variant";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
type Props = {
    data?: {
        productId: string;
        productName: string | null;
        totalEarnings: number;
        totalSold: number;
    }[];
}
const OverviewByAllProducts = ({ data = [] }: Props) => {
    const [chartType, setChartType] = useState("area")

    const onTypeChange = (type: string) => {
        setChartType(type)
    }
    return (
        <Card className=" border-none  " >
            <CardHeader className=" flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between " >
                <CardHeader>
                    <CardTitle>Product overview</CardTitle>
                </CardHeader>
                <Select
                    defaultValue={chartType}
                    onValueChange={onTypeChange}

                >
                    <SelectTrigger className=" lg:w-auto h-9 rounded-md px-3" >
                        <SelectValue placeholder="Chart Type " />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="area" >
                            <div className=" flex items-center ">
                                <AreaChart className=" size-4 mr-2 shrink-0" />
                                <p className=" line-clamp-1">
                                    Area Chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="line" >
                            <div className=" flex items-center ">
                                <LineChart className=" size-4 mr-2 shrink-0" />
                                <p className=" line-clamp-1">
                                    Line Chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="bar" >
                            <div className=" flex items-center ">
                                <BarChart className=" size-4 mr-2 shrink-0" />
                                <p className=" line-clamp-1">
                                    Bar Chart
                                </p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <div className=" flex flex-col gap-y-4 items-center justify-center h-[350px] w-full ">
                        <FileSearch className="size-6 text-muted-foreground" />
                        <p className=" text-muted-foreground text-sm " >
                            No data for this period
                        </p>
                    </div>
                ) : (
                    <>
                        {chartType === "area" && <AreaVariant
                            data={data}
                        />}
                        {chartType === "bar" && <BarVariant data={data} />}
                        {chartType === "line" && <LineVariant data={data} />}
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default OverviewByAllProducts

export const ChartLoading = () => {
    return (
        <Card className=" border-none drop-shadow-xl">
            <CardHeader className=" flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
                <Skeleton className=" h-8 w-48" />
                <Skeleton className=" h-8 lg:w-[120px] w-full" />
                <CardContent>
                    <div className=" h-[350px] w-full flex items-center justify-between">
                        <Loader2 className=" h-6 w-6 text-slate-300 animate-spin" />
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    )

}
