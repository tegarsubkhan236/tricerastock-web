import React from 'react';
import {Line} from 'react-chartjs-2';
import {LineChart} from "../../../../config/lib/ReactChart";

const Index = (props) => {
    const {chartData, styles} = props
    const lineConfig = LineChart(chartData.expectedData, chartData.actualData, chartData.title)
    return (
        <div style={{...styles}}>
            <Line options={lineConfig.options} data={lineConfig.data} style={{...styles, height:'350px'}}/>
        </div>
    );
};
export default Index;