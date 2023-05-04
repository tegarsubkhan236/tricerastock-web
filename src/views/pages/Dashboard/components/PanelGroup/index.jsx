import {Row, Col} from "antd";
import CountUp from "react-countup";
import styles from './index.module.css'
import {MessageOutlined, PayCircleOutlined, ShopOutlined, UserOutlined} from "@ant-design/icons";
const chartList = [
    {
        type: "New Visits",
        icon: "user",
        num: 102400,
        color: "#40c9c6",
    },
    {
        type: "Messages",
        icon: "message",
        num: 81212,
        color: "#36a3f7",
    },
    {
        type: "Purchases",
        icon: "pay-circle",
        num: 9280,
        color: "#f4516c",
    },
    {
        type: "Shopping",
        icon: "shopping-cart",
        num: 13600,
        color: "#f6ab40",
    },
];
const index = (props) => {
    const {handleSetLineChartData} = props;
    return (
        <div className={styles.panel_group_container}>
            <Row gutter={40} className={styles.panel_group}>
                {chartList.map((chart, i) => (
                    <Col
                        key={i}
                        lg={6}
                        sm={12}
                        xs={12}
                        onClick={handleSetLineChartData.bind(this, chart.type)}
                        className={styles.card_panel_col}
                    >
                        <div className={styles.card_panel}>
                            <div className={styles.card_panel_icon_wrapper}>
                                {
                                    chart.type === "New Visits" ? <UserOutlined className={chart.type} style={{fontSize: 55, color: chart.color}} type={chart.icon}/>
                                    : chart.type === "Messages" ? <MessageOutlined className={chart.type} style={{fontSize: 55, color: chart.color}} type={chart.icon}/>
                                    : chart.type === "Purchases" ? <PayCircleOutlined className={chart.type} style={{fontSize: 55, color: chart.color}} type={chart.icon}/>
                                    : chart.type === "Shopping" ? <ShopOutlined className={chart.type} style={{fontSize: 55, color: chart.color}} type={chart.icon}/>
                                    : ""
                                }
                            </div>
                            <div className={styles.card_panel_description}>
                                <p className={styles.card_panel_text}>{chart.type}</p>
                                <CountUp end={chart.num} start={0} className={styles.card_panel_num}/>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
export default index