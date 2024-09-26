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
    data: {
        createdAt: Date;
        price: number | null;
        productName: string | null;
    }[]
};
const BarVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width='100%' height={300} >
            <BarChart data={data} >
                <CartesianGrid strokeDasharray='2 2' />
                <defs>
                    <linearGradient id="income6" x1="0" y1='0' x2='0' y2='1' >
                    <stop offset='30%' stopColor="#3d82f6" stopOpacity={1} />
                    <stop offset='98%' stopColor="#3d82f6" stopOpacity={0.8} />
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
                <div className=" hidden sm:block">

                    <YAxis
                        dataKey="createdAt"
                    />
                </div>
                <Tooltip cursor={false} content={<CustomTooltip />} />
                <Bar
                    type="monotone"
                    dataKey='price'
                    stackId="totalEarnings"
                    radius={2}
                    fill="url(#income6)"
                    className="drop-shadow-sm"
                />
                {/* <Bar
                dataKey='expenses'
                fill="#f43f5e"
                className="drop-shadow-sm"
            /> */}
            </BarChart>
        </ResponsiveContainer>

    )
}

export default BarVariant
