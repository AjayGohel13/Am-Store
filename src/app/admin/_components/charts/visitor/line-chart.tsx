import {
    Tooltip,
    XAxis,
    LineChart,
    ResponsiveContainer,
    CartesianGrid,
    Line,
} from "recharts";
import { format } from "date-fns";
import CustomTooltip from "./customTooltip";

type Props = {
    data: {
        createdAt: Date;
        number: number | null;
    }[]
};
const LineVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width='100%' height={300} >
            <LineChart data={data} >
                <CartesianGrid strokeDasharray='2 2' />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey='createdAt'
                    tickFormatter={(value) => format(value, "dd MMM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
            <Tooltip content={<CustomTooltip/>} />
            <Line
                    dot={false}
                    dataKey='number'
                    stroke="#fb7185"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
            </LineChart>
        </ResponsiveContainer>

    )
}

export default LineVariant
