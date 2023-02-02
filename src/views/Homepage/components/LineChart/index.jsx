import React from 'react';
import echarts from "../../../../config/lib/echarts";
import ReactEChartsCore from 'echarts-for-react/lib/core';
const Index = (props) => {
    const {chartData, styles} = props
    const option = {
        backgroundColor: "#fff",
        xAxis: {
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            boundaryGap: false,
            axisTick: {
                show: false,
            },
        },
        grid: {
            left: 10,
            right: 10,
            bottom: 10,
            top: 50,
            containLabel: true,
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
            },
            padding: [5, 10],
        },
        yAxis: {
            axisTick: {
                show: false,
            },
        },
        legend: {
            data: ["expected", "actual"],
        },
        title: {
            text: chartData?.title
        },
        series: [
            {
                name: "expected",
                itemStyle: {
                    color: "#FF005A",
                },
                lineStyle: {
                    color: "#FF005A",
                    width: 2,
                },
                smooth: true,
                type: "line",
                data: chartData?.expectedData,
                animationDuration: 2800,
                animationEasing: "cubicInOut",
            },
            {
                name: "actual",
                smooth: true,
                type: "line",
                itemStyle: {
                    color: "#3888fa",
                },
                lineStyle: {
                    color: "#3888fa",
                    width: 2,
                },
                areaStyle: {
                    color: "#f3f8ff",
                },
                data: chartData?.actualData,
                animationDuration: 2800,
                animationEasing: "quadraticOut",
            },
        ],
    }
    return (
        <div style={{...styles}}>
            <ReactEChartsCore
                echarts={echarts}
                option={option}
                style={{...styles}}
            />
        </div>
    );
};
export default Index;