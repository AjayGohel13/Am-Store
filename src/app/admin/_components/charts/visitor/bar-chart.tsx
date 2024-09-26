import {
    Tooltip,
    XAxis,
    BarChart,
    ResponsiveContainer,
    CartesianGrid,
    Bar,
    YAxis,
} from "recharts";
import { format } from "date-fns";
import CustomTooltip from "./customTooltip";

type Props = {
    data: {
        createdAt: Date;
        number: number | null;
    }[]
};
const BarVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width='100%' height={300} >
            <BarChart data={data} >
                <CartesianGrid strokeDasharray='2 2' />
                <defs>
                    <linearGradient id="income3" x1="0" y1='0' x2='0' y2='1' >
                    <stop offset='30%' stopColor="#fb7185" stopOpacity={1} />
                    <stop offset='98%' stopColor="#fb7185" stopOpacity={0.6} />
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
                    dataKey='number'
                    stackId="totalEarnings"
                    fill="url(#income3)"
                    radius={4}
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
