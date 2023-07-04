import React from 'react';
import styles from "./index.module.css";
import {Col, Row} from "antd";
import CustomIcon from "../CustomIcon/CustomIcon";

const Index = (props) => {
    const {handleSetCurrentData, currentType, cardList} = props;

    return (
        <div className={styles.panel_group_container}>
            <Row gutter={40} className={styles.panel_group}>
                {cardList.map((chart, i) => (
                    <Col key={i}
                         lg={6}
                         sm={12}
                         xs={12}
                         onClick={handleSetCurrentData.bind(this, chart.type)}
                         className={styles.card_panel_col}
                    >
                        <div className={styles.card_panel}>
                            <div className={styles.card_panel_icon_wrapper}
                                 style={currentType === chart.type ? {backgroundColor:"#ccc"} : {}}
                            >
                                <CustomIcon type={chart.icon} props={{
                                    style:{color: chart.color},
                                    className:styles.card_panel_icon
                                }}/>
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
};

export default Index;