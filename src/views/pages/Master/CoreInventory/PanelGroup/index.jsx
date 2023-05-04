import {Row, Col} from "antd";
import styles from './index.module.css'
import {TagOutlined, TagsOutlined, TeamOutlined, ShopOutlined} from "@ant-design/icons";

const index = (props) => {
    const {handleSetCurrentData, currentType} = props;
    const cardList = [
        {
            type: "Supplier",
            color: "#40c9c6",
        },
        {
            type: "Product Category",
            color: "#36a3f7",
        },
        {
            type: "Product",
            color: "#f4516c",
        },
        {
            type: "Stock",
            color: "#f6ab40",
        },
    ];

    return (
        <div className={styles.panel_group_container}>
            <Row gutter={40} className={styles.panel_group}>
                {cardList.map((chart, i) => (
                    <Col
                        key={i}
                        lg={6}
                        sm={12}
                        xs={12}
                        onClick={handleSetCurrentData.bind(this, chart.type)}
                        className={styles.card_panel_col}
                    >
                        <div className={styles.card_panel}>
                            <div className={styles.card_panel_icon_wrapper} style={currentType === chart.type ? {backgroundColor:"#ccc"} : {}}>
                                {
                                    chart.type === "Supplier" ? <TeamOutlined style={{color: chart.color}} className={styles.card_panel_icon} />
                                    : chart.type === "Product" ? <TagOutlined style={{color: chart.color}} className={styles.card_panel_icon} />
                                    : chart.type === "Product Category" ? <TagsOutlined style={{color: chart.color}} className={styles.card_panel_icon} />
                                    : chart.type === "Stock" ? <ShopOutlined style={{color: chart.color}} className={styles.card_panel_icon} />
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