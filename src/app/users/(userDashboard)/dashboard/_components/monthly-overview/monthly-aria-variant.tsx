import {
    Tooltip,
    XAxis,
    AreaChart,
    Area,
    ResponsiveContainer,
    CartesianGrid,
    YAxis,
} from "recharts";
import { format } from "date-fns";
import CustomTooltip from "./custom-tooltip-copy";

type Props = {
    data?: {
        date: string;
        totalPrice: number;
    }[]
};

const AreaVariantMonthly = ({ data }: Props) => {

    return (
        <ResponsiveContainer width='100%' height={300} >
            <AreaChart data={data} >
                <CartesianGrid strokeDasharray='3 3' />
                <defs>

                    <linearGradient id="expenses" x1="0" y1='0' x2='0' y2='1' >
                        <stop offset='2%' stopColor="#10B981" stopOpacity={1} />
                        <stop offset='98%' stopColor="#10B981" stopOpacity={0.3} />
                    </linearGradient>
                </defs>
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, "dd MMM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                {/* <YAxis /> */}

                <Tooltip content={<CustomTooltip />} />
                <Area
                    type="monotone"
                    dataKey="totalPrice"
                    stackId="totalPrice"
                    strokeWidth={2}
                    stroke="#10B981"
                    fill="url(#expenses)"
                    className="drop-shadow-sm"
                />
                {/* <Area
                type="monotone"
                dataKey="expenses"
                stackId="expenses"
                strokeWidth={2}
                stroke="#f43f5e"
                fill="url(#expenses)"
                className="drop-shadow-sm"
            /> */}
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default AreaVariantMonthly
