import {
    Tooltip,
    XAxis,
    BarChart,
    ResponsiveContainer,
    CartesianGrid,
    Bar,
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
const BarVariantMonthly = ({ data }: Props) => {
    return (
        <ResponsiveContainer width='100%' height={300} >
            <BarChart data={data} >
                <CartesianGrid strokeDasharray='3 3' />
                {/* <YAxis/> */}
                <defs>
                    <linearGradient id="income2" x1="0" y1='0' x2='0' y2='1' >
                        <stop offset='2%' stopColor="#fb7185" stopOpacity={1} />
                        <stop offset='98%' stopColor="#fb7185" stopOpacity={0.3} />
                    </linearGradient>
                </defs>
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="productName"
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                <Tooltip cursor={false}
                    content={<CustomTooltip />} />
                <Bar
                    dataKey="totalEarnings"
                    // stackId="totalEarnings"
                    strokeWidth={1}
                    stroke="#fb7185"
                    fill="url(#income2)"
                    radius={4}
                />

            </BarChart>
        </ResponsiveContainer>

    )
}

export default BarVariantMonthly
