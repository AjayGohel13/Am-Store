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
    data: {
        createdAt: Date;
        price: number | null;
        productName: string | null;
    }[]
};

const AreaVariant = ({ data }: Props) => {

    return (
        <ResponsiveContainer width='100%' height={300} >
            <AreaChart data={data} >
                <CartesianGrid strokeDasharray='2 2' />
                <defs>
                    <linearGradient id="income1" x1="0" y1='0' x2='0' y2='1' >
                        <stop offset='30%' stopColor="#3d82f6" stopOpacity={1} />
                        <stop offset='98%' stopColor="#3d82f6" stopOpacity={0.3} />
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
                <Tooltip content={<CustomTooltip />} />
                {/* <YAxis/> */}
                <Area
                    type="monotone"
                    dataKey="price"
                    stackId="price"
                    strokeWidth={2}
                    stroke="#3d82f6"
                    fill="url(#income1)"
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

export default AreaVariant
