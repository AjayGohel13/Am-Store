import {
    Tooltip,
    XAxis,
    BarChart,
    Area,
    ResponsiveContainer,
    CartesianGrid,
    Bar,
    YAxis,
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
const BarVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width='100%' height={300} >
            <BarChart data={data} >
                <CartesianGrid strokeDasharray='3 3' />
                <defs>
                    <linearGradient id="product" x1="0" y1='0' x2='0' y2='1' >
                    <stop offset='30%' stopColor="#34D399" stopOpacity={1} />
                    <stop offset='98%' stopColor="#34D399" stopOpacity={0.3} />
                    </linearGradient>

                </defs>
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="productName"
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                <Tooltip cursor={false} content={<CustomTooltip />} />
                <Bar
                    type="monotone"
                    dataKey='totalSold'
                    stackId="totalSold"
                    strokeWidth={1}
                    stroke="#34D399"
                    fill="url(#product)"
                    className="drop-shadow-sm"
                />

            </BarChart>
        </ResponsiveContainer>

    )
}

export default BarVariant
