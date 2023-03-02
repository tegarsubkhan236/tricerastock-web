import {HomeOutlined, FormOutlined, LineOutlined} from "@ant-design/icons";

function getItem(label, key, icon = null, children = null, type = null) {
    return {
        label, key, icon, children, type
    }
}

const menuList = [
    getItem("Dashboard", "/", <HomeOutlined/>),
    getItem("Master", "/master", <FormOutlined/>,[
        getItem("User", "/master/users", <LineOutlined />),
        getItem("PPOB", "/master/ppob", <LineOutlined />),
    ]),
    getItem("Transaction", "/transaction", <FormOutlined/>,[
        getItem("PPOB", "/transaction/ppob", <LineOutlined />),
    ]),
    getItem("Report", "/report", <FormOutlined/>),
]

export default menuList;