import {
    Tooltip,
    XAxis,
    AreaChart,
    Area,
    ResponsiveContainer,
    CartesianGrid,
    YAxis
} from "recharts";
import CustomTooltip from "./custom-tooltip";

type Props = {
    data: {
        productId: string;
        productName: string | null;
        totalEarnings: number;
        totalSold: number;
    }[]
};

const AreaVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width='100%' height={300} >
            <AreaChart data={data} >
                <CartesianGrid strokeDasharray="1 1" />
                <defs>
                    <linearGradient id="income" x1="0" y1='0' x2='0' y2='1' >
                        <stop offset='2%' stopColor="#fb7185" stopOpacity={1} />
                        <stop offset='98%' stopColor="#fb7185" stopOpacity={0.3} />
                    </linearGradient>
                    {/* <linearGradient id="expenses" x1="0" y1='0' x2='0' y2='1' >
                    <stop offset='2%' stopColor="#f43f5e" stopOpacity={0.8} />
                    <stop offset='98%' stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient> */}
                </defs>
                {/* <YAxis/> */}
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
                    dataKey="totalEarnings"
                    stackId="totalEarnings"
                    strokeWidth={2}
                    stroke="#fb7185"
                    fill="url(#income)"
                    className="drop-shadow-sm  "
                />

            </AreaChart>
        </ResponsiveContainer>
    )
}

export default AreaVariant
