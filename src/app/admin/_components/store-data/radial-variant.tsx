import { formatCurrency } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
    Legend,
} from "recharts";

type Props = {
    data?: {
        store_name: string;
        totalEarnings: number;
        totalSold: number;
    }[];
}

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"]
export const RadialVariant = ({ data }: Props) => {
    const { theme, setTheme } = useTheme();
    const backgroundColor = theme === 'light' ? '#D1D5DB' : '#FFFFFF4D';

    return (
        <ResponsiveContainer width="100%" height={350}>
            <RadialBarChart
                cx='50%'
                cy='30%'
                startAngle={-90}
                endAngle={380}
                barSize={20}
                innerRadius="90%"
                outerRadius="30%"
                data={data!.map((item, index) => ({
                    ...item,
                    fill: COLORS[index % COLORS.length]
                }))}
            >

                <RadialBar
                    label={{
                        position: "insideStart",
                        fill: '#fff',
                        fontSize: "12px"
                    }}
                    background={{ fill:backgroundColor}}
                    dataKey="totalEarnings"
                />
                <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="right"
                    iconType="circle"
                    content={({ payload }: any) => {
                        return (
                            <ul className=" flex flex-col space-y-2">
                                {payload.map((entry: any, index: number) => (
                                    <li
                                        key={`item-${index}`}
                                        className=" flex items-center space-x-2"
                                    >
                                        <span
                                            className=" size-2 rounded-full"
                                            style={{ backgroundColor: entry.color }}
                                        />
                                        <div className=" space-x-1">
                                            <span className=" text-sm text-muted-foreground">
                                                {entry.value}
                                            </span>
                                            <span className=" text-sm">
                                                {formatCurrency(entry.payload.totalEarnings)} - {entry.payload.store_name}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                    }}
                />

            </RadialBarChart>
        </ResponsiveContainer>
    )
}
