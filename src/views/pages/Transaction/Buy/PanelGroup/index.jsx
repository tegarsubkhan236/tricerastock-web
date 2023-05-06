import {Row, Col} from "antd";
import styles from './index.module.css'
import {TagsOutlined, ShopOutlined} from "@ant-design/icons";

const index = (props) => {
    const {handleSetCurrentData, currentType} = props;
    const cardList = [
        {
            type: "Purchase Order",
            color: "#36a3f7",
        },
        {
            type: "Receiving",
            color: "#f4516c",
        },
    ];

    return (
        <div className={styles.panel_group_container}>
            <Row gutter={40} className={styles.panel_group}>
                {cardList.map((chart, i) => (
                    <Col
                        key={i}
                        lg={12}
                        sm={12}
                        xs={12}
                        onClick={handleSetCurrentData.bind(this, chart.type)}
                        className={styles.card_panel_col}
                    >
                        <div className={styles.card_panel}>
                            <div className={styles.card_panel_icon_wrapper} style={currentType === chart.type ? {backgroundColor:"#ccc"} : {}}>
                                {
                                    chart.type === "Purchase Order" ? <TagsOutlined style={{color: chart.color}} className={styles.card_panel_icon} />
                                    : chart.type === "Receiving" ? <ShopOutlined style={{color: chart.color}} className={styles.card_panel_icon} />
                                    : ""
                                }
                            </div>
                            <div className={styles.card_panel_description}>
                                <p className={styles.card_panel_text}>{chart.type}</p>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
export default index