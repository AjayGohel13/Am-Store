import {
    Tooltip,
    XAxis,
    BarChart,
    ResponsiveContainer,
    CartesianGrid,
    Bar,
} from "recharts";
import { format } from "date-fns";
import CustomTooltip from "./custom-tooltip-copy";

type Props = {
    data?: {
        date: string;
        totalPrice: number;
    }[]
};
const BarVariantMonthly = ({ data }: Props) => {
    return (
        <ResponsiveContainer width='100%' height={300} >
            <BarChart data={data} >
                <defs>

                    <linearGradient id="CheckingOn" x1="0" y1='0' x2='0' y2='1' >
                        <stop offset='2%' stopColor="#10B981" stopOpacity={1} />
                        <stop offset='98%' stopColor="#10B981" stopOpacity={0.3} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, "dd MMM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />

                <Tooltip cursor={false} content={<CustomTooltip />} />
                <Bar
                    dataKey='totalPrice'
                    fill="url(#CheckingOn)"
                    strokeWidth={1}
                    stroke="#10B981"
                    className="drop-shadow-sm"
                    radius={4}
                />

            </BarChart>
        </ResponsiveContainer>

    )
}

export default BarVariantMonthly
