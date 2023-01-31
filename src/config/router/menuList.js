import {AreaChartOutlined, HolderOutlined, HomeOutlined, MoneyCollectOutlined} from "@ant-design/icons";

function getItem(label, key, icon = null, children = null, type = null) {
    return {
        label, key, icon, children, type
    }
}

const menuList = [
    getItem("Dashboard", "/", <HomeOutlined/>)
]

export default menuList;