// import { formatPercentage } from "@/lib/utils";
import {
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Legend,
    Pie,
    Cell,
    Label,
} from "recharts";
import CustomTooltip from "./custom-tooltip";
import { formatCurrency } from "@/lib/utils";
import React from "react";
type Props = {
    data?: {
        store_name: string;
        totalEarnings: number;
        totalSold: number;
    }[];
}

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"]
export const PieVariant = ({ data }: Props) => {
    const totalEarnings1 = React.useMemo(() => {
        return data!.reduce((acc, curr) => acc + curr.totalEarnings, 0)
    }, [data])

    return (
        <ResponsiveContainer width="100%" height={350}>
            <PieChart>
                <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="right"
                    iconType="circle"
                    content={({ payload }: any) => {
                        return (
                            <ul className=" flex flex-col space-y-2">
                                {payload.map((entry: any, index: number) => (
                                    <li
                                        key={`item-${index}`}
                                        className=" flex items-center space-x-2"
                                    >
                                        <span
                                            className=" size-2 rounded-full"
                                            style={{ backgroundColor: entry.color }}
                                        />
                                        <div className=" space-x-1">
                                            <span className=" text-sm text-muted-foreground">
                                                {/* {entry.value} */}
                                            </span>
                                            <span className=" text-sm">
                                                {formatCurrency(entry.payload.totalEarnings)} - {entry.payload.store_name}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                    }}
                />
                <Tooltip
                    content={<CustomTooltip />}
                />
                <Pie
                    data={data}
                    cx="50%"
                    cy='50%'
                    nameKey="store_name"
                    outerRadius={90}
                    innerRadius={60}
                    paddingAngle={2}
                    strokeWidth={0}
                    dataKey="totalEarnings"
                >
                    {data!.map((_entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}

                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold"
                                        >
                                            {totalEarnings1.toLocaleString()}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground"
                                        >
                                            Earnings
                                        </tspan>
                                    </text>
                                )
                            }
                        }}
                    />

                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}
