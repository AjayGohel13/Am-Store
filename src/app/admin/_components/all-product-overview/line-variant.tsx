import {
    Tooltip,
    XAxis,
    LineChart,
    ResponsiveContainer,
    CartesianGrid,
    Line,
} from "recharts";
import { format } from "date-fns";
import CustomTooltip from "./custom-tooltip";

type Props = {
    data?: {
        productId: string;
        productName: string | null;
        totalEarnings: number;
        totalSold: number;
    }[];
};
const LineVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width='100%' height={300} >
            <LineChart data={data} >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey='productName'
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
            <Tooltip content={<CustomTooltip/>} />
            <Line
                    dot={false}
                    dataKey='totalSold'
                    stroke="#34D399"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
            </LineChart>
        </ResponsiveContainer>

    )
}

export default LineVariant
