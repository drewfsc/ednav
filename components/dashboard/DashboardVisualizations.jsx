import React from 'react';
import {BarChart, LineChart, PieChart} from "recharts";

export default function DashboardVisualizations() {
    return (
        <div>
            <div>
                <div>
                    <BarChart/>
                    <LineChart/>
                    <PieChart/>
                </div>
                <div></div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
