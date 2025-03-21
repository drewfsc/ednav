"use client"
import * as React from "react"
import { TrendingUp } from "lucide-react"
import {getLastSixMonthsLabel} from "@/lib/utils";
import { Label, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import moment from "moment";
// const chartData = [
//     { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//     { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//     { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
//     { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//     { browser: "other", visitors: 190, fill: "var(--color-other)" },
// ]
const chartConfig = {
    clients: {
        label: "Clients",
    },
    graduated: {
        label: "Graduated",
        color: "hsl(var(--chart-primary))",
    },
    inactive: {
        label: "Inactive",
        color: "hsl(var(--chart-2))",
    },
    active: {
        label: "Active",
        color: "hsl(var(--chart-3))",
    },
    "in progress": {
        label: "In Progress",
        color: "hsl(var(--chart-4))",
    },
}

export function PieChartt({metrics}) {
    console.log(metrics.clientStatuses)
    const totalVisitors = React.useMemo(() => {
        return metrics.clientStatuses.reduce((acc, curr) => acc + curr.count, 0)
    }, [])
    return (
        <div className="flex flex-col w-full border">
            <CardHeader className="items-start pb-0">
                <CardTitle>Client Statuses</CardTitle>
                <CardDescription>{moment(new Date()).calendar()}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            className="bg-white"
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={metrics.clientStatuses}
                            dataKey="count"
                            nameKey="_id"
                            innerRadius={50}
                            strokeWidth={6}
                        >
                            <Label content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Visitors
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            {/*<CardFooter className="flex-col gap-2 text-sm">*/}
            {/*    <div className="flex items-center gap-2 font-medium leading-none">*/}
            {/*        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />*/}
            {/*    </div>*/}
            {/*    <div className="leading-none text-muted-foreground">*/}
            {/*        Showing total visitors for the last 6 months*/}
            {/*    </div>*/}
            {/*</CardFooter>*/}
        </div>
    )
}
