import {
    Tooltip,
    XAxis,
    AreaChart,
    Area,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { format } from "date-fns";
import CustomTooltip from "./customTooltip";


type Props = {
    data: {
        createdAt: Date;
        number: number | null;
    }[]
};

const AreaVariant = ({ data }: Props) => {

    return (
        <ResponsiveContainer width='100%' height={300} >
            <AreaChart data={data} >
                <CartesianGrid strokeDasharray='2 2' />
                <defs>
                    <linearGradient id="incomeCheck" x1="0" y1='0' x2='0' y2='1' >
                        <stop offset='30%' stopColor="#fb7185" stopOpacity={1} />
                        <stop offset='98%' stopColor="#fb7185" stopOpacity={0.3} />
                    </linearGradient>
                </defs>
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="createdAt"
                    tickFormatter={(value) => format(value, "dd MMM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                <Tooltip cursor={false} content={<CustomTooltip />} />
                {/* <YAxis/> */}
                <Area
                    type="monotone"
                    dataKey="number"
                    stackId="number"
                    strokeWidth={2}
                    radius={2}
                    stroke="#fb7185"
                    fill="url(#incomeCheck)"
                    className="drop-shadow-sm"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default AreaVariant
