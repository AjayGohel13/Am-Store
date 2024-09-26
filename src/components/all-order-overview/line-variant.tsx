import {
    Tooltip,
    XAxis,
    LineChart,
    ResponsiveContainer,
    CartesianGrid,
    Line,
    LabelList,
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
const LineVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width='100%' height={300} >
            <LineChart data={data} accessibilityLayer margin={{ left: 12, right: 12,}} >
                <CartesianGrid strokeDasharray='2 2' />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey='createdAt'
                    tickFormatter={(value) => format(value, "dd MMM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={8}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    dot={false}
                    type="natural"
                    dataKey='price'
                    stroke="#3d82f6"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                >
    
                </Line>
            </LineChart>
        </ResponsiveContainer>

    )
}

export default LineVariant
