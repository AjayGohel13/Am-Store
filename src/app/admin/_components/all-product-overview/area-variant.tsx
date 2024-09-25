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
import CustomTooltip from "./custom-tooltip";

type Props = {
    data?: {
        productId: string;
        productName: string | null;
        totalEarnings: number;
        totalSold: number;
    }[];
};

const AreaVariant = ({ data }: Props) => {

    return (
        <ResponsiveContainer width='100%' height={300} >
            <AreaChart data={data} >
                <CartesianGrid strokeDasharray='3 3' />
                <defs>
                    <linearGradient id="product_overview" x1="0" y1='0' x2='0' y2='1' >
                        <stop offset='30%' stopColor="#34D399" stopOpacity={1} />
                        <stop offset='98%' stopColor="#34D399" stopOpacity={0.5} />
                    </linearGradient>
                </defs>
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="productName"
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                    type="monotone"
                    dataKey="totalSold"
                    stackId="totalSold"
                    strokeWidth={2}
                    stroke="#34D399"
                    fill="url(#product_overview)"
                    className="drop-shadow-sm"
                />

            </AreaChart>
        </ResponsiveContainer>
    )
}

export default AreaVariant
