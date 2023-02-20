import {HomeOutlined, FormOutlined, TableOutlined, LineOutlined} from "@ant-design/icons";

function getItem(label, key, icon = null, children = null, type = null) {
    return {
        label, key, icon, children, type
    }
}

const menuList = [
    getItem("Dashboard", "/", <HomeOutlined/>),
    getItem("Form", "/form", <FormOutlined/>,[
        getItem("Basic Form", "/form/form-basic", <LineOutlined />),
        getItem("Step Form", "/form/form-step", <LineOutlined />)
    ]),
    getItem("Table", "/table", <TableOutlined/>,[
        getItem("Basic Table", "/table/table-basic", <LineOutlined />),
    ]),
]

export default menuList;