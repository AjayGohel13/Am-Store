import {
    Tooltip,
    XAxis,
    LineChart,
    Area,
    ResponsiveContainer,
    CartesianGrid,
    Bar,
    Line,
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
const LineVariantMonthly = ({ data }: Props) => {
    return (
        <ResponsiveContainer width='100%' height={300} >
            <LineChart data={data} >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey='date'
                    tickFormatter={(value) => format(value, "dd MMM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                {/* <YAxis /> */}

                <Tooltip content={<CustomTooltip />} />
                <Line
                    dot={false}
                    dataKey='totalPrice'
                    stroke="#10B981"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
                {/* <Line
                    dot={false}
                    stroke="#f43f5e"
                    dataKey='expenses'
                    strokeWidth={2}
                    className="drop-shadow-sm"
                /> */}
            </LineChart>
        </ResponsiveContainer>

    )
}

export default LineVariantMonthly
