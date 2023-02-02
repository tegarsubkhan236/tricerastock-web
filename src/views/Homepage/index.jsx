import React, {useState} from 'react';
import './index.css';
import PanelGroup from './components/PanelGroup'
import LineChart from "./components/LineChart";
const Index = () => {
    const lineChartDefaultData = {
        "New Visits": {
            title: "New Visits Chart",
            expectedData: [100, 120, 161, 134, 105, 160, 165],
            actualData: [120, 82, 91, 154, 162, 140, 145],
        },
        Messages: {
            title: "Messages Chart",
            expectedData: [200, 192, 120, 144, 160, 130, 140],
            actualData: [180, 160, 151, 106, 145, 150, 130],
        },
        Purchases: {
            title: "Purchases Chart",
            expectedData: [80, 100, 121, 104, 105, 90, 100],
            actualData: [120, 90, 100, 138, 142, 130, 130],
        },
        Shopping: {
            title: "Shopping Chart",
            expectedData: [130, 140, 141, 142, 145, 150, 160],
            actualData: [120, 82, 91, 154, 162, 140, 130],
        },
    };
    const [lineChartData, setLineChartData] = useState(
        lineChartDefaultData["New Visits"]
    );
    const handleSetLineChartData = (type) => setLineChartData(lineChartDefaultData[type]);
    return (
        <div className="app-container">
            <PanelGroup handleSetLineChartData={handleSetLineChartData} />
            <LineChart
                chartData={lineChartData}
                styles={{
                    padding: 12,
                    backgroundColor: "#fff",
                    marginBottom: "25px",
                }}
            />
        </div>
    );
};
export default Index;