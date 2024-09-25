import {
    Tooltip,
    XAxis,
    LineChart,
    ResponsiveContainer,
    CartesianGrid,
    Line,
    YAxis,
} from "recharts";
import CustomTooltip from "./custom-tooltip";

type Props = {
    data:{
        productId: string;
        productName:string | null;
        totalEarnings: number;
        totalSold: number;
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
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                {/* <YAxis /> */}

                <Tooltip cursor={false} content={<CustomTooltip />} />
                <Line
                    dot={false}
                    dataKey='totalEarnings'
                    stroke="#fb7185"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
      
            </LineChart>
        </ResponsiveContainer>

    )
}

export default LineVariantMonthly
