import {HomeOutlined, FormOutlined, LineOutlined} from "@ant-design/icons";

function getItem(label, key, icon = null, children = null, type = null) {
    return {
        label, key, icon, children, type
    }
}

const menuList = [
    getItem("Dashboard", "/", <HomeOutlined/>),
    getItem("Master", "/master", <FormOutlined/>,[
        getItem("User Authority", "/master/users", <LineOutlined />),
        getItem("Core Inventory", "/master/inventory", <LineOutlined />),
    ]),
    getItem("Transaction", "/transaction", <FormOutlined/>,[
        getItem("Buy", "/transaction/buy", <LineOutlined />),
        getItem("Sell", "/transaction/sell", <LineOutlined />),
        getItem("Special", "/transaction/special", <LineOutlined />),
    ]),
    getItem("Report", "/report", <FormOutlined/>),
]

export default menuList;