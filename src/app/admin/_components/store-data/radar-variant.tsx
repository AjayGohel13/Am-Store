import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip
} from "recharts";
import CustomTooltip from "./custom-tooltip";
import { useTheme } from "next-themes";

type Props = {
    data?: {
        store_name: string;
        totalEarnings: number;
        totalSold: number;
    }[];
}

const RadarVariant = ({ data }: Props) => {
    const { theme, setTheme } = useTheme();
    const backgroundColor = theme === 'light' ? 'white' : 'black';
    return (
        <div>
            <ResponsiveContainer width='100%' height={350}>
                <RadarChart
                    cx='50%'
                    cy="50%"
                    outerRadius="60%"
                    data={data}
                >
                    <Tooltip
                        cursor={false}
                        content={<CustomTooltip />}
                    />
                    <PolarGrid
                        // className="fill-[--color-desktop] opacity-20"
                        gridType="circle"
                    />
                    <PolarAngleAxis
                        style={{ fontSize: "14px" ,fontWeight:"bolder", color:backgroundColor}}
                        dataKey="store_name"
                    />
                    <PolarRadiusAxis style={{ fontSize: "12px", color:backgroundColor }} />
                    <Radar dataKey='totalEarnings' stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default RadarVariant
